import React, { Component } from "react";
import { getCurrentWeekday } from "../helpers";

class TodaysSpecials extends Component {
  /*
  First, we want to figure out what day it is
  Then, we want to filter our list of restaurants and return a new array of all with specials === today
  Then, if there are any specials today, let's render an output of all of them, otherwise show a message that there are no specials today
  */

  constructor() {
    super();
    this.renderAllRestaurants = this.renderAllRestaurants.bind(this);
  }

  filterTodaysSpecials(currentDay, weeklySpecialsList) {
    // Filter through weeklySpecialsList
    const todaysSpecialList = Object.keys(this.props.restaurantsList).map(key => this.props.restaurantsList[key].specialDay === currentDay);
    // weeklySpecialsList.map(function(restaurant) {
    //   for (let i = 0; i < restaurant.weeklySpecials.length; i++) {
    //     // If weekly special contains a specialDay that matches the currentDay push restaurant name, specials details and website into a new array
    //     if (restaurant.weeklySpecials[i].specialDay === currentDay) {
    //       todaysSpecialList.push({
    //         restaurantName: restaurant.restaurantName,
    //         specialDay: restaurant.weeklySpecials[i].specialDay,
    //         special: restaurant.weeklySpecials[i].special
    //       });
    //     }
    //   }
    // });
    // Return the new array
    return todaysSpecialList;
  }

  // Render the output
  renderAllRestaurants(key) {
    const restaurant = this.props.restaurantsList[key];
    return (
      <p className="restaurant" key={key}>
        <a href={restaurant.restaurantWebsite} target="_blank">
          {restaurant.restaurantName}
        </a>
      </p>
    );
  }

  render() {
    const todaysSpecialList = Object.keys(this.props.restaurantsList).map(
      key => this.props.restaurantsList[key]
    );
    console.log(todaysSpecialList);
    // Built an array of our list of restaurants keys and then render the output
    return <div>
        {Object.keys(this.props.restaurantsList).map(this.renderAllRestaurants)}
      </div>;
  }
}

export default TodaysSpecials;