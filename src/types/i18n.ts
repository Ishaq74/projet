// Internationalization Types
export type Locale = 'fr' | 'en' | 'de' | 'es' | 'ar' | 'zh';

export type TranslationKey = 
  | 'nav.home'
  | 'nav.about'
  | 'nav.services'
  | 'nav.training'
  | 'nav.blog'
  | 'nav.contact'
  | 'nav.profile'
  | 'nav.admin'
  | 'nav.login'
  | 'nav.logout'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.submit'
  | 'common.cancel'
  | 'common.save'
  | 'common.edit'
  | 'common.delete'
  | 'common.confirm'
  | 'common.search'
  | 'common.next'
  | 'common.previous'
  | 'common.close'
  | 'common.open'
  | 'form.required'
  | 'form.email'
  | 'form.password'
  | 'form.confirmPassword'
  | 'form.firstName'
  | 'form.lastName'
  | 'form.message'
  | 'form.subject'
  | 'auth.login'
  | 'auth.register'
  | 'auth.forgotPassword'
  | 'auth.resetPassword'
  | 'auth.emailVerification'
  | 'blog.readMore'
  | 'blog.categories'
  | 'blog.tags'
  | 'blog.author'
  | 'blog.publishedOn'
  | 'blog.comments'
  | 'blog.addComment'
  | 'blog.noComments'
  | 'meta.title'
  | 'meta.description'
  | 'seo.home.title'
  | 'seo.home.description'
  | 'seo.about.title'
  | 'seo.about.description'
  | 'seo.blog.title'
  | 'seo.blog.description';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface LocaleConfig {
  code: Locale;
  name: string;
  dir: 'ltr' | 'rtl';
  dateFormat: string;
}