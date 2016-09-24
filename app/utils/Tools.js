function convertDate(date) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date = date.split('-');
    return new Date(parseInt(date[0]), parseInt(date[1] -1), parseInt(date[2])).toLocaleDateString('en-US', options);
}
function convertTime(time) {
  if (!time) return '';
  time = time.split(':');
  let hours = parseInt(time[0]),
      minutes = parseInt(time[1]);
  // calculate
  let timeValue = (hours > 12) ? hours - 12 : hours; // get hours
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
  return timeValue;
}

export { convertDate, convertTime };
