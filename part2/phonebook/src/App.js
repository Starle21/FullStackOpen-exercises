import React, { useState } from 'react';

const Person = ({ person }) => {
  return <div>{person}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = e => {
    e.preventDefault();
    const newNameObject = {
      name: newName,
    };
    setPersons(persons.concat(newNameObject));
    setNewName('');
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person.name} />
      ))}
    </div>
  );
};

export default App;
