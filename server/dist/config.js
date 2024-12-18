"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, BCRYPT_PASSWORD, SLART_ROUNDS, TOKEN_SECRET } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SLART_ROUNDS,
    tokenSecret: TOKEN_SECRET
};
