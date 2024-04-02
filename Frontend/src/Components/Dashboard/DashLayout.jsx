import axios from 'axios';
import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IoLogOutSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Fetch, createPlant } from '.';
import { AiFillWechat } from "react-icons/ai";
import { useAuth } from './AuthContext';


const DashLayout = () => {

  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      if (response.data && response.data.length > 0) {
        console.log(response.data);
        const { lat, lon } = response.data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const [profileClick, setProfileClick] = useState(false);
  const { authStatus } = useAuth();

  const token = authStatus.token;

  let initial = '';
  let name = '';
  let email = '';
  let farmName = '';
  let farmLocation = '';
  let farmSize = '';
  let farmerID = '';
  // let picture = '';
  // let farmCoords = [];

  if (token) {
    const payload = jwtDecode(token);
    // console.log(payload);
    try {

      initial = payload?.first_name[0] + payload?.last_name[0];
      name = payload?.first_name + ' ' + payload?.last_name;
      email = payload?.email;
      farmName = payload?.farmName;
      farmLocation = payload?.farmLocation;
      farmerID = payload?.user_id;
      // picture = payload?.profileImg;


      //  getCoordinates(farmLocation);

      farmSize = payload?.farmSize;
    }
    catch (error) {
      initial = '?';
    }

  }
  else {
    console.log('no token');
  }


  const Init = {
    plantName: '',
    datePlanted: '',
    farmer: farmerID,
  }

  const [formData, setFormData] = useState(Init);
  // const [plants, setPlants] = useState([]);
  const [fetchClick, setFetchClick] = useState(false);

  // const [shouldFetch, setShouldFetch] = useState(false);
  const { data:plants,  isLoading, isError } = useQuery(
    ['plants', { token }],
    Fetch,
    {
      enabled: fetchClick // The query will run when this value is true
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  // CREATES A NEW PLANT RECORD
  const queryClient = useQueryClient(); // Used for updating the cache
  const { mutate } = useMutation(createPlant, {
    onSuccess: (data) => {
      // Update your local state or query cache as needed
      queryClient.setQueryData('plants', (oldQueryData) => {
        return  [...(oldQueryData || []), data];
      });
      alert('Plant created successfully');
      // Reset form state or perform additional actions on success
      setFormData(Init);
    },
    onError: (error) => {
      // Handle errors
      alert('Plant creation failed. Please try again.');
      console.error(error);
      // setFormData(Init);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ formData, token });
  };


  return (
    <div className='flex h-screen'>
      <div className='w-1/4  flex flex-col' >
        <div id='create-plant-form' className='p-5 flex justify-center'>

          <form onSubmit={handleSubmit} method='POST' className='p-5 font-semibold text-black rounded-xl text-lg bg-gray-300 flex flex-col justify-center items-start space-y-2 w-3full'>
            <label htmlFor="" >Plant Name:
            <input className='text-black pl-2 mx-3 font-normal' type="text" name='plantName' value={formData.plantName} onChange={handleChange}
             placeholder='maize'required/>
            </label>

            <label htmlFor="">Date Planted:
            <input type="date" className='text-black pl-2 mx-3 font-normal' name='datePlanted' value={formData.datePlanted} onChange={handleChange}
            required/>
            </label>
            <div className='flex gap-10 pt-5 text-white justify-between items-center'>
              <button type='submit' className='bg-green-500 text-sm p-2 rounded-xl'>add new plant</button>
              <button type='button' onClick={() => setFetchClick(prev => !prev)}
                 className='bg-green-500 text-sm p-2 rounded-xl'> database</button>
            </div>
          </form>
        </div>

        <p className="shadow-xl p-2"></p>


       {isLoading ? (
          <div className='p-5 bg-white m-4 my-1 rounded-xl h-[800px]'>
            <p className='text-center text-xl font-bold'>Fetching plants...</p>
          </div>):
         (plants &&
         <div className='p-5 space-y-5 bg-white m-4 my-1 rounded-xl h-[800px] overflow-y-auto'>
          {plants.map((plant, index) => (
            <div key={index} className='p-4 text-white rounded-xl text-sm bg-green-700 flex justify-between shadow-xl '>
              <div className='text-yellow-300 flex flex-col justify-between items-start gap-2'>
                <p className=''>Plant Name: <span className='text-xl'>{plant.plantName}</span></p>
                <p>Date Planted: {plant.datePlanted}</p>
              </div>
              <div className='flex flex-col justify-center items-start gap-2'>
                <NavLink to={`recordform/${plant.id}`}
                className={({isActive}) =>
                isActive ? 'p-1 px-3 bg-green-500 text-white font-bold rounded-full' : 'p-1 px-3 bg-white text-purple-900 font-bold rounded-full'}
                >add record</NavLink>
                <NavLink to={`plants/${plant.id}`}
                className={({isActive}) =>
                isActive ? 'p-1 px-3 bg-green-500 text-white font-bold rounded-full' : 'p-1 px-3 bg-white text-purple-900 font-bold rounded-full'}
                >list record</NavLink>
              </div>
            </div>
          ))}
        </div>)}

        {
          isError && <div className='p-5 bg-white m-4 my-1 rounded-xl h-[800px]'>
            <p className='text-center text-xl font-bold'>Error fetching plants. Please try again.</p>
          </div>
        }
        {
          plants && plants.length===0 && <div className='p-5 bg-white m-4 my-1 rounded-xl h-[800px]'>
            <p className='text-center text-xl font-bold'>No plants found. Create a new plant record.</p>
          </div>
        }

      </div>


      <p className="shadow-xl p-2"></p>

      <div className='flex absolute right-10 justify-center items-center '>
        <button onClick={() => setProfileClick(prev => !prev)} className='flex items-center justify-center hover:bg-white hover:text-black
        hover:shadow-myShadow h-10 m-5 w-10 rounded-full bg-black text-white'>
              {initial.length > 0 && initial}
        </button>
        {/* <IoLogOutSharp color='black' size={35}/> */}
        <Link to="/" className="flex items-center gap-2 group text-red-900">
          <IoLogOutSharp color='red' size={35} className="transition-all duration-300 ease-in-out" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out absolute -mt-10 ">
            Logout
          </span>
        </Link>

      </div>

      <section id='profile' className={`${profileClick ? 'flex flex-col' : 'hidden'} absolute top-20 right-0 bg-black p-5
      m-5 rounded-xl w-[500px] text-white shadow-myShadow2`}>
        <div className='flex flex-row justify-center items-center gap-5'>
          <img src='https://via.placeholder.com/150'
          alt="profile" className='rounded-full h-32 w-32 self-start' />
          <div className='flex flex-col'>
            <p className='text-xl '>Name</p>
            <p className='font-bold'>{name}</p>
            <p className='text-lg '>Email</p>
            <p className='font-bold'>{email}</p>
            <p className='text-lg '>Farm Name</p>
            <p className='font-bold'>{farmName}</p>
            <p className='text-lg '>Farm Location</p>
            <p className='font-bold'>{farmLocation}</p>
            <p className='text-lg '>Farm Size</p>
            <p className='font-bold'>{farmSize} km2</p>
            {/* <p>{farmerID}</p> */}
          </div>
        </div>
        {/* <MapContainer center={farmCoords} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={farmCoords}>
            <Popup>
              {farmName} is located here.
            </Popup>
          </Marker>
        </MapContainer> */}

      </section>

      <Link className='absolute right-10 bottom-10 shadow-myShadow2 rounded-full'>
        <AiFillWechat  size={70} color='green'/>
      </Link>


      <div>
        <Outlet />
      </div>
    </div>


  )
}

export default DashLayout

