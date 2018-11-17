import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCurrentWeekday, getQueryString, toTitleCase } from "../helpers";

class TodaysSpecials extends Component {
  /*
  First, we want to figure out what day it is
  Then, we want to filter our list of restaurants and return a new array of all with specials === today
  Then, if there are any specials today, let's render an output of all of them, otherwise show a message that there are no specials today
  */

  constructor() {
    super();
    this.renderTodaysSpecials = this.renderTodaysSpecials.bind(this);
    this.getTodaysSpecialsList = this.getTodaysSpecialsList.bind(this);
  }

  // Render the output
  renderTodaysSpecials(key) {
    const special = this.props.weeklySpecials[key];
    const restaurantKey = special.restaurantKey;
    // let's check to make sure today's special corresponds to a restaurant key
    if (this.props.restaurantsList[restaurantKey]) {
      // then let's print the restaurant special available today
      const restaurant = this.props.restaurantsList[restaurantKey];
      const restaurantName = restaurant.restaurantName;
      const hasWebsite = restaurant.restaurantWebsite.length > 0 ? true : false;     
      return <p key={key}>{special.restaurantSpecial} at {hasWebsite ? <a href={restaurant.restaurantWebsite} target="_blank">
{restaurantName}</a> : restaurantName } on {special.specialDay}</p>;
    }
    return false;
  }

  // Get all specials based on query string param or the current day
  getTodaysSpecialsList() {
    const queriedDay = getQueryString('day', window.location.href);
    if(queriedDay) {
      return Object.keys(this.props.weeklySpecials).filter(key => this.props.weeklySpecials[key].specialDay === toTitleCase(queriedDay));
    } else {
      return Object.keys(this.props.weeklySpecials).filter(key => this.props.weeklySpecials[key].specialDay === getCurrentWeekday());
    }    
  }

  render() {    
    
    const todaysSpecialsList = this.getTodaysSpecialsList();
    
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

TodaysSpecials.propTypes = {
  weeklySpecials: PropTypes.object.isRequired,
  restaurantsList: PropTypes.object.isRequired
}

export default TodaysSpecials;