import {useState} from "react";

export default () =>{
    const [valueToken,setValueToken]=useState(null)
    const[valid,setValid] = useState("")
    const getToken = () =>{
        fetch("http://localhost:3080")
            .then(rez=>rez.text())
            .then(data=>{
                setValueToken(data)
            })
            .catch(err=>{
                console.log(err.message)
            })
    }
    const verifyToken = () =>{
        fetch("http://localhost:3085",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${valueToken}`
            }
        })
            .then(rez=> rez.json())
            .then(data =>{
                console.log(data)
                if (data) {
                    console.log(data)
                    setValid("Валідний")
                }
                else 
                    setValid("Не валідний")
            })
            .catch(err =>{
                console.log(err.message)
            })
    }
    return(
        <>
            <h1>Головний компонент</h1>
            <h2>{valueToken || "Пусто"}</h2>
            <button onClick={getToken}>Згенерувати токен</button><br/>
            <h2>Валідність токену: {valid || "Пусто"}</h2>
            <button onClick={verifyToken}>Перевірити токен</button>
        </>
    )
}