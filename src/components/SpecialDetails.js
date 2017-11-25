import React, { Component } from "react";
import PropTypes from "prop-types";
import { weekdays } from "../helpers";

class RestaurantDetails extends Component {
  /*
    Here, we want to be able to select a restaurant
    Display its details
    Edit details or remove from list
    And save    
*/
  constructor() {
    super();

    this.removeHandler = this.removeHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  removeHandler(key) {
    const keyArray = [];
    keyArray.push(key);

    // remove this key from restaurantsList state
    this.props.removeSpecial(keyArray);

    // reset form and editRestaurantKey
    this.props.resetForm();
    alert(`${this.restaurantSpecial.value} has been removed!`);
  }

  updateHandler(e, specialKey, restaurantKey) {
    e.preventDefault();
    // need to pass the form data and key to updateRestaurant method
    const specialDetails = {
      restaurantKey: restaurantKey,
      restaurantSpecial: this.restaurantSpecial.value,
      specialDay: this.specialDay.value
    };
    // console.log(specialKey);
    // console.log(specialDetails);
    this.props.updateSpecial(specialKey, specialDetails);
    // reset form and editRestaurantKey
    this.props.resetForm();
    alert(`${this.restaurantSpecial.value} is updated!`);
  }

  render() {
    const restaurantKey = this.props.restaurantKey;
    const specialKey = this.props.specialKey;
    const special = this.props.weeklySpecials;
    return (
      <form
        ref={input => (this.editRestaurantForm = input)}
        className="special-edit"
        key={specialKey}
      >
        <div className="form-group">
          <label htmlFor="restaurantSpecial">Special:</label>
          <input
            ref={input => (this.restaurantSpecial = input)}
            className="form-block__input form-control"
            type="text"
            name="restaurantSpecial"
            defaultValue={special.restaurantSpecial}
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialDay">Day of Week:</label>
          <select
            ref={input => (this.specialDay = input)}
            name="specialDay"
            className="form-block__select form-control"
            type="select"
            defaultValue={special.specialDay}
          >
            {weekdays.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button
            className="form-block__button btn btn-default"
            type="submit"
            onClick={e => this.updateHandler(e, specialKey, restaurantKey)}
          >
            Update
          </button>
          <button
            className="form-block__button btn btn-default"
            type="submit"
            onClick={() => this.removeHandler(specialKey)}
          >
            Remove
          </button>
        </div>
      </form>
    );
  }
}

RestaurantDetails.propTypes = {
  removeSpecial: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  updateSpecial: PropTypes.func.isRequired,
  restaurantKey: PropTypes.string.isRequired,
  restaurantsList: PropTypes.object.isRequired,
  weeklySpecials: PropTypes.object.isRequired
};

export default RestaurantDetails;
