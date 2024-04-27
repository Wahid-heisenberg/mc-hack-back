exports.giveDateFormat = (date) => {
    // Check if the input is a Date object
    if (!(date instanceof Date)) {
        throw new TypeError('Input is not a valid Date object');
    }
  
    // Get the components of the date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    // Concatenate the components with hyphens
    return `${day}-${month}-${year}-${hours}:${minutes}`;
  };
  