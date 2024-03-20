import  { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


   const handleSubmit = (e) => {
    e.preventDefault();
    //auth using django!

    console.log('Submitted:', { email, password });

    setEmail('');
    setPassword('');
  };


  return (
    <form onSubmit={handleSubmit}  className=' flex flex-col space-y-5 font-semibold text-sm'>
      <div>
        <label htmlFor="email" className='pr-5'>Email:</label>
        <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}  required/>
      </div>
      <div>
        <label htmlFor="password" className='pr-5'>Password:</label>
        <input type="password" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}  required/>
      </div>
      <button type='submit' className='bg-green-500 text-white p-3 rounded-xl'>Login</button>
      <p>New User?, Signup <span className='text-red-500 p-0'>
        <Link to='/signup'>
        Here
        </Link>
        </span></p>
    </form>
  )
}

export default Login
