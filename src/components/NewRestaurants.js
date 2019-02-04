import React, { Component } from "react";
import PropTypes from "prop-types";
import Restaurant from "./Restaurant";
import { sortAlphabetically } from "../helpers"

class NewRestaurants extends Component {
    /*
    Render a list of all restaurants that are saved in our DB
    Future enhancements: 
        - make the details of each restaurant editable
    */

    render() {
        
        const restaurantsList = sortAlphabetically(this.props.restaurantsList, "restaurantName");
        // const newRestaurants = Object.keys(restaurantsList).filter(key => this.props.restaurantsList[key].haveVisited !== true);
        // console.log(newRestaurants);


        // Build an array of our list of restaurants keys and then render the output
        return <div className="new-restaurants">
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

NewRestaurants.propTypes = {
    restaurantsList: PropTypes.object.isRequired
}

export default NewRestaurants;