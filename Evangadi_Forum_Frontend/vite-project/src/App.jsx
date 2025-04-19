import { useEffect, useState, createContext } from "react"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import {Routes, Route, useNavigate} from "react-router-dom"
import axios from "./axiosConfig"
import AskQuestion from "./Pages/AskQuestion"

// ... other imports
export const AppState = createContext();

function App() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      try {
        const { data } = await axios.get('/user/check', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error.response);
        navigate('/login');
      }
    }
    checkUser();
  }, [navigate]);

  const askQuestion = async (title, description, tags) => {
    try {
      const { data } = await axios.post(
        '/question/ask',
        {
          userid: user.userid,
          username: user.username,
          title,
          description,
          tags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error('Failed to post question:', error.response);
      throw error;
    }
  };

  return (
    <AppState.Provider value={{ user, setUser, askQuestion }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
