import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra's global color mode context
  
  return (
    <IconButton
      aria-label="Toggle Color Mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} // Toggle between icons based on color mode
      onClick={toggleColorMode} // Toggle the color mode on click
      variant="link"
      cursor="pointer"
      size="lg"
    />
  );
};

export default Header;
