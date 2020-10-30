"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
// use only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(cors_1.default());
// app.use(transactionRoutes);
app.use('/api/transactions', routes_1.default);
// Heroku deploy
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
    app.get('*', function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, '../client/build', 'index.html'));
    });
}
var options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default
    .connect(process.env.MONGO_URI, options)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:" + PORT);
    });
})
    .catch(function (error) {
    throw error;
});
