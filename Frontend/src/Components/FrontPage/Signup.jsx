import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {

  const navigate = useNavigate();

  const Init = {
    email: '',
    first_name: '',
    last_name: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    password: '',
    password_confirm: '',
    profileImg: '',

  }

  const [formData, setFormData] = useState(Init);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.password_confirm) {
      alert("Passwords don't match.");
      return;
    }
    console.log(formData);

    axios.post('http://127.0.0.1:8000/api/createuser/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',}
      }).then(res => {
        alert('Signup successful! You can now log in.');
        navigate('/login');
        console.log(res.data);

      }).catch(err => {
        console.error('There was a problem with the fetch operation:', err);
        console.log(err);
      });

    setFormData(Init);
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
          <label htmlFor="profileImg" className='pr-5'>Profile Image:</label>
         <input type="file" accept="image/png, image/jpeg, image/jpg"
         className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
          onChange={handleChange}
          id='profileImg'
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
