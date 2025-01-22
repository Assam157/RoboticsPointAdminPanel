import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Importing useNavigate to redirect after login
import './LoginMayukh.css'

const LogInMayukh = () => {
  const [product,setProduct]=useState({
    name:'',
    password:'',
})
  const [success, setSucces] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const Navigate=useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };// Error state to show login errors
  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    setLoading(true);
    setError(null);
    setSucces(false);

    try{
      const response=await fetch("https://roboticspointbackend-b6b7b2e85bbf.herokuapp.com/LogInMayukh",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product)
      })
      const result=await response.json()
      if(!response.ok){
        setError("Failed To Submit")
      }else{
        localStorage.setItem('authToken', result.token); 
        Navigate("/ProductForm")
      }
 
    }catch(err)
    {
      setError("NoMessageRecievedFromServer")
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <div className="login-mayukh">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={product.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">MasterAccesForm</button>
      </form>  
    </div>
  );
};

export default LogInMayukh;
