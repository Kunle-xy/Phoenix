import { Link } from 'react-router-dom'

const Signup = () => {

  return (
    <form className=' flex flex-col space-y-5 font-semibold text-sm'>
      <div>
        <label htmlFor="email" className='pr-5'>Email:</label>
        <input type="text" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
        id='email'
        required/>
      </div>
      <div>
        <label htmlFor="password" className='pr-5'>Password:</label>
        <input type="password" className='h-10 w-60 rounded-xl border-2 border-gray-300 p-3 font-normal'
        id='password'
        required/>
      </div>
      <button type='submit' className='bg-green-500 text-white p-3 rounded-xl'>Signup</button>
      <p>Exisiting User?, Login <span className='text-red-500 p-0'>
        <Link to='/login'>
        Here
        </Link>
        </span></p>
    </form>

  )
}

export default Signup
