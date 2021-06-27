import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ course }) => {
  console.log(course);
  return (
    <>
      {course.parts.map(part => {
        return (
          <Part key={part.id} part={part.name} exercise={part.exercises} />
        );
      })}
    </>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      Number of exercises:{' '}
      {course.parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'xxx',
        exercises: 0,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
