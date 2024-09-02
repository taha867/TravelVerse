import * as React from 'react'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { mode } from '@chakra-ui/theme-tools'
//import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from "./routers/router.jsx";
const styles ={
global:(props)=>({
  body:{
              //light mode  ,dark mode
    color:mode('gray.800','whiteAlpha.900')(props),
    bg:mode('gray.100','#101010')(props),

  }
})
}

const config={
initialColorMode: "dark",
useSystemColorMode: true
}

const colors ={
gray:{
  light:"#616161",
  dark:"#1e1e1e"
}
}

const theme = extendTheme({ config,styles,colors })

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode> 
    
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
    </ChakraProvider>
    
  </React.StrictMode>
)
