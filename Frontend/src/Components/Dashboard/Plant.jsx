import {  useParams } from 'react-router-dom'
import { Outlet, NavLink } from 'react-router-dom'
// import { getRecords } from './Loader';
import { useAuth } from './AuthContext';
import { useQuery } from 'react-query';
import { getRecords } from '.';



const Plant = () => {
    // const { records } = useLoaderData();
    const { authStatus } = useAuth();
    let plantId = useParams().plantId;

    const { data:records, isLoading } = useQuery(['records', plantId], () => getRecords(plantId, authStatus.token), {
        // Optional: React Query settings such as refetch intervals, stale time, etc.
        enabled: !!authStatus.token // Only run query if token exists
    });

    // Loading indicator
    if (isLoading) {
        return <div className="flex justify-center items-center">
            Loading... {/* Update the src attribute to the path of your loading GIF */}
        </div>;
    }

    // Display when there are no records
    if (!records || records.length === 0) {
        return <div className="text-center font-semibold">No record for selected plant</div>;
    }

  return (

    <div className='flex '>
        <div className='h-[900px] m-1 overflow-y-auto p-5'>
        {records && records.map((record) => (
            <div key={record.id} className='flex flex-col'>
                <div className='flex bg-gray-200 p-5 m-5 rounded-xl space-x-5'>
                    <img src={record.image} alt="" className='h-[200px] w-[250px] object-fill rounded-xl' />
                    <div className='flex flex-col justify-between'>
                        <div className='font-semibold'>
                            <p>Date: {record.date}</p>
                            <p>Plant: {record.plantName}</p>
                            <p>soilMoisture: {record.soilMoisture}%</p>
                            <p>Temperature: {record.temperature}°C</p>
                            <p>Humidity: {record.humidity}%</p>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <button className='bg-green-200 p-2 rounded-lg px-5 font-semibold'>Edit</button>
                            <button  className='bg-red-400 p-2 rounded-lg px-5 font-semibold'>Delete</button>
                            <NavLink to={`ai/${record.id}`}

                            className={({isActive}) =>
                            isActive ? 'bg-white p-2 text-black rounded-lg px-5 font-semibold': 'bg-green-900 p-2 text-white rounded-lg px-5 font-semibold'}
                            >AI</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        ))}

        </div>
            <Outlet />
        </div>

  )
}

export default Plant
