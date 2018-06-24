export function sortAlphabetically(data, attr) {
  var arr = [];
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      let obj = {};
      obj[prop] = data[prop];
      obj.tempSortName = data[prop][attr].toLowerCase();
      arr.push(obj);
    }
  }

  arr.sort(function(a, b) {
    var at = a.tempSortName,
      bt = b.tempSortName;
    return at > bt ? 1 : at < bt ? -1 : 0;
  });

  var result = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    let obj = arr[i];
    delete obj.tempSortName;
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var id = prop;
      }
    }
    var item = obj[id];
    result.push(item);
  }
  var resultObj = result.reduce(function(acc, cur, i) {
    acc[i] = cur;
    return acc;
  }, {});
  return resultObj;
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