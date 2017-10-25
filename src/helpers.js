export function sortAlphabetically(property) {
    return function(a, b) {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    };
}

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Get current day of week
export function getCurrentWeekday() {  
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  return weekdays[currentDay];
}

// Randomize list
export function randomListFromArray(array, limit) {
    // Random Item from an Array, with no repeats
    const list = [];
    let timeout = 0;
    const attemptAddRandom = function() {
      timeout++;
      let candidate = array[Math.floor(Math.random() * array.length)];
      if (list.indexOf(candidate) === -1) {
        list.push(candidate);
      }

      if (list.length < limit) {
        if (timeout < 300) {
          attemptAddRandom();
        }
      }
    };

    attemptAddRandom();
    return list;
  }