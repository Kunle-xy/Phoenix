import axios from "axios";
import { useState } from "react";
import { useParams } from 'react-router-dom'



const CreateRecord = () => {
  const { plantId } = useParams();
  const [success, setSuccess] = useState(false);


  const Init = {
    plant: plantId,
    date: '',
    height: '',
    soilMoisture: '',
    temperature: '',
    image: '',
    humidity: '',
  }


  const [formData, setFormData] = useState(Init);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const Create = async (e) => {
    e.preventDefault();
    let url = `http://127.0.0.1:8000/api/record/${plantId}/`;

    // console.log(formData);

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',}
      }).then(res => {
        setSuccess(true);
        console.log(res.data);

      }).catch(err => {
        console.log(err);
      });

    setFormData(Init);

  };

  return (
    <div className="">
      <div id='create-plant-form' className='p-5 flex justify-center'>

        <form onSubmit={Create} method='POST' className='p-5 text-black rounded-xl text-lg bg-gray-200 flex flex-col justify-center items-start space-y-2 w-3full'>

          <label htmlFor="" >Plant ID:
          <input className='text-black pl-2 mx-3 bg-white' type="text" name='plant' value={plantId}
          disabled/>
          </label>

          <label htmlFor="">Date Captured:
          <input type="date" className='text-black pl-2 mx-3' name='date' value={formData.date} onChange={handleChange}
          required/>
          </label>

          <label htmlFor="">Height:
          <input type="text" className='text-black pl-2 mx-3' name='height' value={formData.height} onChange={handleChange}
          required/> inches
          </label>

          <label htmlFor="">Temperature:
          <input type="text" className='text-black pl-2 mx-3' name='temperature' value={formData.temperature} onChange={handleChange}
          required/> &deg;F
          </label>

          <label htmlFor="">Humidity:
          <input type="text" className='text-black pl-2 mx-3' name='humidity' value={formData.humidity} onChange={handleChange}
          required/> %
          </label>


          <label htmlFor="">Soil Moisture:
          <input type="text" className='text-black pl-2 mx-3' name='soilMoisture' value={formData.soilMoisture} onChange={handleChange}
          required/> %
          </label>

          <label htmlFor="">Image:
          <input type="file" accept="image/png, image/jpeg, image/jpg" className='text-black pl-2 mx-3' name='image' onChange={handleChange}
          required/>
          </label>

          <div className='flex space-x-5'>
            <button type='submit' className='bg-green-500 text-sm p-2 rounded-xl'>Create Record</button>
          </div>
          {success && <p className='text-black bg-green-100 p-1 mt-5 px-5 self-center items-center font-semibold rounded-full '>Record Created Successfully!</p>}

          </form>
      </div>
    </div>
  )
}
export default CreateRecord
