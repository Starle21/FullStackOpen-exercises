import React from 'react';

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ course }) => {
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
    <h3>
      total number of exercises:{' '}
      {course.parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}
    </h3>
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
  const courses = [
    {
      name: 'Half stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return <Course key={course.id} course={course} />;
      })}
    </>
  );
};

export default App;
