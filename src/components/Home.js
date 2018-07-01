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
    return <div className="home text-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={this.props.activeButton === "showTodaysSpecials" ? "active nav-link" : "nav-link"} name="showTodaysSpecials" onClick={e => this.handleClick(e)}>
              Specials
            </a>
          </li>
          <li className="nav-item">            
            <a className={this.props.activeButton === "showNewRestaurants" ? "active nav-link" : "nav-link"} name="showNewRestaurants" onClick={e => this.handleClick(e)}>
              New
            </a>
          </li>
          <li className="nav-item">            
            <a className={this.props.activeButton === "showAllRestaurants" ? "active nav-link" : "nav-link"} name="showAllRestaurants" onClick={e => this.handleClick(e)}>
              All
            </a>
          </li>
        </ul>
        <div id="results">
          {this.props.activeButton === "showAllRestaurants" ? <AllRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showNewRestaurants" ? <NewRestaurants restaurantsList={this.props.restaurantsList} /> : this.props.activeButton === "showTodaysSpecials" ? <TodaysSpecials restaurantsList={this.props.restaurantsList} weeklySpecials={this.props.weeklySpecials} /> : <p>Hi {this.props.user.displayName}!<br /> Where should we eat?</p>}
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
