import React, { Component } from "react";

class Restaurant extends Component {
    render() {
        
        const restaurant = this.props.restaurant;
        const hasWebsite = restaurant.restaurantWebsite.length > 0 ? true : false;        
        const haveVisited = restaurant.haveVisited === 'true' ? true : false;

        return (
            <div className="restaurant__card">
                {/* Name of restaurant */}
                <p className={haveVisited ? "restaurant" : "restaurant restaurant--new"}>
                    { hasWebsite ?  <a href={restaurant.restaurantWebsite} target="_blank">{restaurant.restaurantName}</a> :  restaurant.restaurantName }
                </p>
                {/* Restaurant cuisine */}        
                <p className="restaurant__cuisine">{restaurant.restaurantCuisine}</p>
                {/* Restaurant neighborhood */}
                <p className="restaurant__neighborhood">{restaurant.restaurantNeighborhood}</p>
                {/* Edit link */}
                <span class="small"> Edit</span>                
            </div>
        );
    }
}

export default Restaurant;