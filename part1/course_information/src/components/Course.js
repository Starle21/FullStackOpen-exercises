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

export default Course;
