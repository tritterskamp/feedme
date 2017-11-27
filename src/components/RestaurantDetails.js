import React, { Component } from "react";
import PropTypes from "prop-types";

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
    // remove this key from restaurantsList state
    this.props.removeRestaurant(key);

    // we also need to remove any specials matching this restaurant key...
    this.props.removeSpecial(this.props.specials);

    // reset form and editRestaurantKey
    this.props.resetForm();

    alert(`${this.restaurantName.value} has been removed!`);    
  }

  updateHandler(e, key) {
    e.preventDefault();
    // need to pass the form data and key to updateRestaurant method
    const restaurantDetails = {
      restaurantName: this.restaurantName.value,
      restaurantWebsite: this.restaurantWebsite.value,
      haveVisited: this.haveVisited.value
    };
    this.props.updateRestaurant(key, restaurantDetails);
    // reset form and editRestaurantKey
    this.props.resetForm();
    alert(`${this.restaurantName.value} is updated!`);
  }

  render() {
    const key = this.props.restaurantKey;
    const restaurant = this.props.restaurantsList;
    console.log(key)
    console.log(restaurant[key])
    return <form ref={input => (this.editRestaurantForm = input)} className="restaurant-edit" key={key}>
        <div className="form-group">
          <label htmlFor="restaurantName">Restaurant Name:</label>
          <input ref={input => (this.restaurantName = input)} className="form-block__input form-control" type="text" name="restaurantName" defaultValue={restaurant[key].restaurantName} />
        </div>
        <div className="form-group">
          <label htmlFor="restaurantWebsite">Restaurant Website:</label>
          <input ref={input => (this.restaurantWebsite = input)} className="form-block__input form-control" type="text" name="restaurantWebsite" defaultValue={restaurant[key].restaurantWebsite} />
        </div>
        <div className="form-group">
          <label htmlFor="haveVisited">Have you visited?</label>
          <select ref={input => (this.haveVisited = input)} name="haveVisited" className="form-block__select form-control" type="select" defaultValue={restaurant[key].haveVisited}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {/*<div className="form-group">
          <label htmlFor="restaurantNotes">Restaurant Notes:</label>
          <textarea ref={input => (this.restaurantNotes = input)} className="form-block__input form-control" rows="3" name="restaurantNotes" />
  </div>*/}
        <div className="form-group">
          <button className="form-block__button btn btn-default" type="submit" onClick={e => this.updateHandler(e, key)}>
            Update
          </button>
          <button className="form-block__button btn btn-default" type="submit" onClick={() => this.removeHandler(key)}>
            Remove
          </button>
          <button className="form-block__button btn btn-default" type="submit" onClick={() => this.props.resetForm()}>
            Reset
          </button>
        </div>
      </form>;
  }
}

RestaurantDetails.propTypes = {
  removeRestaurant: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  updateRestaurant: PropTypes.func.isRequired,
  restaurantKey: PropTypes.string.isRequired,
  restaurantsList: PropTypes.object.isRequired
}

export default RestaurantDetails;
