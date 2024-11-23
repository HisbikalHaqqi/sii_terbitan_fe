const ConvertDate = (isoString) => {
    const date = new Date(isoString); 
    
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0'); 
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

const  ConvertDateSql = (currentDate) => {

  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate
}

export default {ConvertDate,ConvertDateSql}