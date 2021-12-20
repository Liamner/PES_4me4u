import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import es from './es.json';
import cat from './cat.json';

i18n.use(initReactI18next).init({
lng: 'es',
fallbackLng: 'es',
compatibilityJSON: 'v3',
resources: {
	es: es,
	cat: cat,
},
interpolation: {
	escapeValue: false // react already safes from xss
}
});

export default i18n;
