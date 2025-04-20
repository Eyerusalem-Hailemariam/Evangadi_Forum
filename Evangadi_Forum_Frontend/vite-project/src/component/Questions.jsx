import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppState } from '../App'
import { useRef, useContext } from 'react';

function Questions() {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState(null)
  const { user, answerQuestion } = useContext(AppState)

  useEffect(() => {
    async function fetchQuestionDetails() {
      
      try {
        
        const response = await axios.get(`http://localhost:5000/api/question/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log("Fetching question details for ID:", id),
        setQuestion(response.data) 
        console.log("Response data:", response.data)

      } catch (err) {
        setError("Could not load question")
        console.error("Error fetching question:", err)
      }
    }

    fetchQuestionDetails()
  }, [id])

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const response = await axios.get(`http://localhost:5000/api/answer/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log("Fetching answers for question ID:", id),
        setAnswers(response.data) 
        console.log("Response answer:", response.data)

      } catch (err) {
        setError("Could not load answers")
        console.error("Error fetching answers:", err)
      }
    }
    fetchAnswers()
  }, [id])
  const answerDom = useRef(null)
  const navigate = useNavigate()

  async function handleAddQuestion(e) {
    e.preventDefault()
    const  answer  = answerDom.current.value

    if (answer.length > 500) {
      alert("Answer should be less than 500 characters")
      return
    }
    try {
      const data = await answerQuestion(answer,id);
      console.log("Answer data:", data)
      alert("Answer added successfully")
      navigate(`/question/${id}`)
    } catch (error) {
      console.error("Error posting answer:", error)
    }
  }

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>Question Detail for ID: {id}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {question ? (
        <>
          <h2>Title: {question.title}</h2>
          <p>Description: {question.description}</p>
        </>
      ) : (
        !error && <p>Loading question...</p>
      )}
      
      <section>
        <section>

        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.answerid}>
              <p>{answer.answer}</p>
              <p>Answered by: {user.username}</p>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
        
        </section>
        <h2>Answers</h2>
        <form onSubmit={handleAddQuestion}>
          <div>
          <textarea ref={answerDom} placeholder="Write your answer here"></textarea>
          </div>
        <button type='submit'>Post</button>
        </form>
      </section>
    </div>
  )
}

export default Questions
