//import { useState } from 'react';
import { Router, Route, Routes} from "react-router-dom"
import Homepage from './pages/Home';
import RegisterPage from './pages/Register';
import SignINPage from './pages/SignIn';
import NavBar from "./components/Navbar";
import FeedPage from "./pages/FeedPage";


import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/signin' element={<SignINPage/>}/>
        <Route path='/feed' element={<FeedPage/>}/>
       
      </Routes>
    </>
  )
}

export default App
