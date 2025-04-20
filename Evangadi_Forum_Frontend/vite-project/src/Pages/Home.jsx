import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../App'
import { useNavigate, Link} from 'react-router-dom'
import axios from '../axiosConfig'

function Home() {
  const navigate = useNavigate()
  const { user } = useContext(AppState)
  const [questions, setQuestions] = useState([])

  function handleAskHandle() {
    navigate('/ask')
  }

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get('/question/all-questions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const sorted = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )

        setQuestions(sorted)

        sorted.forEach((item) => {
          console.log("question id", item.questionid);
        })
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  function handleQuestionClick(id) {
    navigate(`/question/${id}`)
  }

  return (
    <div>
      <h1>Welcome : {user?.username}</h1>

      <section>
        <button onClick={handleAskHandle}>Ask a Question</button>
      </section>

      <section>
        <h2>Questions</h2>
        <ul>
          {questions.map((item) => (
            <li
              key={item.questionid}
              onClick={() => handleQuestionClick(item.questionid)}
              style={{
                cursor: 'pointer',
                margin: '10px',
                padding: '10px',
                border: '1px solid black',
              }}
            >
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
