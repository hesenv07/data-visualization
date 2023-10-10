import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from 'i18next-http-backend'
import { ru, en, az } from './lang';
import { getFromLocale } from './utils';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
            en: { translation: en },
            az: { translation: az },
        },
        lng: getFromLocale('language') ?? 'en',
        fallbackLng: getFromLocale('language') ?? 'en',
        interpolation: {
            escapeValue: false
        }
    });