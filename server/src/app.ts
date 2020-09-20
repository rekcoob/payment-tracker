import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import transactionRoutes from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('dev'));
// }
app.use(morgan('dev'));
app.use(cors());
// app.use(transactionRoutes);
app.use('/api/transactions', transactionRoutes);

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@expense-tracker.mz0or.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const uri: string = `mongodb+srv://admin:admin@expense-tracker.mz0or.mongodb.net/expense-tracker?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
	.connect(uri, options)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	)
	.catch((error) => {
		throw error;
	});
