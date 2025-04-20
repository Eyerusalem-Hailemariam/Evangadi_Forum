import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'

function Home() {
  const navigate = useNavigate()
  const { user } = useContext(AppState)
  const [questions, setQuestions] = useState([])

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
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  const handleAskHandle = () => navigate('/ask')
  const handleQuestionClick = (id) => navigate(`/question/${id}`)

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-blue-700">Welcome, {user?.username}!</h1>
          <p className="text-gray-600 mt-2">Explore community questions or ask your own</p>
        </div>

        {/* Ask Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAskHandle}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            Ask a Question
          </button>
        </div>

        {/* Questions List */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Questions</h2>
          <ul className="grid gap-4">
            {questions.map((item) => (
              <li
                key={item.questionid}
                onClick={() => handleQuestionClick(item.questionid)}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
              >
                <h3 className="text-xl font-medium text-blue-700">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">Posted by: {item.username}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Home
