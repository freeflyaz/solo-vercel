'use client';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import 'flag-icon-css/css/flag-icons.min.css';
import { useRouter } from 'next/navigation';

 

import { LanguageFlags, OnLanguageChange } from '../typescript';

// Make sure you import the flag-icon-css library in your project entry file
// import 'flag-icon-css/css/flag-icon.min.css';

const LanguageSelector = () => {
  const router = useRouter();
  // const [selectedLanguage, setSelectedLanguage] = useState('de');

  const languageLabels = {
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
  const languageFlags: LanguageFlags = {
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

  function cleanUrl(url) { // gabe - this is a duplicate of the function in the page.tsx file
    let trimmedString = url.trim();
    let formattedString = trimmedString.replace(/[^\p{L}\p{N}]/gu, '-');
    // \p{L} matches any kind of letter from any language.
    // \p{N} matches any kind of numeric digit in any script.
    return formattedString;
  }


  async function getData(questionNumber, lang: string) {
    const api_url = process.env.API_URL;
    console.log('QuestionLangSelect: api_url', api_url);
    try {

      // const buildUrl = `${api_url}/api/${questionNumber}?lang=${lang}`;
      const buildUrl = `http://localhost:3000/api/${questionNumber}?lang=${lang}`;  //gabe
      console.log('QuestionLangSelect: passed to api string', buildUrl);
      const response = await fetch(buildUrl);
      // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  }

  const handleLanguageChange = async (lang) => {
    console.log('questionLangSelect: handleLanguageChange(): lang', lang);
    const data = await getData(3, 'en');
    router.push(`1-${cleanUrl(data.name)}?lang=${lang}`);
    // alert(`Language changed to ${lang}`);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {/* <span className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} mr-2`}></span>
        {languageLabels[selectedLanguage]} */}
        Select your mother tongue.
      </MenuButton>
      <MenuList>
        {Object.entries(languageLabels).map(([langCode, label]) => (
          <MenuItem
            key={langCode}
            onClick={() => handleLanguageChange(langCode)}
          >
            <span
              className={`flag-icon flag-icon-${languageFlags[langCode]} mr-2`}
            ></span>
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
