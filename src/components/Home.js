import React, { Component } from "react";
import PropTypes from "prop-types";
import AllRestaurants from "../components/AllRestaurants";
import RandomRestaurants from "../components/RandomRestaurants";
import TodaysSpecials from "../components/TodaysSpecials";

class Home extends Component {  
  
  constructor() {
    super();
    this.returnResults = this.returnResults.bind(this);
  }

  returnResults(exp) {
    switch(exp) {
      case "showAllRestaurants" :
        return <AllRestaurants restaurantsList={this.props.restaurantsList} />
      break;
      case "showRandomRestaurants" :
        return <RandomRestaurants restaurantsList={this.props.restaurantsList} />
      break;
      case "showTodaysSpecials" :
        return <TodaysSpecials restaurantsList={this.props.restaurantsList} weeklySpecials={this.props.weeklySpecials} />
      break;
      default :
        return <p>Hi {this.props.user.displayName}!<br /> Where should we eat?</p>
    }

  }

  render() {
    
    return <div className="home text-center">        
        <div id="results">
          {this.returnResults(this.props.activeButton)}
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
