import { Locale } from 'expo-localization';
const dateFormatter = (config: Partial<Locale>) =>
  // config.languageTag
  new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  });

export default dateFormatter;
