export function cleanUrl(url) { 
    let trimmedString = url.trim();
    let formattedString = trimmedString.replace(/[^\p{L}\p{N}]/gu, '-');
    // \p{L} matches any kind of letter from any language.
    // \p{N} matches any kind of numeric digit in any script.
    return formattedString;
  }

  
  export const languageLabels = {
    ar: 'Arabic',
    fa: 'Persian',
    ps: 'Pashto',
    tr: 'Türkçe',
    en: 'English',
    so: 'Somali',
    ti: 'Tigrinya',
    ur: 'Urdu',
    am: 'Amharic',
    bn: 'Bengali',
    ru: 'Russian',
    sq: 'Albanian',
    uk: 'Ukrainian',
    sr: 'Serbian'
    // Add more languages here if needed
  };

  // Adjust the flag codes as necessary
  export const languageFlags: LanguageFlags = {
    ar: 'sy', // Assuming Arabic for Syria
    fa: 'ir', // Persian for Iran
    ps: 'af', // Pashto for Afghanistan, also fa (Dari) is spoken here
    tr: 'tr', // Turkish for Turkey
    en: 'us', // English, using United States as the reference for the English language flag
    so: 'so', // Somali for Somalia
    ti: 'er', // Tigrinya for Eritrea
    ur: 'pk', // Urdu for Pakistan
    am: 'et', // Amharic for Ethiopia
    bn: 'bd', // Bengali for Bangladesh
    ru: 'ru', // Russian for Russia
    sq: 'al', // Albanian for Albania
    uk: 'ua', // Ukrainian for Ukraine
    sr: 'rs', // Serbian for Serbia
    de: 'de'
    // Kosovo uses 'xk', a user-assigned code not officially ISO 3166-1
  };
