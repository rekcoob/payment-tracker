import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { TransactionItem } from './TransactionItem';
import { ITransaction } from '../types';

export const TransactionList: React.FC = () => {
	const { transactions, getTransactions } = useContext(GlobalContext);

	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
