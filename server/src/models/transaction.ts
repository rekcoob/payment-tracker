import { ITransaction } from '../types/transaction';
import { model, Schema } from 'mongoose';

const transactionSchema: Schema = new Schema({
	text: {
		type: String,
		// trim - remove whitespace from both sides
		trim: true,
		// 2 param - Error Message
		required: [true, 'Please add some text'],
	},
	amount: {
		type: Number,
		required: [true, 'Please add a positive or negative number'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default model<ITransaction>('Transaction', transactionSchema);
