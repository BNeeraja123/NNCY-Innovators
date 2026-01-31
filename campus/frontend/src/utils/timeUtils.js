// Time conversion utilities for handling 12-hour to 24-hour format

/**
 * Convert 12-hour format (e.g., "6:00 PM") to 24-hour format (e.g., "18:00")
 */
export const convertTo24Hour = (time12) => {
  if (!time12) return '';
  
  // If already in 24-hour format, return as is
  if (/^\d{2}:\d{2}$/.test(time12)) {
    return time12;
  }
  
  try {
    const time = time12.toUpperCase().trim();
    const parts = time.split(':');
    let hours = parseInt(parts[0]);
    const minutes = parts[1].split(/\s+/)[0];
    const meridiem = time.includes('PM') ? 'PM' : 'AM';
    
    if (meridiem === 'PM' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  } catch (e) {
    console.warn(`Could not convert time: ${time12}`, e);
    return '';
  }
};

/**
 * Convert 24-hour format (e.g., "18:00") to 12-hour format (e.g., "6:00 PM")
 */
export const convertTo12Hour = (time24) => {
  if (!time24) return '';
  
  try {
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    
    return `${hour}:${minutes} ${meridiem}`;
  } catch (e) {
    console.warn(`Could not convert time: ${time24}`, e);
    return '';
  }
};

/**
 * Safely get a value, defaulting to empty string instead of null/undefined
 */
export const safeValue = (value) => {
  return value || '';
};
