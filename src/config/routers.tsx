import Home from "@/pages/home";
import MovieDetail from "@/pages/movieDetail";

export default [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/movie/:id',
    element: <MovieDetail/>,
  }
]
