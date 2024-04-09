import image_12_11 from '/assets/farmer/plots/12_11.png'
import image_12_12 from '/assets/farmer/plots/12_12.png'
import image_12_13 from '/assets/farmer/plots/12_13.png'
import image_12_14 from '/assets/farmer/plots/12_14.png'
import image_23_15 from '/assets/farmer/plots/23_15.png'
import image_24_16 from '/assets/farmer/plots/24_16.png'
// import image_25_17 from '/assets/farmer/plots/25_17.png'
import axios from 'axios'


export const Data = [
    {
        id: 4,
        image: image_12_11,


    },
    {
        id: 6,
        image: image_12_12,

    },
    {
        id: 10,
        image: image_12_13,

    },
    {
        id: 11,
        image: image_12_14,

    },
    {
        id: 12,
        image: image_23_15,

    },
    {
        id: 13,
        image: image_24_16,

    },
]




export const Fetch = async ({ queryKey }) => {
    const [_key, { token }] = queryKey;
    const url = 'http://localhost:8000/api/createplant/';
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  };

export const createPlant = async ({ formData, token }) => {
    const url = 'http://localhost:8000/api/createplant/';
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  };

export async function getRecords(plantId, token) { // Token is passed as an argument
      const response = await axios.get(`http://127.0.0.1:8000/api/record/${plantId}/`, {
          headers: {
              Authorization: `Bearer ${token}` // Use the token passed as an argument
          }
      });

      return response.data;
}

export async function getRecord(plantId, recordId, token) {
    const response = await axios.get(`http://127.0.0.1:8000/api/record/${plantId}/${recordId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // console.log(response.data);
    return response.data;

}





