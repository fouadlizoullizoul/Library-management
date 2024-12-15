import User from "../types/user.type";
import db from '../database/index'
import config from "../config";
import bcrypt from 'bcrypt'


const hashPassword = (password:string)=>{
    const salt = parseInt(config.salt as string)
    return bcrypt.hashSync(`${password}${config.pepper}`,salt)
}

class UserModel{
    //create 
    async create(u:User):Promise<User>{
        try{
            //open connection with db 
            const connection =await db.connect();
            const sql =`INSERT INTO users (email,user_name,first_name,last_name,password) 
                        VALUES ($1, $2, $3, $4, $5) returning id, email, user_name,first_name,last_name`
            //run query
            const result = await connection.query(sql,[
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password)
            ])
            //release connection
            connection.release();
            //return created user
            return result.rows[0]
        }catch(error){
            throw new Error(`unable to create (${u.first_name}):${(error as Error).message}`)
        }
        
    }
    //get all users 
    async getMany():Promise<User[]>{
        try{
            const connection=await db.connect();
            const sql = 'SELECT id, email, user_name, first_name, last_name  FROM users'
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(error){
            throw new Error(`Error at retrieving users ${(error as Error).message}`)
        }
    }
    //get user by id
    async getOne(id:string):Promise<User>{
        try{
            const connection=await db.connect();
            const sql = 'SELECT id, email, user_name, first_name, last_name  FROM users WHERE id=$1'
            const result = await connection.query(sql,[id]);
            connection.release();
            if(result.rows.length===0){
                throw new Error(`User not found with id ${id}`)
            }
            return result.rows[0];
        }catch(error){
            throw new Error(`Error at retrieving user ${id} ${(error as Error).message}`)
        }
    }
    //update user by id
    async updateOne(u:User):Promise<User>{
        try{
            const connection=await db.connect();
            const sql = 'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 returning id, email, user_name, first_name, last_name'
            const result = await connection.query(sql,[
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
                u.id
            ]);
            connection.release();
            if(result.rows.length===0){
                throw new Error(`User not found with id ${u.id}`)
            }
            return result.rows[0];
        }catch(error){
            throw new Error(`Error at updating user ${u.user_name} ${(error as Error).message}`)
        }
    }
    //delete user by id
    async deleteOne(id:string):Promise<User>{
        try{
            const connection=await db.connect();
            const sql = 'DELETE FROM users WHERE id=$1 returning id, email, user_name, first_name, last_name'
            const result = await connection.query(sql,[id]);
            connection.release();
            if(result.rows.length===0){
                throw new Error(`User not found with id ${id}`)
            }
            return result.rows[0];
        }catch(error){
            throw new Error(`Error at deleting user ${id} ${(error as Error).message}`)
        }
    }
}
export default UserModel