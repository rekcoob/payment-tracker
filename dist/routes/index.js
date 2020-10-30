"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = express_1.Router();
// router.get('/', (req, res) => res.send('Yo'));
router
    .route('/')
    .get(controllers_1.getTransactions)
    .post(controllers_1.addTransaction);
router
    .route('/:id')
    .delete(controllers_1.deleteTransaction);
exports.default = router;
