import React, { Component } from 'react';
import base from "./base"
import restaurantsList from "./restaurantsList";
import AddRestaurantForm from "./components/AddRestaurantForm";
import AddWeeklySpecialForm from "./components/AddWeeklySpecialForm";
import AllRestaurants from "./components/AllRestaurants";
import NewRestaurants from "./components/NewRestaurants";
import TodaysSpecials from "./components/TodaysSpecials";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsList: {},
      weeklySpecials: {},
      showAllRestaurants: false,
      showTodaysSpecials: false,
      showNewRestaurants: false
    };

    // Bind methods:
    this.filterTodaysSpecials = this.filterTodaysSpecials.bind(this);
    this.formatTodaysSpecials = this.formatTodaysSpecials.bind(this);
    this.getTodaysSpecials = this.getTodaysSpecials.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.addSpecial = this.addSpecial.bind(this);    
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // syncs state with firebase data
    base.syncState("restaurants", {
      context: this,
      state: "restaurantsList"
    });
    base.syncState("weeklySpecials", {
      context: this,
      state: "weeklySpecials"
    });
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

  // Add new functions
  addSpecial(restaurant, key) {
    // update our state - make a copy first, this is best practice:
    const weeklySpecials = { ...this.state.weeklySpecials };
    const timestamp = Date.now();
    // add in our new special
    weeklySpecials[`special-${timestamp}`] = restaurant;
    // set state
    this.setState({ weeklySpecials });
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
          {this.state.showTodaysSpecials ? <TodaysSpecials restaurantsList={this.state.restaurantsList} weeklySpecials={this.state.weeklySpecials} /> : null}
        </div>

        <AddRestaurantForm restaurantsList={this.state.restaurantsList} addRestaurant={this.addRestaurant} />
        <AddWeeklySpecialForm restaurantsList={this.state.restaurantsList} addSpecial={this.addSpecial} />
      </div>;
  }
}

export default App;
