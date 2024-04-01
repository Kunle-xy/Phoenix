import {jwtDecode} from 'jwt-decode';
import axios from 'axios';


const requestNewAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      return true; // New access token was successfully obtained
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return false; // Failed to get a new access token
    }
  };



  // ADD TOKEN TOI THE RETURN
const isAuthenticated = async () => {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    // console.log(accessToken);

    // Attempt to get a new access token with the refresh token if the access token is missing
    if (!accessToken && refreshToken) {
      const success = await requestNewAccessToken(refreshToken);
      if (!success) {
        return false; // Couldn't get a new access token; user is not authenticated
      }
      // Update accessToken with the new value from localStorage
      accessToken = localStorage.getItem('accessToken');
    }

    if (!accessToken) {
      return false; // No access token and refresh token flow failed or was not needed
    }

    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Access token has expired, attempt to refresh it
        const success = await requestNewAccessToken(refreshToken);
        return success; // The result of attempting to refresh the token
      }
      return true; // Access token is valid and not expired
    } catch (error) {
      console.error("Couldn't decode the access token:", error);
      return false; // Token decoding failed, treat the user as not authenticated
    }
  };

export default isAuthenticated;
