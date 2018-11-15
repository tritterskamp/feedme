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

    render() {
        const restaurantsList = sortAlphabetically(this.props.restaurantsList, "restaurantName");
        // Build an array of our list of restaurants keys and then render the output
        return <div className="all-restaurants">
            {Object.keys(restaurantsList).length > 0 ? (
                Object.keys(restaurantsList).map(key =>
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