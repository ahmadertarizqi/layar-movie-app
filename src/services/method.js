import Axios from 'axios';
import DeepMerge from 'deepmerge';
import { apiKEY } from '../contants';

let options = {
   headers: { 
      'Content-Type': 'application/json' 
   },
   params: {
      api_key: apiKEY
   }
};

/**
 * @param {String} URL 
 * @param {Object} optionsUpdate
 */
export const getData = async (URL, optionsUpdate) => {
   if(optionsUpdate) {
      options = DeepMerge(options, optionsUpdate);
   }

   try {
      const response = await Axios.get(URL, options);
      return response;
   } catch (error) {
      console.log(`error get all data : ${error}`);
      return error;
   }
}