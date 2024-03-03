'use client'
import { Box, Flex, Text, Button, useColorModeValue, Spacer } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import ContainerQuiz from "./components/ContainerQuiz"; 
import NavBar from "./components/NavBar";
import Image from 'next/image'


export default function Home() {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');
  return (
    <>
    <NavBar />
   
    {/* <ContainerQuiz />  */}
    </>
  );
}


