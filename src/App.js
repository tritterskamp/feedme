import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import base from "./base";
import Home from "./components/Home";
import AddRestaurantForm from "./components/AddRestaurantForm";
import AddWeeklySpecialForm from "./components/AddWeeklySpecialForm";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsList: {},
      weeklySpecials: {}
    };

    // Bind methods:
    this.addRestaurant = this.addRestaurant.bind(this);
    this.addSpecial = this.addSpecial.bind(this);
  }

  componentWillMount() {
    //syncs state with firebase data
    base.syncState("restaurants", {
      context: this,
      state: "restaurantsList"
    });
    base.syncState("weeklySpecials", {
      context: this,
      state: "weeklySpecials"
    });
  }

  // Add new functions
  addRestaurant(restaurant) {
    // update our state - make a copy first, this is best practice:
    const restaurantsList = { ...this.state.restaurantsList };
    // add in our new restaurant
    const timestamp = Date.now();
    restaurantsList[`restaurant-${timestamp}`] = restaurant;
    // set state
    this.setState({ restaurantsList });
  }

  // Add new functions
  addSpecial(restaurant, key) {
    // update our state - make a copy first, this is best practice:
    const weeklySpecials = { ...this.state.weeklySpecials };
    const timestamp = Date.now();
    // add in our new special
    weeklySpecials[`special-${timestamp}`] = restaurant;
    // set state
    this.setState({ weeklySpecials });
  }

  render() {
    return <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a className="navbar-brand" href="#">
                  Restaurant Picker!
                </a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/add-restaurant">Add a Restaurant</Link>
                  </li>
                  <li>
                    <Link to="/add-special">Add a Special</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="row text-center">
              <Route path="/" exact render={() => <Home restaurantsList={this.state.restaurantsList} weeklySpecials={this.state.weeklySpecials} />} />
              <Route path="/add-restaurant" render={() => <AddRestaurantForm restaurantsList={this.state.restaurantsList} addRestaurant={this.addRestaurant} />} />
              <Route path="/add-special" render={() => <AddWeeklySpecialForm restaurantsList={this.state.restaurantsList} addSpecial={this.addSpecial} />} />
            </div>
          </div>
        </div>
      </BrowserRouter>;
  }
}

export default App;
