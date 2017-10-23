import React, { Component } from 'react';
import base from "./base"
import restaurantsList from "./restaurantsList";
import AddRestaurantForm from "./components/AddRestaurantForm";
import AllRestaurants from "./components/AllRestaurants";
import NewRestaurants from "./components/NewRestaurants";
import TodaysSpecials from "./components/TodaysSpecials";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsList: {},
      showAllRestaurants: false,
      showTodaysSpecials: false,
      showNewRestaurants: false
    };

    // Bind methods:
    this.getCurrentWeekday = this.getCurrentWeekday.bind(this);
    this.filterTodaysSpecials = this.filterTodaysSpecials.bind(this);
    this.formatTodaysSpecials = this.formatTodaysSpecials.bind(this);
    //this.randomListFromArray = this.randomListFromArray.bind(this);
    //this.mapNewRestaurants = this.mapNewRestaurants.bind(this);
    //this.displayResults = this.displayResults.bind(this);
    this.getTodaysSpecials = this.getTodaysSpecials.bind(this);
    //this.getNewRestaurants = this.getNewRestaurants.bind(this);
    //this.showAllRestaurants = this.showAllRestaurants.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // syncs state with firebase data
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

  // // Randomize list
  // randomListFromArray(array, limit) {
  //   // Random Item from an Array, with no repeats
  //   const list = [];
  //   let timeout = 0;
  //   const attemptAddRandom = function() {
  //     timeout++;
  //     let candidate = array[Math.floor(Math.random() * array.length)];
  //     if (list.indexOf(candidate) === -1) {
  //       list.push(candidate);
  //     }

  //     if (list.length < limit) {
  //       if (timeout < 300) {
  //         attemptAddRandom();
  //       }
  //     }
  //   };

  //   attemptAddRandom();
  //   return list;
  // }

  // Map new restaurant data
  // mapNewRestaurants(data) {
  //   let html = "";
  //   for (let i = 0; i < data.length; i++) {
  //     html += `<p><a href="${data[i].website}" target="_blank">${data[i]
  //       .restaurantName}</a></p>`;
  //   }
  //   return html;
  // }

  // // Display our results
  // displayResults(data) {
  //   const results = document.getElementById("results");
  //   // display new results
  //   results.innerHTML = data;
  // }

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
  // getNewRestaurants(e) {
  //   // randomize the array and return 3 options
  //   const newrestaurantsList = restaurantsList.filter(function(restaurant) {
  //     return !restaurant.haveVisited;
  //   });
  //   const randomizedRestaurants = this.randomListFromArray(
  //     newrestaurantsList,
  //     3
  //   );
  //   // get the markup of our results
  //   const resultsMarkup = this.mapNewRestaurants(randomizedRestaurants);
  //   // display those options
  //   this.displayResults(resultsMarkup);
  // }

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

  // Click handler
  handleClick(e) {
    this.setState({
      // sets state based on the clicked button's name and toggles true/false
      [e.target.name]: this.state[e.target.name] ? false : true
    });
  }

  render() {
    return <div className="App">
        <h1>Where should we go for dinner?</h1>
        <div>
          <button className="button--weeklySpecials" name="showTodaysSpecials" onClick={e => this.handleClick(e)}>
            Somewhere Tried & True
          </button>
          <button className="button--newRestaurants" name="showNewRestaurants" onClick={e => this.handleClick(e)}>
            Give Me Something New
          </button>
          <button className="button--weeklySpecials" name="showAllRestaurants" onClick={e => this.handleClick(e)}>
            Show Me All Restaurants
          </button>
        </div>
        <div id="results">
          {this.state.showAllRestaurants ? <AllRestaurants restaurantsList={this.state.restaurantsList} /> : null}
          {this.state.showNewRestaurants ? <NewRestaurants restaurantsList={this.state.restaurantsList} /> : null}
          {this.state.showTodaysSpecials ? <TodaysSpecials restaurantsList={this.state.restaurantsList} /> : null}
        </div>

        <AddRestaurantForm restaurantsList={this.state.restaurantsList} />
      </div>;
  }
}

export default App;
