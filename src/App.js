import React, { Component } from 'react';
import base from "./base"
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
            Today's Specials
          </button>
          <button className="button--newRestaurants" name="showNewRestaurants" onClick={e => this.handleClick(e)}>
            Let's Try Something New
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
