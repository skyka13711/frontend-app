'use client'

import { ChakraProvider, createSystem, defaultConfig, defaultSystem, defineConfig } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

const customConfig = defineConfig({
  globalCss: {
    'html, body, #root': {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      fontSize: '16px'
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
