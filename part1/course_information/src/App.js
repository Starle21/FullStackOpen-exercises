import React from 'react';

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Part = props => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = props => {
  return (
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises:{' '}
      {props.exercises[0].exercises +
        props.exercises[1].exercises +
        props.exercises[2].exercises}{' '}
    </p>
  );
};

const App = () => {
  const course = 'Half stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exercises={[part1, part2, part3]} />
    </div>
  );
};

export default App;
