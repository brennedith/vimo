import React, { useState, useContext, useEffect } from 'react';

import Content from '../Content';
import List from './List';

import appContext from '../../../../services/context';
import FriendsService from '../../../../services/FriendsService';

import './index.css';

const Friends = () => {
  const { state } = useContext(appContext);
  const { friends } = state.profile.user;

  const [query, setQuery] = useState('');
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (query === '') {
      setPeople(friends);
    } else {
      FriendsService.search(query).then(({ data: results }) =>
        setPeople(results)
      );
    }
  }, [query, friends]);

  return (
    <Content>
      <div className="SearchBox">
        <label className="label">
          Search
          <input
            className="input"
            type="text"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />
        </label>
      </div>
      <ul>
        <List people={people} />
      </ul>
    </Content>
  );
};

export default Friends;
