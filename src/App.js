import React, { Component } from 'react';
import base from "./base"
import restaurantsList from "./restaurantsList";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurantsList: {}
    };

    // Bind methods:
    this.getCurrentWeekday = this.getCurrentWeekday.bind(this);
    this.filterTodaysSpecials = this.filterTodaysSpecials.bind(this);
    this.formatTodaysSpecials = this.formatTodaysSpecials.bind(this);
    this.randomListFromArray = this.randomListFromArray.bind(this);
    this.mapNewRestaurants = this.mapNewRestaurants.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.getTodaysSpecials = this.getTodaysSpecials.bind(this);
    this.getNewRestaurants = this.getNewRestaurants.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.addNewSubmit = this.addNewSubmit.bind(this);
  }

  componentWillMount() {
    base.syncState("restaurants", {
      context: this,
      state: "restaurantsList"
    });    
  }

  // Get current day of week
  getCurrentWeekday() {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return weekdays[currentDay];
  }

  filterTodaysSpecials(currentDay, weeklySpecialsList) {
    // Filter through weeklySpecialsList
    const todaysSpecialList = [];
    weeklySpecialsList.map(function(restaurant) {
      for (let i = 0; i < restaurant.weeklySpecials.length; i++) {
        // If weekly special contains a specialDay that matches the currentDay push restaurant name, specials details and website into a new array
        if (restaurant.weeklySpecials[i].specialDay === currentDay) {
          todaysSpecialList.push({
            restaurantName: restaurant.restaurantName,
            specialDay: restaurant.weeklySpecials[i].specialDay,
            special: restaurant.weeklySpecials[i].special
          });
        }
      }
    });
    // Return the new array
    return todaysSpecialList;
  }

  formatTodaysSpecials(data) {
    let html = "";
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const $this = data[i];
        html += `<p>${$this.restaurantName} has ${$this.special} on ${$this.specialDay}`;
      }
    } else {
      html += `<p>Sorry, there are no specials today. Try something new!</p>`;
    }
    return html;
  }

  // Randomize list
  randomListFromArray(array, limit) {
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

  // Map new restaurant data
  mapNewRestaurants(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html += `<p><a href="${data[i].website}" target="_blank">${data[i]
        .restaurantName}</a></p>`;
    }
    return html;
  }

  // Display our results
  displayResults(data) {
    const results = document.getElementById("results");
    // display new results
    results.innerHTML = data;
  }

  // User clicks specials button, we should return all restaurants with a special matching the day of the week
  getTodaysSpecials(e) {
    const today = this.getCurrentWeekday();
    const weeklySpecialsList = restaurantsList.filter(function(restaurant) {
      return restaurant.weeklySpecials;
    });
    const todaysSpecials = this.filterTodaysSpecials(today, weeklySpecialsList);
    const resultsMarkup = this.formatTodaysSpecials(todaysSpecials);
    this.displayResults(resultsMarkup);
  }

  // User clicks new button, we should randomly return 3 restaurant options to pick from
  getNewRestaurants(e) {
    // randomize the array and return 3 options
    const newrestaurantsList = restaurantsList.filter(function(restaurant) {
      return !restaurant.haveVisited;
    });
    const randomizedRestaurants = this.randomListFromArray(
      newrestaurantsList,
      3
    );
    // get the markup of our results
    const resultsMarkup = this.mapNewRestaurants(randomizedRestaurants);
    // display those options
    this.displayResults(resultsMarkup);
  }

  // Add new functions
  addRestaurant(restaurant) {
    // update our state - make a copy first, this is best practice:
    const restaurantsList = { ...this.state.restaurantsList };
    // add in our new restaurant
    const timestamp = Date.now();
    restaurantsList[`restaurant-${timestamp}`] = restaurant;    
    // set state
    this.setState({ restaurantsList });
  }

  addNewSubmit(e) {
    e.preventDefault();
    // Create object of new restaurant data from form
    const newRestaurant = {
      restaurantName: this.restaurantName.value,
      restaurantWebsite: this.restaurantWebsite.value,
      haveVisited: this.haveVisited.value
    };
    this.addRestaurant(newRestaurant);
    this.newRestaurantForm.reset();
  }

  render() {
    return (
      <div className="App">
        <h1>Where should we go for dinner?</h1>
        <div>
          <button
            className="button--weeklySpecials"
            onClick={e => this.getTodaysSpecials(e)}
          >
            Somewhere Tried & True
          </button>
          <button
            className="button--newRestaurants"
            onClick={e => this.getNewRestaurants(e)}
          >
            Give Me Something New
          </button>
        </div>
        <div id="results" />

        <h3>Add a new restaurant</h3>
        <form
          ref={input => (this.newRestaurantForm = input)}
          className="form-block js-add-new"
          onSubmit={e => this.addNewSubmit(e)}
        >
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name:</label>
            <input
              ref={input => (this.restaurantName = input)}
              className="form-block__input"
              type="text"
              name="restaurantName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="restaurantWebsite">Restaurant Website:</label>
            <input
              ref={input => (this.restaurantWebsite = input)}
              className="form-block__input"
              type="text"
              name="restaurantWebsite"
            />
          </div>
          <div className="form-group">
            <label htmlFor="haveVisited">Have you visited?</label>
            <select
              ref={input => (this.haveVisited = input)}
              name="haveVisited"
              className="form-block__select"
              type="select"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <button className="form-block__button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
