export class book {
   

    
    getTimeCheck = (start: Date, end: Date) => {
    const s_time = new Date(start);
    const e_time = new Date(end);

    // Calculate time difference in milliseconds
    const delta = e_time.getTime() - s_time.getTime();

    // Convert milliseconds to minutes and round to 4 decimal places
    const result = Math.round((delta / 60000) * 10000) / 10000;

    return result;
  };

  //* calc prise of parking based on user selecting time
  calculatePrice = (cost: number, m: number) => {
    // 5 dollar$
    const hour_rate = m / 60;
    return cost * hour_rate; // price
  };


  
      
    
  

  


}


