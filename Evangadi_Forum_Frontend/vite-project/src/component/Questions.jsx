import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AppState } from '../App';

function Questions() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const { user, answerQuestion } = useContext(AppState);
  const answerDom = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestionDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/question/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setQuestion(response.data);
      } catch (err) {
        setError("Could not load question");
        console.error("Error fetching question:", err);
      }
    }

    fetchQuestionDetails();
  }, [id]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const response = await axios.get(`http://localhost:5000/api/answer/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAnswers(response.data);
      } catch (err) {
        setError("Could not load answers");
        console.error("Error fetching answers:", err);
      }
    }

    fetchAnswers();
  }, [id]);

  async function handleAddQuestion(e) {
    e.preventDefault();
    const answer = answerDom.current.value;

    if (answer.length > 500) {
      alert("Answer should be less than 500 characters");
      return;
    }

    try {
      await answerQuestion(answer, id);
      alert("Answer added successfully");
      answerDom.current.value = "";
      navigate(`/question/${id}`);
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <Link to="/" className="text-blue-600 hover:underline text-sm">&larr; Back to Home</Link>

        <h1 className="text-3xl font-bold text-purple-700 mt-4 mb-2">Question Details</h1>
        {error && <p className="text-red-600">{error}</p>}

        {question ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.title}</h2>
            <p className="text-gray-700">{question.description}</p>
          </div>
        ) : (
          !error && <p className="text-gray-500">Loading question...</p>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Answers</h2>
          {answers.length > 0 ? (
            <div className="space-y-4">
              {answers.map((answer) => (
                <div key={answer.answerid} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 mb-1">{answer.answer}</p>
                  <p className="text-xs text-gray-500">Answered by: {user.username}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No answers yet.</p>
          )}
        </div>

        <form onSubmit={handleAddQuestion} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Add Your Answer</h3>
          <textarea
            ref={answerDom}
            placeholder="Write your answer here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-400 outline-none"
            rows={5}
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Questions;
