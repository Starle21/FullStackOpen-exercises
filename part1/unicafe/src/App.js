import React, { useState } from 'react';

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [good, setGood] = useState(0);
  const total = bad + neutral + good;
  const average = (good - bad) / total;
  const positivePercent = (good / total) * 100;

  const giveFeedback = type => {
    if (type === 'good') return () => setGood(good + 1);
    if (type === 'bad') return () => setBad(bad + 1);
    if (type === 'neutral') return () => setNeutral(neutral + 1);
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={giveFeedback('good')} text="good" />
      <Button handleClick={giveFeedback('neutral')} text="neutral" />
      <Button handleClick={giveFeedback('bad')} text="bad" />
      <Title text="statistics" />
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>total: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercent}%</p>
    </div>
  );
};

export default App;
