import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppContext';
import { ITransaction } from '../types';
import { numberWithSpaces } from '../utils/format';

export const Balance: React.FC = () => {
	const {
		state: { transactions },
	} = useContext(GlobalContext);

	const amounts = transactions.map(
		(transaction: ITransaction) => transaction.amount
	);

	const total = amounts
		.reduce((acc: number, item: number) => (acc += item), 0)
		.toFixed(2);

	return (
		<>
			<h4>Your Balance</h4>
			<h1>€{numberWithSpaces(total)}</h1>
		</>
	);
};
