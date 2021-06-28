import React, { useState } from 'react';

const Person = ({ person }) => {
  return <div>{person}</div>;
};

// if newName === persons.name alert
// else add to persons

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = e => {
    e.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook`);
      return;
    }

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
