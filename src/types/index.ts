// Tipos para la aplicación Ministerial AI

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'scripture' | 'ministry_info' | 'web_search';
  metadata?: {
    scriptureReference?: string;
    webSources?: string[];
    ministryLinks?: MinistryLink[];
  };
}

export interface MinistryInfo {
  name: string;
  church: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  network: string;
  donations: string;
  pastors: string;
}

export interface MinistryLink {
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface ScriptureReference {
  reference: string;
  text: string;
  version: string;
  category: 'old_testament' | 'new_testament';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentLanguage: 'es' | 'en';
}

export interface AIMinistryAgent {
  ministryInfo: MinistryInfo;
  scriptureDatabase: ScriptureReference[];
  
  generateResponse(userMessage: string, language: 'es' | 'en'): Promise<string>;
  searchScripture(query: string, language: 'es' | 'en'): ScriptureReference[];
  searchWeb(query: string): Promise<any>;
  generateMinistryResponse(message: string, language: 'es' | 'en'): string;
}

export type Language = 'es' | 'en';

export interface LocalizedStrings {
  [key: string]: {
    es: string;
    en: string;
  };
}