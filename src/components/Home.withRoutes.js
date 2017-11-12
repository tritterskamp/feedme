import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AllRestaurants from "../components/AllRestaurants";
import NewRestaurants from "../components/NewRestaurants";
import TodaysSpecials from "../components/TodaysSpecials";

const Home = (props) => {
  return <div>
      <h1>Where should we go for dinner?</h1>
      <div className="row">
        <Link to={`${props.match.path}/specials`} className="btn btn-default button--weeklySpecials" name="showTodaysSpecials">
          Today's Specials
        </Link>
        <Link to={`${props.match.path}/new`} className="btn btn-default button--newRestaurants" name="showNewRestaurants">
          Let's Try Something New
        </Link>
        <Link to={`${props.match.path}/all`} className="btn btn-default button--weeklySpecials" name="showAllRestaurants">
          Show Me All Restaurants
        </Link>
      </div>
      <div id="results" className="row">
        <Switch>
          <Route path={`${props.match.path}/all`} render={props => <AllRestaurants restaurantsList={props.restaurantsList} {...props} />} />
          <Route path={`${props.match.path}/new`} render={props => <NewRestaurants restaurantsList={props.restaurantsList} {...props} />} />
          <Route path={`${props.match.path}/specials`} render={props => <TodaysSpecials restaurantsList={props.restaurantsList} weeklySpecials={props.weeklySpecials} {...props} />} />
        </Switch>
      </div>
    </div>;
   }

export default Home;
