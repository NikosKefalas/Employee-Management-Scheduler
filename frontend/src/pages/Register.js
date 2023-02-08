import { useState } from "react";

const Register = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()


        const user={username,email,password}
        const res=await fetch('/api/auth/register',{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await res.json()
    }




    return (
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Login</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
            />
             <label>email:</label>
            <input
                type="text"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
            />
             <label>Password:</label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
            />

            <button>Register</button>
        </form>
     );
}
 
export default Register;