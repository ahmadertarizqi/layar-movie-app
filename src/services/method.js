import Axios from 'axios';
import { apiKEY } from '../constants';

const options = {
   headers: { 
      'Content-Type': 'application/json' 
   },
   params: {
      api_key: apiKEY
   }
};

/**
 * @param {String} URL 
 */
export const getData = async (URL) => {
   try {
      const response = await Axios.get(URL, options);
      return response;
   } catch (error) {
      console.log(`error get all data : ${error}`);
      return error;
   }
}