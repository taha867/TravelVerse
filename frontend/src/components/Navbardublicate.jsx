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
  Container,
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
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define styles
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      as="nav"
      position="fixed"
      w="full"
      zIndex={100}
      transition="all 0.3s ease-in-out"
      bg={isSticky ? bgColor : 'transparent'}
      boxShadow={isSticky ? 'sm' : 'none'}
      backdropFilter={isSticky ? 'blur(8px)' : 'none'}
    >
      <Container maxW="8xl">
        <Flex
          align="center"
          justify="space-between"
          h="4.5rem"
          transition="all 0.3s ease-in-out"
        >
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <img
              src="/TravelVerseLogo.png"
              alt="TravelVerse"
              style={{ height: '35px', width: 'auto' }}
            />
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, teal.500, teal.300)"
              bgClip="text"
              display={{ base: 'none', md: 'block' }}
            >
              TravelVerse
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex
            gap={8}
            align="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <Link
              as={RouterLink}
              to="/browse"
              color={isSticky ? textColor : 'white'}
              fontWeight="500"
              _hover={{ color: 'teal.400' }}
              transition="all 0.2s"
            >
              Explore
            </Link>
            <Link
              as={RouterLink}
              to="/destinations"
              color={isSticky ? textColor : 'white'}
              fontWeight="500"
              _hover={{ color: 'teal.400' }}
              transition="all 0.2s"
            >
              Destinations
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              color={isSticky ? textColor : 'white'}
              fontWeight="500"
              _hover={{ color: 'teal.400' }}
              transition="all 0.2s"
            >
              About
            </Link>
          </Flex>

          {/* Right Section */}
          <Flex align="center" gap={4}>
            <Header />
            
            {/* Profile Menu */}
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
                  src={user?.profilePic || "https://bit.ly/broken-link"}
                  bg="teal.500"
                />
              </MenuButton>
              <MenuList>
                <Center p={4}>
                  <VStack>
                    <Avatar
                      size="xl"
                      src={user?.profilePic || "https://bit.ly/broken-link"}
                      bg="teal.500"
                    />
                    <Text fontWeight="500">
                      {user ? user.username : 'Guest'}
                    </Text>
                  </VStack>
                </Center>
                <MenuDivider />
                {user ? (
                  <>
                    <MenuItem as={RouterLink} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/settings">
                      Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <LogoutButton />
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem as={RouterLink} to="/auth">
                    Login
                  </MenuItem>
                )}
              </MenuList>
            </Menu>

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              variant="ghost"
              color={isSticky ? textColor : 'white'}
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
            />
          </Flex>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={4}>
              <Link as={RouterLink} to="/browse" onClick={onClose}>
                Explore
              </Link>
              <Link as={RouterLink} to="/destinations" onClick={onClose}>
                Destinations
              </Link>
              <Link as={RouterLink} to="/about" onClick={onClose}>
                About
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
