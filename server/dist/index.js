"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 5000;
//add routing for / path
app.get('/', (req, res) => {
    res.json({ message: "Hi Res" });
});
app.listen(PORT, () => {
    console.log("HI");
});
exports.default = app;
