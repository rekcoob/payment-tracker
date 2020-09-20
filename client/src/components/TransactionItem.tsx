import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
// import { ITransaction } from '../types';
import { numberWithCommas } from '../utils/format';

// type Props = {
// 	transaction: ITransaction;
// };

export const TransactionItem = ({ transaction }: any) => {
	// const { transaction } = props;
	const { text, amount } = transaction;

	const { deleteTransaction } = useContext(GlobalContext);

	const sign = amount < 0 ? '-' : '+';

	return (
		<li className={amount < 0 ? 'minus' : 'plus'}>
			{text}{' '}
			<span>
				{sign}${numberWithCommas(Math.abs(amount))}
			</span>
			<button
				onClick={() => deleteTransaction(transaction._id)}
				className="delete-btn"
			>
				x
			</button>
		</li>
	);
};
