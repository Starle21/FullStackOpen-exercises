import React, { useState } from 'react';

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

// if newName === persons.name alert
// else add to persons

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '689-5555' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = e => {
    e.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook`);
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };
  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
