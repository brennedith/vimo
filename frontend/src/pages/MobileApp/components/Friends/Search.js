import React, { useState, useEffect } from 'react';

import FriendsService from '../../../../services/FriendsService';

import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query !== '') {
      FriendsService.search(query).then(({ data: results }) =>
        setResults(results)
      );
    }
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <ul>
        {results.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Search;
