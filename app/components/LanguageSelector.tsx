'use client';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import 'flag-icon-css/css/flag-icons.min.css';
import { LanguageFlags, OnLanguageChange } from '../types';
import { languageLabels, languageFlags } from '../ssr/util';

const LanguageSelector = ({ onLanguageChange }: OnLanguageChange) => {

  
  // Adjust the flag codes as necessary
  

  // const handleLanguageChange = (lang) => {
  //   onLanguageChange(lang); // Notify parent component
  // };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {/* <span className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} mr-2`}></span>
        {languageLabels[selectedLanguage]} */}
        Select your mother tongue.
      </MenuButton>
      <MenuList>
        {Object.entries(languageLabels).map(([langCode, label]) => (
          <MenuItem key={langCode} onClick={() => onLanguageChange(langCode)}>
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
