import { en } from './en';
import { de } from './de';

export type Translations = typeof en;

export function getUiTranslations(locale: string): Translations {
  const localesMap: Record<string, Translations> = {
    en,
    de,
  };

  return localesMap[locale] ?? en;
}
