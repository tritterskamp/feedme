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
    this.filterTodaysSpecials = this.filterTodaysSpecials.bind(this);
    this.renderTodaysSpecials = this.renderTodaysSpecials.bind(this);
  }

  filterTodaysSpecials(key) {
    const restaurant = this.props.restaurantsList[key];
    const restaurantSpecial = this.props.weeklySpecials[key];
    Object.keys(restaurantSpecial).map(key =>
      this.renderTodaysSpecials(key, restaurant, restaurantSpecial)
    );
    // Filter through weeklySpecialsList
    // const todaysSpecialList = Object.keys(this.props.restaurantsList).map(key => this.props.restaurantsList[key].specialDay === currentDay);
    // // weeklySpecialsList.map(function(restaurant) {
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
    //    return todaysSpecialList;
  }

  // Render the output
  renderTodaysSpecials(key, restaurant, restaurantSpecial) {
    // console.log(key);
    // console.log(restaurant.restaurantName);
    // console.log(restaurantSpecial[key].specialDay);
    const restaurantName = restaurant.restaurantName;
    const special = restaurantSpecial[key];
    console.log(restaurantName);
    console.log(special.specialDay);
    if (special.specialDay === getCurrentWeekday) {
      console.log('yes');
      return <p key={key}>
          {special.restaurantSpecial} at {restaurantName} on {special.specialDay}
        </p>;
    } else {
      console.log('no');
      return <p key={key}>
          Sorry, there are no specials today. Try something new!
        </p>;
    }
  }

  render() {
    const todaysSpecialList = Object.keys(this.props.restaurantsList).map(
      key => this.props.restaurantsList[key]
    );
    // Build an array of our list of restaurants keys and then render the output
    return <div>
        {Object.keys(this.props.weeklySpecials).map(
          this.filterTodaysSpecials
        )}
      </div>;
  }
}

export default TodaysSpecials;