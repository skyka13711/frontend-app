import { Provider } from '@/components/ui/provider'
import { MainPage } from '@/pages/MainPage'

import '@/features/calc/model/init'

export const App = () => {
  return (
    <Provider>
      <MainPage />
    </Provider>
  )
}
