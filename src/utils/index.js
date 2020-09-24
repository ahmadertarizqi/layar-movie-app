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