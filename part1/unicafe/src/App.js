import React, { useState } from 'react';

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <p>
        {text}: {value}
        {text === 'positive' ? '%' : ''}
      </p>
    </>
  );
};

const Statistics = ({ state }) => {
  if (state.total === 0) return <p>No feedback given</p>;
  if (state.total !== 0) {
    return (
      <>
        <Statistic text="good" value={state.good} />
        <Statistic text="neutral" value={state.neutral} />
        <Statistic text="bad" value={state.bad} />
        <Statistic text="total" value={state.total} />
        <Statistic text="average" value={state.average} />
        <Statistic text="positive" value={state.positivePercent} />
      </>
    );
  }
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

      <Title text="statistics" />
      <Statistics state={statistics} />
    </div>
  );
};

export default App;
