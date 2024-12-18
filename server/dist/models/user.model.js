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
const index_1 = __importDefault(require("../database/index"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const salt = parseInt(config_1.default.salt);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class UserModel {
    //create 
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open connection with db 
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO users (email,user_name,first_name,last_name,password) 
                        VALUES ($1, $2, $3, $4, $5) returning id, email, user_name,first_name,last_name`;
                //run query
                const result = yield connection.query(sql, [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hashPassword(u.password)
                ]);
                //release connection
                connection.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create (${u.first_name}):${error.message}`);
            }
        });
    }
    //get all users 
    getMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT id, email, user_name, first_name, last_name  FROM users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error at retrieving users ${error.message}`);
            }
        });
    }
    //get user by id
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT id, email, user_name, first_name, last_name  FROM users WHERE id=$1';
                const result = yield connection.query(sql, [id]);
                connection.release();
                if (result.rows.length === 0) {
                    throw new Error(`User not found with id ${id}`);
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at retrieving user ${id} ${error.message}`);
            }
        });
    }
    //update user by id
    updateOne(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 returning id, email, user_name, first_name, last_name';
                const result = yield connection.query(sql, [
                    u.email,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hashPassword(u.password),
                    u.id
                ]);
                connection.release();
                if (result.rows.length === 0) {
                    throw new Error(`User not found with id ${u.id}`);
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at updating user ${u.user_name} ${error.message}`);
            }
        });
    }
    //delete user by id
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=$1 returning id, email, user_name, first_name, last_name';
                const result = yield connection.query(sql, [id]);
                connection.release();
                if (result.rows.length === 0) {
                    throw new Error(`User not found with id ${id}`);
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error at deleting user ${id} ${error.message}`);
            }
        });
    }
    //authentication method
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=$1';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const isPasswordsValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                    if (isPasswordsValid) {
                        const userInfo = yield connection.query('SELECT id, email, user_name, first_name, last_name FROM users WHERE email=$1', [email]);
                        return userInfo.rows[0];
                    }
                }
                ;
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error(`Error at authenticating user ${email} ${error.message}`);
            }
        });
    }
}
exports.default = UserModel;
