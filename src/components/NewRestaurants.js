import React, { Component } from "react";
import PropTypes from "prop-types";
import Restaurant from "../components/Restaurant";
import { randomListFromArray } from "../helpers"

class NewRestaurants extends Component {
  /*
  First, we want to filter this.props.restaurantsList to only include restaurants that haveVisited === "false"
  Then, we pass that array through the randomListFromArray function
  Then, we output that return on screen
  */

  constructor() {
    super();
    this.renderNewRestaurants = this.renderNewRestaurants.bind(this);
  }


  // Render the output
  renderNewRestaurants(key) {
    return (
      <Restaurant key={key} restaurant={this.props.restaurantsList[key]} />
    );
  }

  render() {
    // Return a new random set of restaurants

    // Map the keys to the correct restaurants

    // Output them

    // Return array of restaurant keys where haveVisited === false
    const newRestaurants = Object.keys(this.props.restaurantsList);
  
    // Return array of specified number of randomized restaurant keys
    const randomRestaurants = randomListFromArray(newRestaurants, 3);
    // Render output of our new random restaurants
    return <div>{randomRestaurants.length > 0 ? (
      randomRestaurants.map(this.renderNewRestaurants)
      ) : (
      <p>Sorry, there are no new restaurants available. Try something tried and true!</p> 
    )
    }</div>;
  }
}

NewRestaurants.propTypes = {
  restaurantsList: PropTypes.object.isRequired
}

export default NewRestaurants;