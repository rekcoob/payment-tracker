/**
 * Transaction Interface
 */
export interface ITransaction {
	_id: number;
	text: string;
	amount: number;
}

export type InitialStateType = {
	transactions: ITransaction[];
	error: any;
	loading: boolean;
};

export type GlobalActionType =
	| { type: 'GET_TRANSACTIONS'; payload: ITransaction[] }
	| { type: 'TRANSACTION_ERROR'; payload: any }
	| { type: 'ADD_TRANSACTION'; payload: ITransaction }
	| { type: 'DELETE_TRANSACTION'; payload: number };
