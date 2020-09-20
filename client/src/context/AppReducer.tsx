import { ITransaction, InitialStateType } from '../types';

/**
 * Reducer: specify app state changes
 * in respond to actions to our store /context
 */

type ACTIONTYPE =
	| { type: 'GET_TRANSACTIONS'; payload: ITransaction[] }
	| { type: 'TRANSACTION_ERROR'; payload: any }
	| { type: 'ADD_TRANSACTION'; payload: ITransaction }
	| { type: 'DELETE_TRANSACTION'; payload: number };

export const AppReducer = (state: InitialStateType, action: ACTIONTYPE) => {
	switch (action.type) {
		case 'GET_TRANSACTIONS':
			return {
				...state,
				loading: false,
				transactions: action.payload,
			};
		case 'DELETE_TRANSACTION':
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction: ITransaction) => transaction._id !== action.payload
				),
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			};
		case 'TRANSACTION_ERROR':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
