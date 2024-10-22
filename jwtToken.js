import {createServer} from "http"
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
dotenv.config()
const SERVER_HOST = process.env.SERVER_HOST || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 3080
const JWT_SECRET = process.env.JVT_SECRET || 12345
const JVT_TTL= process.env.JVT_TTL || "1h"
const generateToken = (payload)=>{
    return  jwt.sign(payload,JWT_SECRET,{expiresIn: JVT_TTL})
}
const payload = {
    name: "Vasyl",
    surname: "Chepil",
    yearOfBird:1995,
    city: "Lutsk"
}
const token = generateToken(payload)
console.log(token)
const server = createServer((req,res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end()
        return
    }
    res.end(token)
})

server.listen(SERVER_PORT,()=> {
    console.log("Jwt токен-сервер запустився")
})