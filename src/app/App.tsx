import { Provider } from '@/components/ui/provider'
import { MainPage } from '@/pages/MainPage'
import { Theme } from '@chakra-ui/react'

import '@/features/calc/model/init'

export const App = () => {
  return (
    <Provider>
      <Theme display="flex" flexDirection="column" flexGrow={1} appearance="light">
        <MainPage />
      </Theme>
    </Provider>
  )
}
