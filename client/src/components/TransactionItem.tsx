import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ITransaction } from '../types';
import { numberWithSpaces } from '../utils/format';

type Props = {
	transaction: ITransaction;
};

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
	// const { transaction } = props;
	const { _id, text, amount } = transaction;

	const { deleteTransaction } = useContext(GlobalContext);

	const sign = amount < 0 ? '-' : '+';

	return (
		<li className={amount < 0 ? 'minus' : 'plus'}>
			{text}{' '}
			<span>
				{sign}€{numberWithSpaces(Math.abs(amount))}
			</span>
			<button onClick={() => deleteTransaction(_id)} className="delete-btn">
				x
			</button>
		</li>
	);
};
