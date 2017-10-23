import React, { Component } from "react";

function ShowAllRestaurants(props) {
    return <p className="restaurant">
        <a href={props.restaurant.restaurantWebsite} target="_blank">
            {props.restaurant.restaurantName}
        </a>
    </p>
}

class TodaysSpecials extends Component {

  render() {
    return <div>
        {Object.keys(this.props.restaurantsList).map(key => (
          <ShowAllRestaurants
            key={key}
            restaurant={this.props.restaurantsList[key]}
          />
        ))}
      </div>;
  }
}

export default TodaysSpecials;