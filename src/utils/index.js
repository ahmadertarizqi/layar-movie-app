export const timeConvert = (time) => {
   const hours = Math.floor(time / 60);
   const minutes = time % 60;
   return `${hours} hr ${minutes} mins`;
};

export const findValueByJob = (nameValue, dataArray) => {
   for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i].job === nameValue) {
         return dataArray[i];
      }
   }
};

export const chunkArray = (array, size) => {
   let result = [];
   for(const value of array) {
      let lastArray = result[result.length - 1];
      if(!lastArray || lastArray.length === size) {
         result.push([value]);
      } else {
         lastArray.push(value);
      }
   }

   return result;
};