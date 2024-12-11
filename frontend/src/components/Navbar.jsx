import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  Button,
  useColorModeValue,
  VStack,
  Stack,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../Uatoms/userAtom"; // Recoil state for user
import CompanyAtom from "../CAtom/CuserAtom"; // Recoil state for company
import LogoutButton from "../Users/ULogOutButton"; // Logout component
import Header from "./Header"; // Light/Dark mode toggle component

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userAtom); // Current user state from Recoil
  const TCompany = useRecoilValue(CompanyAtom); // Current company state from Recoil
  const navigate = useNavigate();

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  // Navigate to appropriate registration/login pages
  const handleNavigate = (type, role) => {
    if (type === "register") {
      navigate(role === "user" ? "/Uauth" : "/Cauth");
    }
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={50}
      bg={isSticky ? bgColor : "transparent"}
      transition="all 0.3s ease-in-out"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={isSticky ? bgColor : "transparent"}
        color={textColor}
        backdropFilter="blur(10px)"
      >
        {/* Logo */}
        <Flex align="center" mr={5}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <img
                src="/TravelVerseLogo.png"
                alt="Travel Verse"
                style={{ height: "40px", width: "auto" }}
              />
              <Text fontSize="2xl" fontWeight="bold" ml={2} color="blue.700">
                TravelVerse
              </Text>
            </Flex>
          </Link>
        </Flex>

        {/* Right-side controls */}
        <Flex alignItems="center" ml={4}>
          <Stack direction="row" spacing={7}>
            <Header /> {/* Light/Dark mode toggle */}

            {!user && !TCompany ? (
              <>
                {/* Register Button */}
                <Menu>
                  <MenuButton as={Button} colorScheme="blue">
                    Register
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleNavigate("register", "user")}>
                      Register as User
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("register", "company")}
                    >
                      Register as Travel Company
                    </MenuItem>
                  </MenuList>
                </Menu>

              </>
            ) : (
              // Profile Avatar (When logged in)
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
                    <Text>
                      {user
                        ? `Welcome, ${user.username}`
                        : `Welcome, ${TCompany.companyName}`}
                    </Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as={RouterLink} to="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem>
                    <LogoutButton />
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Flex>

        {/* Hamburger menu */}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            onClick={onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
          />
        </Box>
      </Flex>

      {/* Drawer for small screens */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Link as={RouterLink} to="/" fontWeight="medium" color={textColor}>
                Home
              </Link>
              {!user && !TCompany ? (
                <>
                  <MenuItem onClick={() => handleNavigate("register", "user")}>
                    Register as User
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("register", "company")}
                  >
                    Register as Travel Company
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate("login", "user")}>
                    Login as User
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigate("login", "company")}
                  >
                    Login as Travel Company
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={RouterLink} to="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem>
                    <LogoutButton />
                  </MenuItem>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
