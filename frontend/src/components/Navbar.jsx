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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import AdminAtom from "../AAtom/AuserAtom";
import userAtom from "../Uatoms/userAtom"; // Recoil state for user
import CompanyAtom from "../CAtom/CuserAtom"; // Recoil state for company
import ULogoutButton from "../Users/ULogOutButton"; // Logout component
import CLogOutButton from "../TravelCompany/CLogOutButton";
import AdminLogOutButton from "../Admin/ALogoutBoutton";
import Header from "./Header"; // Light/Dark mode toggle component

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const user = useRecoilValue(userAtom); // Current user state from Recoil
  const TCompany = useRecoilValue(CompanyAtom); // Current company state from Recoil
  const admin = useRecoilValue(AdminAtom);
  const navigate = useNavigate();

  const textColor = useColorModeValue("black", "white");
  const modalBgColor = useColorModeValue("white", "gray.800"); // Background color for modal

  const handleNavigate = (type, role) => {
    onModalClose(); // Close the modal after navigating
    if (type === "register") {
      navigate(
        role === "user"
          ? "/Uauth"
          : role === "company"
          ? "/Cauth"
          : role === "admin"
          ? "/Aauth"
          : null
      );
    }
  };

  // Get avatar URL dynamically
  const getAvatarUrl = () => {
    if (user) {
      return user.profilePic || "https://placekitten.com/150/150"; // Fallback to Placekitten
    }
    if (TCompany) {
      return TCompany.profilePic || "https://placekitten.com/150/150"; // Fallback to Placekitten
    }
    return "https://placekitten.com/150/150"; // Default avatar
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      right={0}
      left={0}
      height="72px" // Explicit height for the navbar
      zIndex={1000} // Higher z-index to ensure it stays on top
      bg={useColorModeValue("rgba(255,255,255,0.95)", "rgba(26,32,44,0.95)")}
      backdropFilter="blur(10px)"
      transition="all 0.3s ease-in-out"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Container 
        maxW="8xl" 
        h="full" // Make container take full height
      >
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          h="full" // Make flex take full height
        >
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <img
              src="/TravelVerseLogo.png"
              alt="TravelVerse"
              style={{ height: "32px", width: "auto" }}
            />
            <Text
              fontSize="xl"
              fontWeight="700"
              bgGradient="linear(to-r, blue.500, blue.300)"
              bgClip="text"
            >
              TravelVerse
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex gap={8} align="center" display={{ base: "none", md: "flex" }}>
           
            <Link
              as={RouterLink}
              to="/browse"
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="500"
              fontSize="sm"
              _hover={{
                color: "blue.500",
                transform: "translateY(-1px)",
              }}
              transition="all 0.2s"
            >
              Destinations
            </Link>
            <Link
              as={RouterLink}
              to="/contact"
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="500"
              fontSize="sm"
              _hover={{
                color: "blue.500",
                transform: "translateY(-1px)",
              }}
              transition="all 0.2s"
            >
              About
            </Link>
            <Header />
            <Button
              colorScheme="blue"
              size="sm"
              px={6}
              fontWeight="500"
              fontSize="sm"
              _hover={{
                transform: "translateY(-1px)",
                shadow: "md",
              }}
              onClick={onModalOpen}
            >
              Register
            </Button>
          </Flex>

          {/* Menu for logged in users */}
          {!user && !TCompany && !admin ? (
            ""
          ) : (
            <Menu display={{ base: "none", md: "flex" }}>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" src={getAvatarUrl()} />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar size="2xl" src={getAvatarUrl()} />
                </Center>
                <br />
                <Center>
                  <Text>
                    {user
                      ? `Welcome, ${user.username}`
                      : TCompany
                      ? `Welcome, ${TCompany.companyName}`
                      : `Welcome, Admin`}
                  </Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem as={RouterLink} to="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem>
                  {user ? (
                    <ULogoutButton />
                  ) : TCompany ? (
                    <CLogOutButton />
                  ) : admin ? (
                    <AdminLogOutButton />
                  ) : null}
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              onClick={onOpen}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="outline"
              aria-label="Open Menu"
            />
          </Box>
        </Flex>
      </Container>

      {/* Modal for Register Options */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} size="lg">
        <ModalOverlay />
        <ModalContent
          mt="10" // Center modal with a slight offset from top
          bg={modalBgColor} // Adjust modal background based on color mode
          borderRadius="lg"
          boxShadow="lg"
          p={5}
          position="absolute"
          top="20%" // Place the modal's top at the center of the screen
          left="35%" // Center the modal horizontally
          transform="translate(-50%, -40%)" // Adjust to move the modal slightly lower than the center
        >
          <ModalHeader
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            color="teal.500"
          >
            Choose Your Role
          </ModalHeader>
          <ModalCloseButton color="teal.500" />
          <ModalBody>
            <VStack spacing={4}>
              <Button
                colorScheme="blue"
                variant="solid"
                width="100%"
                onClick={() => handleNavigate("register", "user")}
              >
                Register as User
              </Button>
              <Button
                colorScheme="teal"
                variant="solid"
                width="100%"
                onClick={() => handleNavigate("register", "company")}
              >
                Register as Travel Company
              </Button>
              <Button
                colorScheme="purple"
                variant="solid"
                width="100%"
                onClick={() => handleNavigate("register", "admin")}
              >
                Register as Admin
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onModalClose} color="teal.500">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Drawer for small screens */}
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
              >
                Home
              </Link>
              <Link
                as={RouterLink}
                to="/browse"
                fontWeight="medium"
                color={textColor}
              >
                Browse
              </Link>
              <Link
                as={RouterLink}
                to="/contact"
                fontWeight="medium"
                color={textColor}
              >
                Contact
              </Link>
              {!user && !TCompany && !admin ? (
                <>
                  <Menu>
                    <MenuItem
                      onClick={() => handleNavigate("register", "user")}
                    >
                      Register as User
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("register", "company")}
                    >
                      Register as Travel Company
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigate("register", "admin")}
                    >
                      Register as Admin
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Menu>
                    <MenuItem as={RouterLink} to="/dashboard">
                      Dashboard
                    </MenuItem>
                    <MenuItem>
                      {user ? (
                        <ULogoutButton />
                      ) : TCompany ? (
                        <CLogOutButton />
                      ) : admin ? (
                        <AdminLogOutButton />
                      ) : null}
                    </MenuItem>
                  </Menu>
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
