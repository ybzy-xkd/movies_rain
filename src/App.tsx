import {BrowserRouter, useRoutes} from "react-router-dom";
import routers from "@/config/routers.tsx";

function AppRouters () {
  return useRoutes(routers)
}

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  )
}

export default App
