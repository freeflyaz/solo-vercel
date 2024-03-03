export function cleanUrl(url: any) { 
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
  export const languageFlags: any  = {
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




export const countryToLanguage = {
  sy: 'ar', // Syria to Arabic
  ir: 'fa', // Iran to Persian
  af: 'ps', // Afghanistan to Pashto (Note: Dari, also spoken in Afghanistan, is not included here as the mapping is one-to-one)
  tr: 'tr', // Turkey to Turkish
  us: 'en', // United States to English
  so: 'so', // Somalia to Somali
  er: 'ti', // Eritrea to Tigrinya
  pk: 'ur', // Pakistan to Urdu
  et: 'am', // Ethiopia to Amharic
  bd: 'bn', // Bangladesh to Bengali
  ru: 'ru', // Russia to Russian
  al: 'sq', // Albania to Albanian
  ua: 'uk', // Ukraine to Ukrainian
  rs: 'sr', // Serbia to Serbian
  de: 'de'  // Germany to German
};

