import { useEffect, useState, createContext } from "react"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import {Routes, Route, useNavigate} from "react-router-dom"
import axios from "./axiosConfig"

export const AppState = createContext()

function App() {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    async function checkUser() {
      try {
        const { data } = await axios.get('/user/check', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(data);
      } catch(error) {
        console.log(error.response)
        Navigate('/login')
      }
    } checkUser(); 
  
  }, [navigate]);
  

 

  return (
    <AppState.Provider value={{user, setUser}}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </AppState.Provider>
  )
}

export default App
