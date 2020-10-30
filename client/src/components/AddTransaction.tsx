import React, { useState, useContext } from 'react';
import axios from 'axios';
// import { addTransaction } from '../context/appActions';
import { GlobalContext } from '../context/AppContext';
import { ITransaction } from '../types';

export const AddTransaction: React.FC = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const { dispatch } = useContext(GlobalContext);

	type OmitIdTransaction = Omit<ITransaction, '_id'>;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTransaction = {
			text,
			// parse into number
			amount: +amount,
		};
		addTransaction(newTransaction);
	};

	async function addTransaction(transaction: OmitIdTransaction) {
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

	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className="form-control">
					<label htmlFor="text">Text</label>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
						placeholder="Enter amount..."
					/>
				</div>
				<button className="btn">Add transaction</button>
			</form>
		</>
	);
};
