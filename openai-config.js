// Configuración de OpenAI API para Ministerio AI
// IMPORTANTE: Nunca incluir la API key directamente en el código en producción

class OpenAIConfig {
  constructor() {
    this.apiKey = this.getAPIKey();
    this.baseURL = 'https://api.openai.com/v1';
    this.model = 'gpt-3.5-turbo'; // Cambiar a 'gpt-4' si tienes acceso
    this.maxTokens = 500;
    this.temperature = 0.7;
  }

  // Obtener API Key de forma segura
  getAPIKey() {
    // Opciones para obtener la API key:
    
    // 1. Variable de entorno (más seguro)
    if (typeof window !== 'undefined') {
      // En el navegador, podrías usar localStorage (menos seguro)
      return localStorage.getItem('openai_api_key') || '';
    }
    
    // 2. Variable de entorno del servidor (más seguro)
    return process.env.OPENAI_API_KEY || '';
  }

  // Configurar API Key
  setAPIKey(key) {
    this.apiKey = key;
    if (typeof window !== 'undefined') {
      // En desarrollo, guardar en localStorage (NO hacer esto en producción)
      localStorage.setItem('openai_api_key', key);
    }
  }

  // Verificar si la API key está configurada
  isConfigured() {
    return this.apiKey && this.apiKey.length > 0;
  }

  // Headers para las requests
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  // Obtener configuración del modelo
  getModelConfig() {
    return {
      model: this.model,
      max_tokens: this.maxTokens,
      temperature: this.temperature
    };
  }

  // Método para probar la conexión con OpenAI
  async testConnection() {
    if (!this.isConfigured()) {
      throw new Error('API key no configurada');
    }

    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error de conexión: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error probando conexión con OpenAI:', error);
      return false;
    }
  }
}

// Sistema de configuración de API Key en el navegador
class APIKeyManager {
  constructor() {
    this.config = new OpenAIConfig();
    this.storageKey = 'ministerial_ai_openai_key';
  }

  // Guardar API key de forma temporal (solo para desarrollo)
  saveAPIKey(key) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, key);
    }
  }

  // Obtener API key guardada
  getSavedAPIKey() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.storageKey) || '';
    }
    return '';
  }

  // Verificar si hay una API key guardada
  hasSavedKey() {
    return this.getSavedAPIKey().length > 0;
  }

  // Limpiar API key guardada
  clearSavedKey() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Método para mostrar un modal de configuración de API key
  showAPIKeySetup(callback) {
    const modal = this.createAPISetupModal();
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    const saveBtn = modal.querySelector('.save-api-key');
    const input = modal.querySelector('.api-key-input');
    
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    saveBtn.addEventListener('click', () => {
      const key = input.value.trim();
      if (key) {
        this.saveAPIKey(key);
        if (callback) callback(key);
        document.body.removeChild(modal);
      }
    });
  }

  // Crear modal para configurar API key
  createAPISetupModal() {
    const modal = document.createElement('div');
    modal.className = 'api-setup-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Configurar OpenAI API</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p>Para usar las capacidades avanzadas de IA, necesitas una API key de OpenAI.</p>
          <div class="input-group">
            <label for="apiKey">API Key:</label>
            <input type="password" class="api-key-input" placeholder="sk-...">
          </div>
          <div class="api-help">
            <h4>¿Cómo obtener tu API key?</h4>
            <ol>
              <li>Ve a <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a></li>
              <li>Inicia sesión o crea una cuenta</li>
              <li>Ve a "API Keys" en el menú lateral</li>
              <li>Haz clic en "Create new secret key"</li>
              <li>Copia la key y pégala aquí</li>
            </ol>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn">Cancelar</button>
          <button class="save-api-key">Guardar</button>
        </div>
      </div>
    `;
    
    // Estilos del modal (agregar al CSS si es necesario)
    const style = document.createElement('style');
    style.textContent = `
      .api-setup-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: white;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
      }
      .modal-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-body {
        padding: 20px;
      }
      .input-group {
        margin: 15px 0;
      }
      .input-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .api-key-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .modal-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      .cancel-btn, .save-api-key {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .cancel-btn {
        background: #f0f0f0;
      }
      .save-api-key {
        background: var(--primary-500);
        color: white;
      }
      .api-help h4 {
        margin-top: 15px;
        margin-bottom: 10px;
      }
      .api-help ol {
        padding-left: 20px;
      }
    `;
    document.head.appendChild(style);
    
    return modal;
  }
}

// Exportar para uso global
window.OpenAIConfig = OpenAIConfig;
window.APIKeyManager = APIKeyManager;