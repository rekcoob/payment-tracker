import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import transactionRoutes from './routes';
import path from 'path';

const app: Express = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());

// use only in development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
// app.use(transactionRoutes);
app.use('/api/transactions', transactionRoutes);

// Heroku deploy
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
	);
}

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
	.connect(process.env.MONGO_URI!, options)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	)
	.catch((error) => {
		throw error;
	});
