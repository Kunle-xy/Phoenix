import axios from 'axios';
import { useQuery } from 'react-query';

export async function getRecords(plantId) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/record/${plantId}/`);
          // console.log(response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
}

// const allRecords = () => {
//     const { data, isLoading, isError, error } = useQuery('records', getRecords);
//     return { data, isLoading, isError, error };
// }

export async function getRecord(plantId, recordId) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/record/${plantId}/${recordId}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

