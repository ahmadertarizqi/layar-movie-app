import Axios from 'axios';

/**
 * @param {String} URL 
 * @param {Object} objProperties
 */
export async function getData(URL, objProperties) {
   const options = {
      headers: { 
         'Content-Type': 'application/json' 
      },
      ...objProperties
   };

   try {
      const response = await Axios.get(URL, options);
      return response;
   } catch (error) {
      console.log(`Error method get data: ${error}`);
      return error;
   }
}