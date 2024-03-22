import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Attempt to log in using your Django backend
    try {
      const response = await fetch('http://localhost:8000/api/token/', { // Replace with your actual JWT endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {

        // If login was successful, store the JWT token in localStorage or sessionStorage
        localStorage.setItem('accessToken', data.access); // Storing the access token
        localStorage.setItem('refreshToken', data.refresh); // Storing the refresh token if you have one

        // Redirect to a protected route, like a dashboard or home page
        navigate('/dashboard'); // Change '/dashboard' to the route you want to redirect after login
      } else {
        // If there was a problem, handle it here
        alert('Login failed: ' + (data.detail || 'Please check your credentials and try again.'));
      }
    } catch (error) {
      // If there was an error with the fetch request itself, handle it here
      console.error('There was an error with the login request:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-5 font-semibold text-sm'>
      <div>
        <label htmlFor="email" className='pr-5'>Email:</label>
        <input
          type="email"
          className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className='pr-5'>Password:</label>
        <input
          type="password"
          className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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

export default Login;
