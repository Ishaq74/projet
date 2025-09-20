// Internationalization Configuration and Utilities
import type { Locale, LocaleConfig, TranslationData } from '../types/i18n';

export const locales: LocaleConfig[] = [
  { code: 'fr', name: 'Français', dir: 'ltr', dateFormat: 'dd/MM/yyyy' },
  { code: 'en', name: 'English', dir: 'ltr', dateFormat: 'MM/dd/yyyy' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', dateFormat: 'dd.MM.yyyy' },
  { code: 'es', name: 'Español', dir: 'ltr', dateFormat: 'dd/MM/yyyy' },
  { code: 'ar', name: 'العربية', dir: 'rtl', dateFormat: 'dd/MM/yyyy' },
  { code: 'zh', name: '中文', dir: 'ltr', dateFormat: 'yyyy/MM/dd' },
];

export const defaultLocale: Locale = 'fr';

export function isValidLocale(locale: string): locale is Locale {
  return locales.some(l => l.code === locale);
}

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return locales.find(l => l.code === locale) || locales[0];
}

export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const possibleLocale = segments[0];
  
  if (possibleLocale && isValidLocale(possibleLocale)) {
    return possibleLocale;
  }
  
  return defaultLocale;
}

export function removeLocaleFromPathname(pathname: string, locale: Locale): string {
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(locale.length + 1);
  }
  if (pathname === `/${locale}`) {
    return '/';
  }
  return pathname;
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  // Remove any existing locale prefix first
  const cleanPath = removeLocaleFromPathname(pathname, locale);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getLocalizedUrl(url: string, locale: Locale): string {
  const urlObj = new URL(url, 'http://localhost');
  const currentLocale = getLocaleFromUrl(urlObj);
  const cleanPath = removeLocaleFromPathname(urlObj.pathname, currentLocale);
  return addLocaleToPathname(cleanPath, locale);
}

// Translation loading and caching
const translationCache = new Map<Locale, TranslationData>();

export async function loadTranslations(locale: Locale): Promise<TranslationData> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    const translations = await import(`../content/translations/${locale}.json`);
    const data = translations.default || translations;
    translationCache.set(locale, data);
    return data;
  } catch (error) {
    console.warn(`Failed to load translations for locale ${locale}:`, error);
    // Fallback to default locale if available
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    return {};
  }
}

export function t(
  translations: TranslationData, 
  key: string, 
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key itself as fallback
    }
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string: ${key}`);
    return key;
  }
  
  // Simple parameter substitution
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}

export function formatDate(date: Date, locale: Locale): string {
  const config = getLocaleConfig(locale);
  
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    // Fallback to basic format
    return date.toLocaleDateString(locale);
  }
}

export function formatNumber(number: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    return number.toString();
  }
}