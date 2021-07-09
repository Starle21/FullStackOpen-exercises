import React, { useState, useEffect } from 'react';
import personsService from './services/persons';

const Person = ({ person, click }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={click}>delete</button>
    </div>
  );
};

const Persons = props => {
  const filteredPersons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter)
  );

  const handleDelete = person => {
    const result = window.confirm(`Are you sure to delete ${person.name}?`);
    if (result) {
      personsService.remove(person.id);
      props.setPersons(filteredPersons.filter(p => p.id !== person.id));
    }
  };

  return filteredPersons.map(person => (
    <Person
      key={person.name}
      person={person}
      click={() => handleDelete(person)}
    />
  ));
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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = e => {
    e.preventDefault();
    let id = null;

    //check whether the array already happens to include the same name
    if (persons.some(person => person.name === newName)) {
      const result = window.confirm(
        `${newName} has already been added to the phonebook, replace the old number with the new one?`
      );
      if (result) {
        const person = persons.filter(person => person.name === newName);
        id = person[0].id;
      } else return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };

    // update if the array already includes the name
    if (id) {
      personsService.update(id, newObject).then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setNotification(`Number changed for ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3500);
      });
    }

    if (!id) {
      personsService.create(newObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotification(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3500);
      });
    }

    // erasing to initial empty state
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
      <Notification message={notification} />
      <PersonNameFilter
        value={filterValue}
        onChange={handleFilterChange}
        text="filter name by: "
      />
      <h2>Add a new contact</h2>
      <PersonAddNew submit={addPerson} state={state} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterValue} setPersons={setPersons} />
    </div>
  );
};

export default App;
