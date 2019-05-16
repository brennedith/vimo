import React, { useReducer, createContext } from 'react';

import initialState from './appContext/initialState';
import reducer from './appContext/reducer';

const appContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default appContext;
export { ContextProvider };
