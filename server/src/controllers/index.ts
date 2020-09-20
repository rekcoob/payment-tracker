import { Request, Response } from 'express';
import { ITransaction } from '../types/transaction';
import Transaction from '../models/transaction';

// import Transaction from '../models/Transaction';
// const Transaction = require('../models/Transaction');

//@ desc Get all transactions
//@ route GET/api/transactions
//@ access Public
const getTransactions = async (
	req: Request,
	res: Response,
	next: Function
): Promise<Response<any>> => {
	try {
		const transactions: ITransaction[] = await Transaction.find();

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

//@ desc Add Transaction
//@ route POST/api/transactions
//@ access Public
const addTransaction = async (req: Request, res: Response, next: Function) => {
	try {
		const { text, amount } = req.body;
		const transaction = await Transaction.create(req.body);
		return res.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(
				(val: any) => val.message
			);

			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	}
};

//@ desc Delete Transaction
//@ route GET/api/transactions/:id
//@ access Public
const deleteTransaction = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: 'No transaction found',
			});
		}

		await transaction.remove();

		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

export { getTransactions, addTransaction, deleteTransaction };
