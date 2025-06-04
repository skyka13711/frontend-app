import { Provider } from '@/components/ui/provider'
import { MainPage } from '@/pages/MainPage'

export const App = () => {
  return (
    <Provider>
      <MainPage />
    </Provider>
  )
}
