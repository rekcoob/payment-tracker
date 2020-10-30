"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var transactionSchema = new mongoose_1.Schema({
    text: {
        type: String,
        // trim - remove whitespace from both sides
        trim: true,
        // 2nd param - Error Message
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
exports.default = mongoose_1.model('Transaction', transactionSchema);
