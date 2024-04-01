import image_12_11 from '/assets/farmer/plots/12_11.png'
import image_12_12 from '/assets/farmer/plots/12_12.png'
import image_12_13 from '/assets/farmer/plots/12_13.png'
import image_12_14 from '/assets/farmer/plots/12_14.png'
import image_23_15 from '/assets/farmer/plots/23_15.png'
import image_24_16 from '/assets/farmer/plots/24_16.png'
import axios from 'axios'


export const Data = [
    {
        id: 1,
        image: image_12_11,


    },
    {
        id: 2,
        image: image_12_12,

    },
    {
        id: 3,
        image: image_12_13,

    },
    {
        id: 4,
        image: image_12_14,

    },
    {
        id: 5,
        image: image_23_15,

    },
    {
        id: 6,
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




