import React, { Component } from "react";

class AddRestaurantForm extends Component {
    constructor() {
        super();

        //binding methods:
        this.addNewSubmit = this.addNewSubmit.bind(this);
    }
  addNewSubmit(e) {
    e.preventDefault();
    // Create object of new restaurant data from form
    const newRestaurant = {
      restaurantName: this.restaurantName.value,
      restaurantWebsite: this.restaurantWebsite.value,
      haveVisited: this.haveVisited.value
    };
    this.props.addRestaurant(newRestaurant);
    this.newRestaurantForm.reset();
  }

  render() {
    return <div>
        <h1>Add a new restaurant</h1>
        <form ref={input => (this.newRestaurantForm = input)} className="form-block js-add-new" onSubmit={e => this.addNewSubmit(e)}>
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name:</label>
            <input ref={input => (this.restaurantName = input)} className="form-block__input" type="text" name="restaurantName" />
          </div>
          <div className="form-group">
            <label htmlFor="restaurantWebsite">Restaurant Website:</label>
            <input ref={input => (this.restaurantWebsite = input)} className="form-block__input" type="text" name="restaurantWebsite" />
          </div>
          <div className="form-group">
            <label htmlFor="haveVisited">Have you visited?</label>
            <select ref={input => (this.haveVisited = input)} name="haveVisited" className="form-block__select" type="select">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-group">
            <button className="form-block__button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>;
  }
}

export default AddRestaurantForm;