"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
// import dotenv from 'dotenv';
//import morgan from 'morgan';
var routes_1 = __importDefault(require("./routes"));
// dotenv.config({ path: './config/config.env' });
var app = express_1.default();
var PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
// use only in development
//app.use(morgan('dev'));
app.use(cors_1.default());
// app.use(transactionRoutes);
app.use('/api/transactions', routes_1.default);
var uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@cluster0.mz0or.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
var options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(uri, options)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:" + PORT);
    });
})
    .catch(function (error) {
    throw error;
});
