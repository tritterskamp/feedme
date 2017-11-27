import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const restaurant = this.props.restaurantsList[key];
    return (
      <p className="restaurant" key={key} havevisited={restaurant.haveVisited}>
        <a href={restaurant.restaurantWebsite} target="_blank">
          {restaurant.restaurantName}
        </a>
      </p>
    );
  }

  render() {
    // Return array of restaurant keys where haveVisited === false
    const newRestaurants = Object.keys(this.props.restaurantsList).filter(
      key => this.props.restaurantsList[key].haveVisited === "false"
    );    
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