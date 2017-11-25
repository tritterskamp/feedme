import React, { Component } from "react";
import PropTypes from "prop-types";
import RestaurantDetails from "../components/RestaurantDetails";
import SpecialDetails from "../components/SpecialDetails";

class EditRestaurant extends Component {
/*
    Here, we want to be able to select a restaurant
    Display its details
    Edit details or remove from list
    And save    
*/
  constructor() {
    super();

    //binding methods:
    this.selectRestaurantSubmit = this.selectRestaurantSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.renderSpecials = this.renderSpecials.bind(this);
  }

  selectRestaurantSubmit(e) {
    e.preventDefault();
    this.restaurantName.disabled = true;
    this.props.editRestaurant(this.restaurantName.value);    
  }

  resetForm() {
    this.props.resetRestaurantKey();
    this.restaurantName.disabled = false;    
    this.restaurantSelect.reset();
  }

  renderSpecials(key) {
    return <SpecialDetails key={key} specialKey={key} restaurantKey={this.props.editRestaurantKey} restaurantsList={this.props.restaurantsList} weeklySpecials={this.props.weeklySpecials[key]} removeSpecial={this.props.removeSpecial} updateSpecial={this.props.updateSpecial} resetForm={this.resetForm} />;
  }

  render() {
    const restaurantsList = this.props.restaurantsList;
    const restaurantKey = this.props.editRestaurantKey;
    const specials = Object.keys(this.props.weeklySpecials).filter(key => this.props.weeklySpecials[key].restaurantKey === restaurantKey);
    return <div>
        <h1 className="text-center">Edit a Restaurant</h1>
        <form ref={input => (this.restaurantSelect = input)} className="form-block js-add-new">
          <div className="form-group">
            <label htmlFor="restaurantName">Select a Restaurant:</label>
            <select ref={input => (this.restaurantName = input)} name="restaurantName" className="form-block__select form-control" type="select" onChange={e => this.selectRestaurantSubmit(e)}>
              <option>Select a Restaurant</option>
              {Object.keys(restaurantsList).map(key => (
                <option key={key} value={key}>
                  {restaurantsList[key].restaurantName}
                </option>
              ))}
            </select>
          </div>
        </form>
        {this.props.editRestaurantKey ? <div>
            <RestaurantDetails 
              restaurantKey={this.props.editRestaurantKey} 
              restaurantsList={this.props.restaurantsList} 
              specials={specials}
              removeSpecial={this.props.removeSpecial}
              removeRestaurant={this.props.removeRestaurant} updateRestaurant={this.props.updateRestaurant} 
              resetForm={this.resetForm} />
            {specials.map(this.renderSpecials)}
          </div> : null}
      </div>;
  }
}

EditRestaurant.propTypes = {
  removeRestaurant: PropTypes.func.isRequired,
  updateRestaurant: PropTypes.func.isRequired,
  restaurantsList: PropTypes.object.isRequired
}

export default EditRestaurant;
