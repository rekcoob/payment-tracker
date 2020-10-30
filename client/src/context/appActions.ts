import { Dispatch } from 'react';
import axios from 'axios';
import { GlobalActionType, ITransaction } from '../types';

// Actions
async function getTransactions(dispatch: Dispatch<GlobalActionType>) {
	try {
		const res = await axios.get('/api/transactions');
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

async function deleteTransaction(
	dispatch: Dispatch<GlobalActionType>,
	id: number
) {
	try {
		await axios.delete(`/api/transactions/${id}`);
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

async function addTransaction(
	dispatch: Dispatch<GlobalActionType>,
	transaction: ITransaction
) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/transactions', transaction, config);

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

export { getTransactions, deleteTransaction, addTransaction };
