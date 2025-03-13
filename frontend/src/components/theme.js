import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      200: "#80bfff",
      300: "#4da6ff",
      400: "#1a8cff",
      500: "#0073e6",
      600: "#005bb3",
      700: "#004280",
      800: "#002a4d",
      900: "#00121a",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Roboto', sans-serif",
  },
})

export default theme

