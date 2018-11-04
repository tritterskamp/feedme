import React, { Component } from "react";
import PropTypes from "prop-types";
import Restaurant from "./Restaurant";
import { randomListFromArray } from "../helpers"

class RandomRestaurants extends Component {

  render() {
    // Return array of specified number of randomized restaurant keys
    const randomRestaurants = randomListFromArray(Object.keys(this.props.restaurantsList), 3);
    // Render output of our new random restaurants
    return <div className="random-restaurants">
      {randomRestaurants.length > 0 ? (
        randomRestaurants.map(key => 
          <Restaurant key={key} restaurant={this.props.restaurantsList[key]} />
        )
      ) : (
        <p>Sorry, there are no restaurants available.</p>
    )
    }</div>;
  }
}

RandomRestaurants.propTypes = {
  restaurantsList: PropTypes.object.isRequired
}

export default RandomRestaurants;