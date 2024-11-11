export const getDateAndTime = (data) => {
    const date = new Date(data);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();

    // Format the date
    const formattedDate = `${day}/${month}/${year}`;

    // Get the hours and convert to 12-hour format
    let hours = date.getUTCHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Format the time
    const formattedTime = `${hours} ${period}`;
    return { formattedDate, formattedTime }
}

export function getNextSevenDays() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const result = [];

    // Get today's date
    const today = new Date();

    for (let i = 0; i <= 6; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i); // Increment the day by i

        const dayName = daysOfWeek[currentDate.getDay()]; // Get day of the week
        const day = currentDate.getDate().toString().padStart(2, '0'); // Get day with leading zero
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
        const year = currentDate.getFullYear(); // Get year
        
        const formattedDate = `${day}/${month}/${year}`; // Format date as dd/m/yyyy
        
        result.push(`${dayName}, ${formattedDate}`);
    }

    return result;
}

export const  dateConvertSlashInDash = (date)=>{
const [day, month, year] = date.split('/');
const formattedDate = `${year}-${month}-${day}`;
return formattedDate
}
