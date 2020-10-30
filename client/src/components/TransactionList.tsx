import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/AppContext';
import { TransactionItem } from './TransactionItem';
import { ITransaction } from '../types';
// import { getTransactions } from '../context/appActions';

export const TransactionList: React.FC = () => {
	const {
		state: { transactions },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getTransactions() {
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

	return (
		<>
			<h3>History</h3>
			<ul id="list" className="list">
				{transactions.map((transaction: ITransaction) => (
					<TransactionItem key={transaction._id} transaction={transaction} />
				))}
			</ul>
		</>
	);
};
