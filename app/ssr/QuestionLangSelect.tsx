'use client';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import 'flag-icon-css/css/flag-icons.min.css';
import { useRouter } from 'next/navigation';
import { cleanUrl, languageLabels, languageFlags } from './util';
import { getData } from './service';

const LanguageSelector = ({questionNumber, lang}) => {
  const router = useRouter();
  
  const handleLanguageChange = async (lang) => {
    //console.log('questionLangSelect: handleLanguageChange(): lang', lang);
    const data = await getData(questionNumber, lang);
    router.push(`${questionNumber}-${cleanUrl(data.name)}?lang=${lang}`);
  };


  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
         <span className={`flag-icon flag-icon-${languageFlags[lang]} mr-2`}></span>
       
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
