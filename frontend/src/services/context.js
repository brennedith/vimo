import React, { createContext } from 'react';

import initialState from './appContext/initialState';
import reducer from './appContext/reducer';

const appContext = createContext();

const ContextProvider = ({ children }) => (
  <appContext.Provider
    value={{
      state: initialState,
      dispatch: reducer
    }}
  >
    {children}
  </appContext.Provider>
);

export default appContext;
export { ContextProvider };
