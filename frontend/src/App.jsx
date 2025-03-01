import { 
  Box,
  useColorModeValue
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import NavigationBar from "./components/NavigationBar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"

function App() {

  return (
    <Box
      minH={"100vh"}
      bg={useColorModeValue("gray.300", "gray.900")}
    >
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/createPage"
          element={<CreatePage />}
        />
      </Routes>
    </Box>
  )
}

export default App
