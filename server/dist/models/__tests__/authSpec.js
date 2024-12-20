"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user.model"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_model_1.default();
describe('Authentication Module', () => {
    describe('Test methods exists', () => {
        it('should have an Authenticate User method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    describe('Test Authentication Logic', () => {
        const user = {
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield userModel.create(user);
            user.id = createUser.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM users';
            yield connection.query(sql);
            connection.release();
        }));
        it('Authenticate method should return the authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield userModel.authenticate(user.email, user.password);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.email).toBe(user.email);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.user_name).toBe(user.user_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.first_name).toBe(user.first_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.last_name).toBe(user.last_name);
        }));
        it('Authenticate methode should return null for wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticateUser = yield userModel.authenticate('fouadli@gmail.com', 'fake-password');
            expect(authenticateUser).toBe(null);
        }));
    });
});
