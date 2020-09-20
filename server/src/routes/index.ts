import { Router } from 'express';
import {
	getTransactions,
	addTransaction,
	deleteTransaction,
} from '../controllers';

const router: Router = Router();

// router.get('/', (req, res) => res.send('Yo'));
router
	.route('/')
	.get(getTransactions)
	.post(addTransaction);

router
	.route('/:id')
	.delete(deleteTransaction);

export default router;
