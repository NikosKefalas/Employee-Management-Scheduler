import { useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from "@mui/material/TextField";
import { useNavigate,useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const UpdateEmployee = () => {

    const location = useLocation();
    const name=location.state.name
    const surname=location.state.surname
    const params=useParams()
    const navigate=useNavigate()
    const [bio,setBio]=useState("")
    const [age,setAge]=useState("")
    const [error,setError]=useState(null)

    const handleSubmit=async(e)=>{
        e.preventDefault()

        
        const employee={bio,age}
        const res=await fetch('/api/employees/'+params.id,{
            method:'PATCH',
            body:JSON.stringify(employee),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await res.json()

        if (!res.ok) {
            setError(json.error)
        }
        if (res.ok){
            setAge("")
            setBio("")
            setError(null)
            navigate("/api/employees/"+params.id)
        }
    }




    return (
        <Container sx={{marginTop:3}}>
            <Typography
                    variant='h5'
                    color='primary'
                    gutterBottom
            >
                {name} {surname}
            </Typography>
            <form autoComplete="off"  onSubmit={handleSubmit}> 
                <TextField
                    sx={{marginTop:2,
                        marginBottom:2,
                        color:"primary",
                        display:'block'}}
                    onChange={(e)=>setBio(e.target.value)}
                    label="Bio"
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    sx={{marginTop:2,
                        marginBottom:2,
                        color:"primary",
                        display:'block'}}
                    onChange={(e)=>setAge(e.target.value)}
                    label="Age"
                    variant="outlined"
                    required
                    fullWidth
                />
                <Button type="submit"
                color="success"
                variant="contained"
                disableElevation
                endIcon={<KeyboardArrowRightIcon/>}
                
                >
                    Update {name}
                </Button>
               
           
            </form>

             
           
        </Container>
     );
}

 
export default UpdateEmployee;