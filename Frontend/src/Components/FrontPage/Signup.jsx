import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    password: '',
    password_confirm: '',

  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.password_confirm) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/createuser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert('Signup failed. Please try again. (Also check if email is already in use)');
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const result = await response.json();
      alert('Signup successful! You can now log in.');
      navigate('/login');
      // Further actions on successful signup (e.g., redirect to login)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <form className=' flex flex-col space-y-5 font-semibold text-sm' onSubmit={handleSubmit}>
      <div className='flex  space-x-3'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor="email" className='pr-5'>Email:</label>
          <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='email'
          required/>
          <label htmlFor="" className='pr-5'>Farmer&apos;s First Name:</label>
          <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='first_name'
          required/>
          <label htmlFor="" className='pr-5'>Farmer&apos;s Last Name:</label>
          <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='last_name'
          required/>

        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="" className='pr-5'>Farm Name:</label>
          <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='farmName'
          required/>
          <label htmlFor="" className='pr-5'>Farm Address:</label>
          <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='farmLocation'
          required/>
          <label htmlFor="" className='pr-5'>Farm Size: (Km2)</label>
          <input type="number" step='1' className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='farmSize'
          required/>
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor="password" className='pr-5'>Password:</label>
          <input type="password" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='password'
          required/>
          <label htmlFor="password" className='pr-5'>Confirm Password:</label>
          <input type="password" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal' onChange={handleChange}
          id='password_confirm'
          required/>
        </div>

      </div>
      <button type='submit' className='bg-green-500 text-white p-3 mx-40 rounded-xl'>Signup</button>
      <p className='flex items-center justify-center'>Exisiting User?, Login <span className='text-red-500 p-0 '> {" "}
        <Link to='/login'>
        Here
        </Link>
        </span></p>
    </form>

  )
}

export default Signup
