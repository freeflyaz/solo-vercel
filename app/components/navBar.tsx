import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  useColorModeValue,
  Spacer,
  Stack,
  Collapse,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg={bgColor}
        color={color}
      >
        <Flex align="center" mr={5}>
          <Text fontSize="lg" fontWeight="bold">
            Einbürgerungstest
            {/* Uncomment the below line once you have your image in public/images */}
            {/* <Image
              src="/images/logo.jpeg"
              alt="Logo"
              width={50}
              height={50}
              layout="fixed"
            /> */}
          </Text>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={onToggle}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle Navigation"
          />
        </Box>

        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
          flexBasis={{ base: '100%', md: 'auto' }}
        >
          <Spacer />
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignItems="left"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            {/* Place your menu items here */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                150 Frage
              </MenuButton>
              <MenuList>
                <MenuItem>30</MenuItem>
                <MenuItem>60</MenuItem>
                <MenuItem>90</MenuItem>
                <MenuItem>120</MenuItem>
                <MenuItem>150</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                300 Frage
              </MenuButton>
              <MenuList>
                <MenuItem>180</MenuItem>
                <MenuItem>210</MenuItem>
                <MenuItem>240</MenuItem>
                <MenuItem>270</MenuItem>
                <MenuItem>300</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Button
            size="md"
            rounded="md"
            colorScheme="purple"
            ml="4"
            onClick={() => {
              // handle donate button click
            }}
          >
            Einbürgerungstest App
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default NavBar;
