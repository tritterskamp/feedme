import React, { Component } from "react";
import { BrowserRouter, Link, NavLink, Switch, Route } from "react-router-dom";
import base from "./base";
import Home from "./components/Home";
import AddRestaurantForm from "./components/AddRestaurantForm";
import AddWeeklySpecialForm from "./components/AddWeeklySpecialForm";
import EditRestaurant from "./components/EditRestaurant";
import "./App.css";


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsList: {},
      weeklySpecials: {},
      activeButton: "",
      editRestaurantKey: ""
    };

    // Bind methods:
    this.addRestaurant = this.addRestaurant.bind(this);
    this.addSpecial = this.addSpecial.bind(this);
    this.editRestaurant = this.editRestaurant.bind(this);
    this.resetRestaurantKey = this.resetRestaurantKey.bind(this);
    this.removeRestaurant = this.removeRestaurant.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.removeSpecial = this.removeSpecial.bind(this);
    this.updateSpecial = this.updateSpecial.bind(this);
    this.renderActiveButton = this.renderActiveButton.bind(this);
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

  editRestaurant(key) {
    this.setState({
      editRestaurantKey: key
    });
  }

  resetRestaurantKey() {
    this.setState({
      editRestaurantKey: ""
    });
  }

  removeRestaurant(key) {
    // take a copy of state
    const restaurantsList = { ...this.state.restaurantsList };
    restaurantsList[key] = null;
    
    //update our state
    this.setState({ restaurantsList });
  }

  updateRestaurant(key, restaurantDetails) {
    // take a copy of state
    const restaurantsList = { ...this.state.restaurantsist };
    restaurantsList[key] = restaurantDetails;
    this.setState({ restaurantsList });
  }

  removeSpecial(keyArray) {
    // take a copy of state
    const weeklySpecials = { ...this.state.weeklySpecials };    
    // there may be multiple specials so map each one to null
    keyArray.map(key => (weeklySpecials[key] = null));

    //update our state
    this.setState({ weeklySpecials });
  }

  updateSpecial(key, specialDetails) {
    // take a copy of state
    const weeklySpecials = { ...this.state.weeklySpecials };
    weeklySpecials[key] = specialDetails;
    this.setState({ weeklySpecials });
  }

  renderActiveButton(target) {
    this.setState({
      activeButton: target
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="navbar navbar-inverse">
            <div className="container">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-expanded="false"
                  aria-controls="navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <Link to="/" className="navbar-brand">
                  Restaurant Picker!
                </Link>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/" exact>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-restaurant">Add a Restaurant</NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-special">Add a Special</NavLink>
                  </li>
                  <li>
                    <NavLink to="/edit-restaurant">Edit a Restaurant</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <Switch>
                <PropsRoute
                  path="/"
                  exact
                  component={Home}
                  restaurantsList={this.state.restaurantsList}
                  weeklySpecials={this.state.weeklySpecials}
                  activeButton={this.state.activeButton}
                  renderActiveButton={this.renderActiveButton}
                />
                <PropsRoute
                  path="/add-restaurant"
                  component={AddRestaurantForm}
                  restaurantsList={this.state.restaurantsList}
                  addRestaurant={this.addRestaurant}
                />
                <PropsRoute
                  path="/add-special"
                  component={AddWeeklySpecialForm}
                  restaurantsList={this.state.restaurantsList}
                  addSpecial={this.addSpecial}
                />} />
                <PropsRoute
                  path="/edit-restaurant"
                  component={EditRestaurant}
                  restaurantsList={this.state.restaurantsList}
                  weeklySpecials={this.state.weeklySpecials}
                  editRestaurantKey={this.state.editRestaurantKey}
                  editRestaurant={this.editRestaurant}
                  resetRestaurantKey={this.resetRestaurantKey}
                  removeRestaurant={this.removeRestaurant}
                  updateRestaurant={this.updateRestaurant}
                  removeSpecial={this.removeSpecial}
                  updateSpecial={this.updateSpecial}
                />} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
