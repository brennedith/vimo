import React from 'react';

import Person from './Person';

import './List.css';

const List = ({ people }) => {
  if (!people) return null;

  return (
    <ul>
      {people.map(person => (
        <Person key={person._id} {...person} />
      ))}
    </ul>
  );
};

export default List;
