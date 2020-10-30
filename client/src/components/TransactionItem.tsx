import React, { useContext } from 'react';
// import { deleteTransaction } from '../context/appActions';
import axios from 'axios';
import { GlobalContext } from '../context/AppContext';
import { ITransaction } from '../types';
import { numberWithSpaces } from '../utils/format';

type Props = {
	transaction: ITransaction;
};

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
	// const { transaction } = props;
	const { _id, text, amount } = transaction;
	const { dispatch } = useContext(GlobalContext);

	async function deleteTransaction(_id: number) {
		try {
			await axios.delete(`/api/transactions/${_id}`);
			dispatch({
				type: 'DELETE_TRANSACTION',
				payload: _id,
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error,
			});
		}
	}

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
