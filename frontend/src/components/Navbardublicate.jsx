import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Button,
  useColorModeValue,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../Uatoms/userAtom';
import LogoutButton from '../Users/ULogOutButton'; // Import LogoutButton
import Header from './Header'; // Import Header to include the light/dark toggle in Navbar

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userAtom); // Get the current user state

  // Add sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define styles
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={50}
      bg={isSticky ? bgColor : 'transparent'}
      transition="all 0.3s ease-in-out"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={isSticky ? bgColor : 'transparent'}
        color={textColor}
        backdropFilter="blur(10px)"
      >
        {/* Logo */}
        <Flex align="center" mr={5}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Flex align="center">
              <img
                src="/TravelVerseLogo.png" // Path to the image in your public folder
                alt="Travel Verse"
                style={{ height: '40px', width: 'auto' }} // Adjust the size here
              />
              <Text fontSize="2xl" fontWeight="bold" ml={2} color="blue.700">
                TravelVerse
              </Text>
            </Flex>
          </Link>
        </Flex>

        {/* Right-side section with profile, logo, and dark/light toggle */}
        <Flex alignItems="center" ml={4}>
          <Stack direction="row" spacing={7}>
            <Header /> {/* Add the Header component here for dark/light mode toggle */}

            {/* Profile Avatar */}
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  src="https://avatars.dicebear.com/api/male/username.svg"
                />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar
                    size="2xl"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                  />
                </Center>
                <br />
                <Center>
                  <p>
                    {user
                      ? `Welcome, ${user.username}`
                      : 'Guest'}
                  </p>
                </Center>
                <br />
                <MenuDivider />

                {/* Conditional rendering based on user state */}
                {user ? (
                  <MenuItem>
                    <LogoutButton /> {/* Show LogoutButton if the user is logged in */}
                  </MenuItem>
                ) : (
                  <Link as={RouterLink} to="/auth">
                    <MenuItem>Login</MenuItem>
                  </Link>
                )}
              </MenuList>
            </Menu>
          </Stack>
        </Flex>

        {/* Hamburger menu for smaller screens */}
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            onClick={onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
          />
        </Box>
      </Flex>

      {/* Drawer for smaller screens */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Link
                as={RouterLink}
                to="/"
                fontWeight="medium"
                color={textColor}
                _hover={{ color: 'blue.700' }}
              >
                Home
              </Link>
              {user ? (
                <MenuItem>
                  <LogoutButton /> {/* Show LogoutButton in Drawer if logged in */}
                </MenuItem>
              ) : (
                <Link as={RouterLink} to="/auth">
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
