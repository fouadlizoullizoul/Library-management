interface Error {
    message: string;
    stack?: string;
    status?:number;
    name?:string;
}
export default Error