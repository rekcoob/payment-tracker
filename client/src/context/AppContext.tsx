import React, { createContext, Dispatch, useReducer } from 'react';
import { appReducer } from './appReducer';
import { InitialStateType, GlobalActionType } from '../types';

// Initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

// Create context
// const GlobalContext = createContext<InitialStateType>(initialState);
const GlobalContext = createContext<{
	state: InitialStateType;
	dispatch: Dispatch<GlobalActionType>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Provider component
const GlobalProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export { GlobalProvider, GlobalContext };
