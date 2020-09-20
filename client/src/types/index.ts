/**
 * Transaction Interface
 */
export interface ITransaction {
	_id?: number;
	text: string;
	amount: number;
}

export type InitialStateType = {
	transactions: ITransaction[];
	error: any;
	loading: boolean;
	// fn?: (bob: string) => void;
	// getTransactions(): Promise<void>;
	getTransactions(): any;
	deleteTransaction: (id: number) => void;
	addTransaction(transaction: ITransaction): void;
};
