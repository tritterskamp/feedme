import React, { Component } from "react";

class AllRestaurants extends Component {
    constructor() {
        super();
        this.renderAllRestaurants = this.renderAllRestaurants.bind(this);
    }

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
        return <div>{Object.keys(this.props.restaurantsList).map(this.renderAllRestaurants)}</div>;
    }
}

export default AllRestaurants;