import React, { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../App';

function AskQuestion() {
  const navigate = useNavigate();
  const { user, askQuestion } = useContext(AppState);

  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagsDom = useRef(null);

  async function handleQuestionAddition(e){
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value;
    const tags = tagsDom.current.value.split(',').map(tag => tag.trim());
  
    if(title === "" || description === "" || tags.length === 0){
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
    } catch(error) {
      console.log("Error posting question:", error);
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">Back to Home</Link>
      <h1>Ask a Question</h1>
      <h3>Follow these steps to write a good question:</h3>
      <ul>
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Explain what you tried and what you expected to happen.</li>
        <li>Review your question and post it to the site.</li>
      </ul>

      <section>
        <form onSubmit={handleQuestionAddition}>
          <div>
            <label htmlFor="title">Title</label>
            <input ref={titleDom} type="text" id="title" name="title" placeholder="Title of your question" required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea ref={descriptionDom} id="description" name="description" placeholder="Describe your question in detail" required></textarea>
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <input ref={tagsDom} type="text" id="tags" name="tags" placeholder="Tags (comma-separated)" required />
          </div>
          <button type="submit">Post Question</button>
        </form>
      </section>
    </div>
  );
}

export default AskQuestion;
