import React, { Component } from "react";
import RestaurantDetails from "../components/RestaurantDetails";

class EditRestaurant extends Component {
/*
    Here, we want to be able to select a restaurant
    Display its details
    Edit details or remove from list
    And save    
*/
  constructor() {
    super();

    this.state = {
        editRestaurantKey: ''
    }

    //binding methods:
    this.selectRestaurantSubmit = this.selectRestaurantSubmit.bind(this);
  }

  selectRestaurantSubmit(e) {
    e.preventDefault();
    // update our state - make a copy first, this is best practice:
    const editRestaurantKey = { ...this.state.editRestaurantKey };    
    this.restaurantName.disabled = true;
    this.setState({
      editRestaurantKey: this.restaurantName.value
    })
  }

  render() {
    const restaurantsList = this.props.restaurantsList;
    return <div>
        <h1 className="text-center">Edit a Restaurant</h1>
        <form className="form-block js-add-new">
          <div className="form-group">
            <label htmlFor="restaurantName">Select a Restaurant:</label>
            <select ref={input => (this.restaurantName = input)} name="restaurantName" className="form-block__select form-control" type="select" onChange={e => this.selectRestaurantSubmit(e)}>
              {Object.keys(restaurantsList).map(key => (
                <option key={key} value={key}>
                  {restaurantsList[key].restaurantName}
                </option>
              ))}
            </select>
          </div>
        </form>
        {this.state.editRestaurantKey ? <RestaurantDetails restaurantKey={this.state.editRestaurantKey} restaurantsList={this.props.restaurantsList} removeRestaurant={this.props.removeRestaurant} /> : null}
      </div>;
  }
}

export default EditRestaurant;
