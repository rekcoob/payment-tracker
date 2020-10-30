import { InitialStateType, GlobalActionType } from '../types';

/**
 * Reducer: specify app state changes
 * in respond to actions to our store /context
 */

export const appReducer = (
	state: InitialStateType,
	action: GlobalActionType
) => {
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
					(transaction) => transaction._id !== action.payload
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
