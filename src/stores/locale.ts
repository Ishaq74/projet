// Locale Store - Manages language/locale state across the application
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import type { Locale, TranslationData } from '../types/i18n';
import { defaultLocale, loadTranslations } from '../utils/i18n';

// Persistent locale store
export const $locale = persistentAtom<Locale>('locale', defaultLocale, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Translations store
export const $translations = atom<TranslationData>({});

// Loading state
export const $translationsLoading = atom<boolean>(false);

// Locale actions
export const localeActions = {
  setLocale: async (locale: Locale) => {
    $locale.set(locale);
    await localeActions.loadTranslations(locale);
    
    // Update document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
      
      // Set direction for RTL languages
      const rtlLanguages = ['ar'];
      document.documentElement.setAttribute('dir', 
        rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
      );
    }
  },
  
  loadTranslations: async (locale: Locale) => {
    $translationsLoading.set(true);
    try {
      const translations = await loadTranslations(locale);
      $translations.set(translations);
    } catch (error) {
      console.error('Failed to load translations:', error);
    } finally {
      $translationsLoading.set(false);
    }
  },
  
  initLocale: async () => {
    const currentLocale = $locale.get();
    await localeActions.setLocale(currentLocale);
  }
};

// Initialize locale on import (client-side only)
if (typeof window !== 'undefined') {
  localeActions.initLocale();
}