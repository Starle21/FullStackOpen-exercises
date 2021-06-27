import React, { useState } from 'react';

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ state }) => {
  return (
    <>
      <Title text="statistics" />
      <p>good: {state.good}</p>
      <p>neutral: {state.neutral}</p>
      <p>bad: {state.bad}</p>
      <p>total: {state.total}</p>
      <p>average: {state.average}</p>
      <p>positive: {state.positivePercent}%</p>
    </>
  );
};

const App = () => {
  // DATA, FUNCTIONS ON DATA
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [good, setGood] = useState(0);

  const statistics = {
    bad: bad,
    neutral: neutral,
    good: good,
    total: bad + neutral + good,
  };
  statistics.average = (good - bad) / statistics.total;
  statistics.positivePercent = (good / statistics.total) * 100;

  const giveFeedback = type => {
    if (type === 'good') return () => setGood(good + 1);
    if (type === 'bad') return () => setBad(bad + 1);
    if (type === 'neutral') return () => setNeutral(neutral + 1);
  };

  // RENDERING
  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={giveFeedback('good')} text="good" />
      <Button handleClick={giveFeedback('neutral')} text="neutral" />
      <Button handleClick={giveFeedback('bad')} text="bad" />

      <Statistics state={statistics} />
    </div>
  );
};

export default App;
