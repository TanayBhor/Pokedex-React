import { Pokemon } from './Pokemon'
import './styles/App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import PokemonDetail from './PokemonDetail'
import About from './pages/About'
import Stats from './pages/Stats'
import Evolution from './pages/Evolution'
import RootLayout from './layout/RootLayout'
import DetailLayout from './layout/DetailLayout'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Pokemon />} />
        <Route path="/pokemon/:name" element={<DetailLayout />}>
          <Route index element={<Navigate to="about" replace />} />
          <Route path='about' element={<About />} />
          <Route path='stats' element={<Stats />} />
          <Route path='evolution' element={<Evolution />} />
        </Route>
      </Route>
    )
  )

  return (
      <RouterProvider router={router} />
  )
}

export default App
