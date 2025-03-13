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
      return user.profilePic || "https://via.placeholder.com/150"; // Default placeholder for user
    }
    if (TCompany) {
      return TCompany.profilePic || "https://via.placeholder.com/150"; // Default placeholder for company
    }
    return "https://via.placeholder.com/150"; // Default avatar for non-logged-in state
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={50}
      bg={"teal.500"}
      transition="all 0.3s ease-in-out"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={"teal.500"}
        color={textColor}
        backdropFilter="blur(10px)"
      >
        <Flex align="center" mr={5}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Flex align="center">
              <img
                src="/TravelVerseLogo.png"
                alt="Travel Verse"
                style={{ height: "40px", width: "auto" }}
              />
              <Text fontSize="2xl" fontWeight="bold" ml={2} color="white">
                TravelVerse
              </Text>
            </Flex>
          </Link>
        </Flex>

        <Flex alignItems="center" ml={4}>
          <Stack direction="row" spacing={7}>
            <Link as={RouterLink} to="/browse" color="white" fontWeight="medium">
              Browse
            </Link>
            <Link as={RouterLink} to="/contact" color="white" fontWeight="medium">
              Contact
            </Link>
            <Header />
            {!user && !TCompany && !admin ? (
              <Button colorScheme="blue" onClick={onModalOpen}>
                Register
              </Button>
            ) : (
              <Menu>
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
          </Stack>
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            onClick={onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
          />
        </Box>
      </Flex>

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
              <Link as={RouterLink} to="/browse" fontWeight="medium" color={textColor}>
                Browse
              </Link>
              <Link as={RouterLink} to="/contact" fontWeight="medium" color={textColor}>
                Contact
              </Link>
              {!user && !TCompany && !admin ? (
                <>
                  <MenuItem onClick={() => handleNavigate("register", "user")}>
                    Register as User
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate("register", "company")}>
                    Register as Travel Company
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate("register", "admin")}>
                    Register as Admin
                  </MenuItem>
                </>
              ) : (
                <>
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