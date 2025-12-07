import { Locale } from 'expo-localization';
const dateFormatter = (config: Partial<Locale>) =>
  new Intl.DateTimeFormat(config.languageTag, {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  });

export default dateFormatter;
