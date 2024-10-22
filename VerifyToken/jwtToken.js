import { createServer } from "http";
import dotenv from "dotenv";
import jwt, {decode} from "jsonwebtoken";
dotenv.config()
const SERVER_HOST = process.env.SERVER_HOST || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 3085
const JWT_SECRET = process.env.JWT_SECRET || "112345"
const JWT_TTL= process.env.JWT_TTL || "1h"
console.log("jwt_secret = "+JWT_SECRET)
const funcVerify = (token)=>{
    try {
        {
            console.log("token = "+token)
            console.log("Верифікація майже вдала")
            const rez = jwt.verify(token,JWT_SECRET)
            console.log("rez = "+rez.name)
            return rez
        }
    }
    catch (err){
        console.log("Верифікація невдала")
        return null
    }
}
const server = createServer((req,res)=> {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end()
        return
    }
    const auth = req.headers["authorization"]
    console.log("auth = "+auth)
    try {
        const rez = funcVerify(auth.split(" ")[1])
        res.end(JSON.stringify(rez))
    }
    catch (err)
    {
        console.log("Щось з верифікацією "+err.message)
    }
})

try {

    server.listen(SERVER_PORT, () => {
        console.log("Jwt токен-сервер запустився")
    })
}
catch (err){
    console.log("Сервер не вдалося запустити по причині "+err.message)
}