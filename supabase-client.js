// Cliente Supabase para Ministerial AI Frontend
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = "https://isnsyjnetrxakfigbish.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbnN5am5ldHJ4YWtmaWdiaXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Njg2MTIsImV4cCI6MjA3NzM0NDYxMn0.bk6pwf3dvFhjPGzUiy1-BQRKXrRu9nDocZyLtdHTogY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones auxiliares para llamar Edge Functions
export async function invokeEdgeFunction(functionName, data) {
  try {
    const { data: result, error } = await supabase.functions.invoke(functionName, {
      body: data
    });

    if (error) {
      throw error;
    }

    // Las edge functions pueden envolver la respuesta en data
    return result.data || result;
  } catch (error) {
    console.error(`Error invocando ${functionName}:`, error);
    throw error;
  }
}

// Funciones específicas para cada Edge Function
export async function generateSermon(topic, duration) {
  return invokeEdgeFunction('sermon-generator', { topic, duration });
}

export async function searchBible(query, translation = 'kjv') {
  return invokeEdgeFunction('bible-search', { query, translation });
}

export async function generateDevotional(date = null, saveToFavorites = false) {
  return invokeEdgeFunction('devotional-generator', { date, save_to_favorites: saveToFavorites });
}

export async function generateBibleStudy(topic, groupType = 'small_group') {
  return invokeEdgeFunction('bible-study-generator', { topic, group_type: groupType });
}

export async function getWeatherPrayer(city = 'Lake Station, IN', category = 'general') {
  return invokeEdgeFunction('weather-prayer', { city, category });
}

// Función para Google Calendar
export async function syncGoogleCalendarEvents(maxResults = 10) {
  return invokeEdgeFunction('google-calendar-events', { 
    action: 'list', 
    eventData: { maxResults } 
  });
}

export async function createGoogleCalendarEvent(eventData) {
  return invokeEdgeFunction('google-calendar-events', { 
    action: 'create', 
    eventData 
  });
}

// Funciones para consultar tablas
export async function getSermons(limit = 10) {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getBibleStudies(limit = 10) {
  const { data, error } = await supabase
    .from('bible_studies')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getPrayers(category = null) {
  let query = supabase
    .from('prayers')
    .select('*')
    .order('usage_count', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getFavoriteDevotionals(limit = 10) {
  const { data, error } = await supabase
    .from('favorite_devotionals')
    .select('*')
    .order('saved_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getMinistryEvents() {
  const { data, error } = await supabase
    .from('ministry_events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data;
}
