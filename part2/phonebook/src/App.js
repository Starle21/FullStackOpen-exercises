import React, { useState } from 'react';

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '689-5555' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

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

  const handleFilterChange = e => {
    setFilterValue(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter name by:{' '}
        <input value={filterValue} onChange={handleFilterChange} />
      </div>
      <h2>Add a new contact</h2>
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
      {filteredPersons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
