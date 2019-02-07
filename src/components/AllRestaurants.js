import React, { Component } from "react";
import PropTypes from "prop-types";
import Restaurant from "./Restaurant";
import { sortAlphabetically } from "../helpers"

class AllRestaurants extends Component {
    /*
    Render a list of all restaurants that are saved in our DB
    Future enhancements: 
        - make the details of each restaurant editable
    */

    returnRestaurants(restaurantsList) {
        if(this.props.status === 'new') {
            return Object.keys(restaurantsList).filter(key => restaurantsList[key].haveVisited === 'false');
        } else if (this.props.status === 'not new') {
            return Object.keys(restaurantsList).filter(key => restaurantsList[key].haveVisited === 'true');
        } else {
            return Object.keys(restaurantsList);
        }
    }

    filterRestaurants(restaurantsList) {
        return (
            <div className="filter-by">Filter by:</div>
        )

    }

    render() {
        const restaurantsList = sortAlphabetically(this.props.restaurantsList, "restaurantName");
        // Build an array of our list of restaurants keys and then render the output
        return <div className="all-restaurants">

            {this.filterRestaurants()}

            {Object.keys(restaurantsList).length > 0 ? (
                this.returnRestaurants(restaurantsList).map(key =>
                    <Restaurant key={key} restaurant={restaurantsList[key]} />
              )
            ) : (
              <p>Sorry, there are no restaurants available.</p>
            )}
          </div>;
    }
}

AllRestaurants.propTypes = {
    restaurantsList: PropTypes.object.isRequired
}

export default AllRestaurants;