
export const getDateString = (date: number | Date, format: string = 'dd MM yyyy') => {
    const dateObj = new Date(date) // Multiply by 1000 to convert to milliseconds
    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = dateObj.toLocaleString('default', {month: 'short'}).padStart(2, '0') // Add 1 to month since it's zero-based
    const year = dateObj.getFullYear().toString()
    return `${day} ${month} ${year}`
}

export const getTimestamp = (date: string | Date, inMilliSecond: boolean = true) => {
    if (typeof date === 'string') {
        const dateParts = date.split('-')
        const timestamp = Date.parse(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`)
        return inMilliSecond ? timestamp : Math.floor(timestamp / 1000)
    } else {
        return inMilliSecond ? date.getTime() : Math.floor(date.getTime() / 1000)
    }
}

export const getDateObject = (date: string | number, inMilliSecond: boolean = true) => {
    if (typeof date === 'string') {
        const dateParts = date.split('-')
        return new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`)
    } else if (typeof date === 'number') {
        return new Date(inMilliSecond ? date : date * 1000)
    }
}


export const formatDateToHumanReadable = (dateString:string): string => {
    // Create a Date object from the provided date string
    const date = new Date(dateString);
    
    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions  = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZoneName: 'short'
    };
  
    // Convert the date to a localized string
    const formattedDate = date.toLocaleString(undefined, options);
    
    return formattedDate;
  }


  export const convertToDateYYMMDD = (dateString:any) => {
    const date = new Date(dateString);
  
    const year = date.getFullYear().toString(); // Get last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  export const convertToDateObject = (dateString:any) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }