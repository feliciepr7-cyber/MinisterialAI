import React, { useState, useRef, useEffect } from 'react';
import { Send, Globe, Phone, MapPin, Mail, Heart } from 'lucide-react';
import { Message, Language } from './types';
import { MinisterialAIAgent } from './services/ministerialAgent';
import { format } from 'date-fns';
import { es, en } from 'date-fns/locale';

const ministerialAgent = new MinisterialAIAgent();

const translations = {
  title: {
    es: 'Ministerial AI',
    en: 'Ministerial AI'
  },
  subtitle: {
    es: 'Asistente Bíblico y Administrativo del Ministerio',
    en: 'Biblical and Administrative Ministry Assistant'
  },
  placeholder: {
    es: 'Escribe tu pregunta aquí...',
    en: 'Type your question here...'
  },
  send: {
    es: 'Enviar',
    en: 'Send'
  },
  ministryInfo: {
    es: 'Información del Ministerio',
    en: 'Ministry Information'
  },
  address: {
    es: 'Dirección',
    en: 'Address'
  },
  phone: {
    es: 'Teléfono',
    en: 'Phone'
  },
  email: {
    es: 'Email',
    en: 'Email'
  },
  website: {
    es: 'Sitio Web',
    en: 'Website'
  },
  donate: {
    es: 'Donar',
    en: 'Donate'
  },
  pastors: {
    es: 'Pastores',
    en: 'Pastors'
  },
  services: {
    es: 'Servicios',
    en: 'Services'
  },
  welcomeMessage: {
    es: '¡Hola! Soy Ministerial AI, tu asistente del ministerio. ¿En qué puedo ayudarte hoy?',
    en: 'Hello! I\'m Ministerial AI, your ministry assistant. How can I help you today?'
  }
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: translations.welcomeMessage.es,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await ministerialAgent.generateResponse(inputMessage, currentLanguage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: currentLanguage === 'es' 
          ? 'Disculpa, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.'
          : 'Sorry, there was an error processing your message. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const formatMessage = (content: string) => {
    // Convertir markdown básico a JSX
    const parts = content.split('\n');
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <h3 key={index} className="text-bold" style={{ fontSize: '18px', marginBottom: '8px' }}>
            {part.slice(2, -2)}
          </h3>
        );
      }
      if (part.startsWith('•')) {
        return (
          <div key={index} style={{ marginLeft: '16px', marginBottom: '4px' }}>
            {part}
          </div>
        );
      }
      if (part.startsWith('http')) {
        return (
          <div key={index} style={{ marginBottom: '4px' }}>
            <a 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}
            >
              {part}
            </a>
          </div>
        );
      }
      return (
        <div key={index} style={{ marginBottom: part === '' ? '8px' : '4px' }}>
          {part}
        </div>
      );
    });
  };

  const formatTimestamp = (timestamp: Date) => {
    const locale = currentLanguage === 'es' ? es : en;
    return format(timestamp, 'HH:mm', { locale });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--neutral-50)',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--neutral-100)',
        borderBottom: '1px solid var(--neutral-200)',
        padding: 'var(--space-lg) var(--space-md)',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-md">
              <Heart style={{ color: 'var(--primary-500)', size: 32 }} />
              <div>
                <h1 style={{ 
                  fontSize: '24px', 
                  margin: 0,
                  color: 'var(--neutral-900)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {translations.title[currentLanguage]}
                </h1>
                <p style={{ 
                  margin: 0, 
                  color: 'var(--neutral-600)', 
                  fontSize: '14px' 
                }}>
                  {translations.subtitle[currentLanguage]}
                </p>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="btn btn-secondary"
              style={{ 
                padding: '8px 16px',
                height: 'auto',
                fontSize: '14px'
              }}
            >
              <Globe style={{ marginRight: '8px', size: 16 }} />
              {currentLanguage === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ 
        maxWidth: '1200px', 
        padding: 'var(--space-lg) var(--space-md)',
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: 'var(--space-lg)',
        minHeight: 'calc(100vh - 100px)'
      }}>
        {/* Chat Area */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'var(--neutral-100)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          {/* Messages */}
          <div style={{ 
            flex: 1,
            padding: 'var(--space-lg)',
            overflowY: 'auto',
            maxHeight: '600px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className="fade-in"
                style={{
                  marginBottom: 'var(--space-lg)',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    backgroundColor: message.sender === 'user' 
                      ? 'var(--primary-100)' 
                      : 'var(--neutral-100)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    border: message.sender === 'ai' ? '1px solid var(--neutral-200)' : 'none'
                  }}
                >
                  <div style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    color: 'var(--neutral-900)'
                  }}>
                    {formatMessage(message.content)}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--neutral-600)',
                    marginTop: '8px',
                    textAlign: 'right'
                  }}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="fade-in" style={{
                marginBottom: 'var(--space-lg)',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  backgroundColor: 'var(--neutral-100)',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--neutral-200)'
                }}>
                  <div style={{ 
                    color: 'var(--neutral-600)',
                    fontStyle: 'italic'
                  }}>
                    {currentLanguage === 'es' ? 'Pensando...' : 'Thinking...'}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            borderTop: '1px solid var(--neutral-200)',
            padding: 'var(--space-lg)',
            backgroundColor: 'var(--neutral-50)'
          }}>
            <div className="flex gap-sm" style={{ alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations.placeholder[currentLanguage]}
                style={{
                  flex: 1,
                  minHeight: '56px',
                  maxHeight: '120px',
                  padding: 'var(--space-md)',
                  border: '1px solid var(--neutral-200)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  resize: 'none',
                  outline: 'none',
                  backgroundColor: 'var(--neutral-100)',
                  transition: 'border-color 200ms ease-out'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-500)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(45, 95, 154, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--neutral-200)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  width: '44px',
                  height: '44px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: inputMessage.trim() && !isLoading 
                    ? 'var(--primary-500)' 
                    : 'var(--neutral-200)',
                  color: inputMessage.trim() && !isLoading 
                    ? 'var(--neutral-100)' 
                    : 'var(--neutral-600)',
                  cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-700)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-500)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Ministry Info Sidebar */}
        <div className="card fade-in" style={{ 
          height: 'fit-content',
          position: 'sticky',
          top: 'var(--space-lg)'
        }}>
          <h3 style={{ 
            marginBottom: 'var(--space-lg)',
            color: 'var(--primary-500)',
            fontFamily: 'var(--font-heading)'
          }}>
            {translations.ministryInfo[currentLanguage]}
          </h3>
          
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <h4 style={{ 
              fontSize: '18px', 
              marginBottom: 'var(--space-sm)',
              color: 'var(--neutral-900)'
            }}>
              Frankie Felicie Ministries
            </h4>
            <p style={{ 
              color: 'var(--neutral-600)', 
              fontSize: '14px',
              marginBottom: 'var(--space-md)'
            }}>
              Iglesia de Dios Pentecostal Luz en Medio de las Tinieblas Inc.
            </p>
          </div>

          <div className="flex flex-col gap-md">
            <div className="flex items-center gap-sm">
              <MapPin size={16} color="var(--primary-500)" />
              <span style={{ fontSize: '14px', color: 'var(--neutral-900)' }}>
                2702 New Hampshire St, Lake Station, IN 46405
              </span>
            </div>
            
            <div className="flex items-center gap-sm">
              <Phone size={16} color="var(--primary-500)" />
              <span style={{ fontSize: '14px', color: 'var(--neutral-900)' }}>
                (219) 246-5775
              </span>
            </div>
            
            <div className="flex items-center gap-sm">
              <Mail size={16} color="var(--primary-500)" />
              <span style={{ fontSize: '14px', color: 'var(--neutral-900)' }}>
                info@lakestationchurch.com
              </span>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--neutral-200)' }}>
            <h4 style={{ fontSize: '16px', marginBottom: 'var(--space-sm)' }}>
              {translations.pastors[currentLanguage]}
            </h4>
            <p style={{ color: 'var(--neutral-600)', fontSize: '14px' }}>
              Rev. Frankie & Lydia Felicie
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--neutral-200)' }}>
            <h4 style={{ fontSize: '16px', marginBottom: 'var(--space-sm)' }}>
              {translations.services[currentLanguage]}
            </h4>
            <div style={{ fontSize: '14px', color: 'var(--neutral-900)' }}>
              <div>• Domingos: 10:00 AM y 6:00 PM</div>
              <div>• Miércoles: Estudio bíblico 7:00 PM</div>
              <div>• Sábados: Oración 9:00 AM</div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-lg)' }}>
            <a 
              href="https://frankiefelicie.net/donate.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              💝 {translations.donate[currentLanguage]}
            </a>
          </div>

          <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
            <a 
              href="https://frankiefelicie.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                fontSize: '14px', 
                color: 'var(--primary-500)', 
                textDecoration: 'underline' 
              }}
            >
              🌐 {translations.website[currentLanguage]}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Layout Adjustments */}
      <style>{`
        @media (max-width: 767px) {
          .container {
            grid-template-columns: 1fr !important;
            gap: var(--space-md) !important;
            padding: var(--space-md) var(--space-sm) !important;
          }
          
          .card {
            order: -1;
          }
          
          h1 {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;