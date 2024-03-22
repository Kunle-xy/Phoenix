
import { Outlet } from 'react-router-dom'
import Images from './index';
import ai from '/assets/farmer/AI.jpg';
import reco from '/assets/farmer/reco.jpg';
import { Link } from "react-router-dom";
import { useState } from 'react';
// import { IoMdHome } from "react-icons/io"



const Layout = () => {
    const [click, setClick] = useState(false);



  return (
    <div className='relative font-poppins'>
        <div className="flex flex-row-reverse justify-between bg-black h-screen ">
            <img src={Images[0]} alt="" className='p-0 w-1/2 object-cover hidden sm:block'  />
            <div className='flex flex-col justify-center bg-black-gradient p-5 m-2  h-[500px] rounded-xl'>
                <p className='text-white font-bold text-8xl pb-5'><span className='text-red-500 text-9xl'>Pho</span>enix <sub className='text-lg'>beta</sub></p>
                <div className='flex flex-row space-x-5'>
                <div className='flex flex-col justify-start items-center bg-gray-100 p-5 h-[300px] min-w-[250px] rounded-3xl'>
                    <img src={Images[6]} alt="" className='object-cover h-48 w-48 rounded-full'/>
                    <p className='font-bold pt-5 text-2xl text-red-600'>Data Collection</p>
                </div>
                <div className='flex flex-col justify-start items-center bg-gray-100 p-5 h-[300px] min-w-[250px] rounded-3xl'>
                    <img src={ai} alt="" className='object-cover h-48 w-48 rounded-full'/>
                    <p className='font-bold pt-5 text-2xl text-wrap px-0 text-red-600'>Computer Vision</p>
                </div>
                <div className='flex flex-col justify-start items-center bg-gray-100 p-5 h-[300px] min-w-[250px] rounded-3xl'>
                    <img src={reco} alt="" className='object-cover h-48 w-48 rounded-full'/>
                    <p className='font-bold pt-1 text-2xl text-wrap text-red-600'>Intelligent </p>
                    <p className='font-bold  text-2xl text-wrap text-red-600'>Recommendations </p>
                </div>
                </div>
            </div>


        <Link to='/login' onClick={() => setClick(!click)}
         className='bg-green-600 text-lg rounded-xl fixed bottom-5 left-5 text-white font-bold p-3'>
            {click ? <Link to='/'>Home</Link> : 'Login'}
        </Link>
        </div>

        <div className={`absolute bottom-[100px] left-[100px] bg-purple-100 p-10 rounded-xl ${!click ? 'hidden': 'block'}`}>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
