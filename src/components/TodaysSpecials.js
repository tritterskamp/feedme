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
    this.renderTodaysSpecials = this.renderTodaysSpecials.bind(this);
  }

  // Render the output
  renderTodaysSpecials(key) {
    const special = this.props.weeklySpecials[key];
    const restaurantKey = special.restaurantKey;
    // let's check to make sure today's special corresponds to a restaurant key
    if (this.props.restaurantsList[restaurantKey]) {
      // then let's print the restaurant special available today
      const restaurantName = this.props.restaurantsList[restaurantKey].restaurantName;
      return <p key={key}>{special.restaurantSpecial} at {restaurantName} on {special.specialDay}</p>;
    }
    return false;
  }

  render() {
    const todaysSpecialsList = Object.keys(this.props.weeklySpecials).filter(key => this.props.weeklySpecials[key].specialDay === getCurrentWeekday());
    // Build an array of our list of restaurants keys and then render the output
    return <div>
        {todaysSpecialsList.length > 0 ? (
          todaysSpecialsList.map(this.renderTodaysSpecials)
        ) : (
          <p>Sorry, there are no specials today. Try something new!</p>
        )}
      </div>;
  }
}

export default TodaysSpecials;