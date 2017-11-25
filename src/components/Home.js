import React, { Component } from "react";
import PropTypes from "prop-types";
import AllRestaurants from "../components/AllRestaurants";
import NewRestaurants from "../components/NewRestaurants";
import TodaysSpecials from "../components/TodaysSpecials";


class Home extends Component {
  constructor() {
    super();
    
    // Bind methods:
    this.handleClick = this.handleClick.bind(this);
  }
  // Click handler
  handleClick(e) {
    this.props.renderActiveButton(e.target.name);    
  }

  render() {
    return <div className="text-center">
        <h1>Where should we go for dinner?</h1>
        <div className="row">
          <button className={this.props.activeButton === "showTodaysSpecials" ? "active btn btn-default" : "btn btn-default"} name="showTodaysSpecials" onClick={e => this.handleClick(e)}>
            Today's Specials
          </button>
          <button className={this.props.activeButton === "showNewRestaurants" ? "active btn btn-default" : "btn btn-default"} name="showNewRestaurants" onClick={e => this.handleClick(e)}>
            Let's Try Something New
          </button>
          <button className={this.props.activeButton === "showAllRestaurants" ? "active btn btn-default" : "btn btn-default"} name="showAllRestaurants" onClick={e => this.handleClick(e)}>
            Show Me All Restaurants
          </button>
        </div>
        <div id="results" className="row">
          {this.props.activeButton === "showAllRestaurants" ? <AllRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showNewRestaurants" ? <NewRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showTodaysSpecials" ? <TodaysSpecials restaurantsList={this.props.restaurantsList} weeklySpecials={this.props.weeklySpecials} /> : null}
        </div>
      </div>;
  }
}

Home.propTypes = {
  activeButton: PropTypes.string.isRequired,
  restaurantsList: PropTypes.object.isRequired,
  weeklySpecials: PropTypes.object.isRequired,
  renderActiveButton: PropTypes.func.isRequired
}

export default Home;
