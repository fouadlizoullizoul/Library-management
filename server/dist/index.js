"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default); // add routes to /api path
const PORT = config_1.default.port || 5000;
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    legacyHeaders: false,
    standardHeaders: true,
    message: 'Too many requests, please try again after an hour.' // default message
}));
//add routing for / path
app.get('/', (req, res) => {
    res.json({ message: "Hi Res" });
});
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({ message: "Page Not Found" });
});
app.listen(PORT, () => {
    console.log("HI");
});
exports.default = app;
