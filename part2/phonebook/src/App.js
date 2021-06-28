import React, { useState } from 'react';

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const PersonNameFilter = props => {
  return (
    <>
      <div>
        {props.text}
        <input value={props.value} onChange={props.onChange} />
      </div>
    </>
  );
};

const PersonAddNew = props => {
  return (
    <form onSubmit={props.submit}>
      <div>
        <div>
          name:{' '}
          <input
            value={props.state.newName}
            onChange={props.state.handleNameChange}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={props.state.newNumber}
            onChange={props.state.handleNumberChange}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = props => {
  const filteredPersons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter)
  );

  return filteredPersons.map(person => (
    <Person key={person.name} person={person} />
  ));
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

  const state = {
    newName: newName,
    handleNameChange: handleNameChange,
    newNumber: newNumber,
    handleNumberChange: handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonNameFilter
        value={filterValue}
        onChange={handleFilterChange}
        text="filter name by: "
      />
      <h2>Add a new contact</h2>
      <PersonAddNew submit={addPerson} state={state} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterValue} />
    </div>
  );
};

export default App;
