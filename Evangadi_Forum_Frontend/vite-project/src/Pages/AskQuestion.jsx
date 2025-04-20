import React, { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../App';

function AskQuestion() {
  const navigate = useNavigate();
  const { user, askQuestion } = useContext(AppState);

  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagsDom = useRef(null);

  async function handleQuestionAddition(e) {
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value;
    const tags = tagsDom.current.value.split(',').map(tag => tag.trim());

    if (!title || !description || tags.length === 0) {
      alert("Please fill all the fields");
      return;
    }

    if (title.length > 200) {
      alert("Title should be less than 200 characters");
      return;
    }

    try {
      const data = await askQuestion(title, description, tags);
      alert("Question added successfully");
      navigate('/');
    } catch (error) {
      console.error("Error posting question:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
        <div className="mb-6">
          <Link to="/" className="text-sm text-blue-600 hover:underline">&larr; Back to Home</Link>
        </div>

        <h1 className="text-3xl font-bold text-purple-700 mb-4">Ask a Question</h1>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Follow these steps to write a good question:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Explain what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        <form onSubmit={handleQuestionAddition} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              ref={titleDom}
              type="text"
              id="title"
              name="title"
              placeholder="Title of your question"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              ref={descriptionDom}
              id="description"
              name="description"
              rows="5"
              placeholder="Describe your question in detail"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-purple-400 outline-none"
            ></textarea>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              ref={tagsDom}
              type="text"
              id="tags"
              name="tags"
              placeholder="e.g., javascript, react, css"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
