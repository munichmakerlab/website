import type { Translations } from './ui-i18n-helper';

export const de: Translations = {
  hello: 'Hallo',
  status: {
    open: 'Der Makerspace ist gerade geöffnet! Du kannst vorbeikommen und abhängen. Bitte beachte: Es kann sein, dass nicht durchgehend jemand da ist (außer am Open Thursday).',
    closed: 'Der Makerspace ist gerade geschlossen. Ein Mitglied muss erst vorbeikommen und ihn für Gäste öffnen.',
  },
  calendar: {
    workshops: 'Workshops',
    openEvents: 'Offene Veranstaltungen',
  },
  posts: {
    seeAll: 'Alle Beiträge ansehen =>',
  },
  // Note: "Makerspace" is used as the umbrella term for our workshop/space
  // throughout the German UI. We avoid translating it as "Raum".
  navbar: {
    home: 'Home',
    about: 'Über uns',
    visit: 'Besuch',
    contact: 'Kontakt',
    events: 'Events',
    wiki: 'Wiki',
    donate: 'Spenden',
    join: 'Mitmachen',
  },
  footer: {
    formerChannels: 'Frühere Kanäle:',
    imprint: 'Impressum',
    privacyPolicy: 'Datenschutzerklärung',
    editOnGithub: 'Seite bearbeiten auf',
  },
};
