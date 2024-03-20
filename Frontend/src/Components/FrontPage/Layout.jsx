
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
        <div className="flex space-x-40 bg-black h-screen ">
            <img src={Images[0]} alt="" className='p-5'  />
            <div className='flex flex-col justify-center items-end bg-black-gradient mt-10 space-x-10 pr-10 h-[500px] rounded-xl'>
                <p className='text-white font-bold text-8xl pb-5'><span className='text-red-500 text-9xl'>Pho</span>enix <sub className='text-lg'>beta</sub></p>
                <div className='flex space-x-10'>
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
         className='bg-green-600 text-lg rounded-xl fixed bottom-5 right-5 text-white font-bold p-3'>
            {click ? <Link to='/'>Home</Link> : 'Login'}
        </Link>
        </div>

        <div className={`absolute bottom-[50px] right-[300px] bg-white p-10 rounded-xl ${!click ? 'hidden': 'block'}`}>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
