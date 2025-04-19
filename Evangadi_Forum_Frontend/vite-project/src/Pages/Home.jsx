import React, { useContext, useEffect } from 'react'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'

function Home() {
  const navigate = useNavigate()
  const {user} = useContext(AppState)
  console.log(user)
  const [question, setofQuestion] = React.useState([])

  function handleAskHandle(e){
    navigate('/ask')

  }
  useEffect(()=>{
    async function fetchQuetions() {
      try {
        const response = await axios.get('/question/all-questions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });  
        const  data  = response.data;
      const sorted = data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      )
      setofQuestion(sorted)
      console.log(setofQuestion)
    } catch (error) {
        console.error('Error fetching questions:', error);
      }
  }
    fetchQuetions();

  }, []);

  function handleQuestionClick(id) {
    navigate(`/question/${id}`)
  }

  return (
    <div>
      <h1>Welcome : {user.username}</h1>
      <section>
          <button onClick={handleAskHandle}>Ask a Question</button>
      </section>

      <section>
        <h2>Questions</h2>
        <ul>
          {question.map((item, index)=> (
            <li key={item.id || index} onClick={() => handleQuestionClick(item.id)} style = {{cursor: "pointer", margin: "10px", padding: "10px", border: "1px solid black"}}>
              <strong>{item.title}</strong>
              <p>{item.username}</p>
            </li>
          ))}
        </ul>
      </section>    
      </div>

  )
}

export default Home
