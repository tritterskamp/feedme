import React, { Component } from "react";

class NewRestaurants extends Component {
  constructor() {
    super();
    this.renderAllRestaurants = this.renderAllRestaurants.bind(this);
  }

  // Randomize list
  randomListFromArray(array, limit) {
    // Random Item from an Array, with no repeats
    const list = [];
    let timeout = 0;
    const attemptAddRandom = function() {
      timeout++;
      let candidate = array[Math.floor(Math.random() * array.length)];
      if (list.indexOf(candidate) === -1) {
        list.push(candidate);
      }

      if (list.length < limit) {
        if (timeout < 300) {
          attemptAddRandom();
        }
      }
    };

    attemptAddRandom();
    return list;
  }

  getNewRestaurants(e) {
    // randomize the array and return 3 options
    const newrestaurantsList = this.props.restaurantsList.filter(function(restaurant) {
      return !restaurant.haveVisited;
    });
    const randomizedRestaurants = this.randomListFromArray(
      newrestaurantsList,
      3
    );
    // get the markup of our results
    //const resultsMarkup = this.mapNewRestaurants(randomizedRestaurants);
    // display those options
    //this.displayResults(resultsMarkup);
    return randomizedRestaurants;
  }

  renderNewRestaurants(key) {
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
    const restaurantId = Object.keys(this.props.restaurantsList);
    return <div>{restaurantId.map(this.renderNewRestaurants)}</div>;
  }
}

export default NewRestaurants;