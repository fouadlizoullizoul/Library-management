import dotenv from 'dotenv'
dotenv.config()
const { PORT, NODE_ENV, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, BCRYPT_PASSWORD, SLART_ROUNDS} = process.env
export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper:BCRYPT_PASSWORD,
    salt:SLART_ROUNDS
}