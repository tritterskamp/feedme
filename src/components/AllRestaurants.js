import React, { Component } from "react";
import { sortAlphabetically } from "../helpers"

class AllRestaurants extends Component {
    /*
    Render a list of all restaurants that are saved in our DB
    Future enhancements: 
        - display list in alphabetical order 
        - make the details of each restaurant editable
    */

    constructor() {
        super();
        this.renderAllRestaurants = this.renderAllRestaurants.bind(this);
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
        const restaurantsList = this.props.restaurantsList;

        // Build an array of our list of restaurants keys and then render the output
        return <div>
            {Object.keys(restaurantsList)
              .map(this.renderAllRestaurants)}
          </div>;
    }
}

export default AllRestaurants;