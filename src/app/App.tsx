import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from '@/pages/main'

const routes = [
  {
    path: '/',
    component: Main
  }
]

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} Component={route.component} />
        })}
      </Routes>
    </BrowserRouter>
  )
}
