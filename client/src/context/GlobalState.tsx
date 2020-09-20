import React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import { ITransaction, InitialStateType } from '../types';
import axios from 'axios';

// Initial state
const initialState: InitialStateType = {
	transactions: [],
	error: null,
	loading: true,
	getTransactions() {},
	addTransaction() {},
	deleteTransaction() {},
};

// Create context
export const GlobalContext = createContext<InitialStateType>(initialState);

// Provider component
export const GlobalProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
	async function getTransactions() {
		try {
			const res = await axios.get('http://localhost:4000/api/transactions');
			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data,
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error,
			});
		}
	}

	async function deleteTransaction(id: number) {
		try {
			await axios.delete(`http://localhost:4000/api/transactions/${id}`);
			dispatch({
				type: 'DELETE_TRANSACTION',
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error,
			});
		}
	}

	async function addTransaction(transaction: ITransaction) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(
				'http://localhost:4000/api/transactions',
				transaction,
				config
			);

			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
