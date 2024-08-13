import { useState, useEffect } from 'react';
import './App.css';
import Description from './components/Description/Description.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Options from './components/Options/Options.jsx';
import Notification from './components/Notification/Notification.jsx';

const App = () => {

  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
    return savedFeedback ||
    {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  useEffect(() => {
    window.localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedback = totalFeedback ? Math.round(
    (feedback.good / totalFeedback) * 100
  ) : 0;

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App
