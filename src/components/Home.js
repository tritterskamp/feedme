import React, { Component } from "react";
import PropTypes from "prop-types";
import AllRestaurants from "../components/AllRestaurants";
import RandomRestaurants from "../components/RandomRestaurants";
import TodaysSpecials from "../components/TodaysSpecials";


class Home extends Component {  
  render() {
    
    return <div className="home text-center">        
        <div id="results">
          {this.props.activeButton === "showAllRestaurants" ? <AllRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showRandomRestaurants" ? <RandomRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showTodaysSpecials" ? <TodaysSpecials restaurantsList={this.props.restaurantsList} weeklySpecials={this.props.weeklySpecials} /> : <p>Hi {this.props.user.displayName}!<br /> Where should we eat?</p>}
        </div>
      </div>;
  }
}

Home.propTypes = {
  activeButton: PropTypes.string.isRequired,
  restaurantsList: PropTypes.object.isRequired,
  weeklySpecials: PropTypes.object.isRequired,
}

export default Home;
