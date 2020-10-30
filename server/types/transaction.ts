import { Document } from 'mongoose';

export interface ITransaction extends Document {
	text: string;
	amount: number;
	createdAt: Date;
}
