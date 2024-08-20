export function formatString(text)
{
    // Replace underscores with spaces
    formattedText = text.replace("_", " ");

    // Capitalize the first letter, then any letters after spaces
    return formattedText.replace(/\b\w/g, char => char.toUpperCase());
}
export var formattedText

export function fullDate(date) {
    // Remove any potential quotes surrounding the date
    // const stringWithoutQuotes = date.replace(/['"]/g, "");
    const stringWithoutQuotes = date;
  
    // Replace the "T" separator with a space
    const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
  
    // Extract the date and time portion up to the milliseconds
    const stringWithoutDecimal = stringWithSpace.substring(0, 19);
  
    // Reverse the date component's format (YYYY-MM-DD to DD-MM-YYYY)
    return stringWithoutDecimal.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1")
  }
// function to convert sec to hrs
 export function secondsToHms(seconds) {
    // Ensure non-negative input
    if (seconds < 0) {
      throw new Error('Input seconds must be non-negative.');
    }
  
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    // Format the output with two digits for each unit (hours, minutes, seconds)
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`;
  }
  
