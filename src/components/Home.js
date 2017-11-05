import React, { Component } from "react";
import AllRestaurants from "../components/AllRestaurants";
import NewRestaurants from "../components/NewRestaurants";
import TodaysSpecials from "../components/TodaysSpecials";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showAllRestaurants: false,
        showTodaysSpecials: false,
        showNewRestaurants: false
    }
    // Bind methods:
    this.handleClick = this.handleClick.bind(this);
  }
  // Click handler
  handleClick(e) {
    this.setState({
      // sets state based on the clicked button's name and toggles true/false
      [e.target.name]: this.state[e.target.name] ? false : true
    });
  }

  render() {
    return (
      <div>
        <h1>Where should we go for dinner?</h1>
        <div className="row">
          <button
            className="btn btn-default button--weeklySpecials"
            name="showTodaysSpecials"
            onClick={e => this.handleClick(e)}
          >
            Today's Specials
          </button>
          <button
            className="btn btn-default button--newRestaurants"
            name="showNewRestaurants"
            onClick={e => this.handleClick(e)}
          >
            Let's Try Something New
          </button>
          <button
            className="btn btn-default button--weeklySpecials"
            name="showAllRestaurants"
            onClick={e => this.handleClick(e)}
          >
            Show Me All Restaurants
          </button>
        </div>
        <div id="results" className="row">
          {this.state.showAllRestaurants ? (
            <AllRestaurants restaurantsList={this.props.restaurantsList} />
          ) : null}
          {this.state.showNewRestaurants ? (
            <NewRestaurants restaurantsList={this.props.restaurantsList} />
          ) : null}
          {this.state.showTodaysSpecials ? (
            <TodaysSpecials
              restaurantsList={this.props.restaurantsList}
              weeklySpecials={this.props.weeklySpecials}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
