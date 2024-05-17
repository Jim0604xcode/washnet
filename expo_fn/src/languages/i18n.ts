import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@/languages/resources';
import 'intl-pluralrules';

i18n.use(initReactI18next).init({
    debug: true,
    lng: 'cn',
    fallbackLng: 'cn',
    resources: resources
  });

export default i18n;