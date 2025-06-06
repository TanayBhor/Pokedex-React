import DetailLayout from './layout/DetailLayout'
import RootLayout from './layout/RootLayout'
import About from './pages/detail/About'
import Evolution from './pages/detail/Evolution'
import Stats from './pages/detail/Stats'
import Types from './pages/Types'
import Favourite from './pages/Favourite'
import { Home } from './pages/Home'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import PokemonByType from './pages/PokemonByType'
import TypesLayout from './layout/TypesLayout'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>

        <Route path='/' element={<Home />} />
        <Route path='/type' element={<TypesLayout />}>
          <Route path="/type" element={<Types />} />
          <Route path="/type/:typeName" element={<PokemonByType />} />
        </Route>
        <Route path='/favourite' element={<Favourite />} />

        <Route path="/pokemon/:name" element={<DetailLayout />}>
          <Route index element={<Navigate to="about" replace />} />
          <Route path='about' element={<About />} />
          <Route path='stats' element={<Stats />} />
          <Route path='evolution' element={<Evolution />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
      <RouterProvider router={router} />
  )
}

export default App
