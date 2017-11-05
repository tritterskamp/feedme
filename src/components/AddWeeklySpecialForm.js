import React, { Component } from "react";
import { weekdays } from "../helpers"

class AddWeeklySpecialForm extends Component {
  constructor() {
    super();

    //binding methods:
    this.addNewSubmit = this.addNewSubmit.bind(this);
  }

  addNewSubmit(e) {
    e.preventDefault();
    // Create object of new restaurant data from form
    const newSpecial = {
        restaurantKey: this.restaurantName.value,
        restaurantSpecial: this.restaurantSpecial.value,
        specialDay: this.specialDay.value      
    };
    this.props.addSpecial(newSpecial);
    this.newRestaurantForm.reset();
  }

  render() {
    const restaurantsList = this.props.restaurantsList;
    return <div>
        <h1>Add a weekly special</h1>
        <form ref={input => (this.newRestaurantForm = input)} className="form-block js-add-new" onSubmit={e => this.addNewSubmit(e, this.restaurantName.id)}>
          <div className="form-group">
            <label htmlFor="restaurantName">Restaurant Name:</label>
            <select ref={input => (this.restaurantName = input)} name="restaurantName" className="form-block__select" type="select">
              {Object.keys(restaurantsList).map(key => (
                <option
                  key={key}
                  value={key}
                >
                  {restaurantsList[key].restaurantName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="restaurantSpecial">Special:</label>
            <input ref={input => (this.restaurantSpecial = input)} className="form-block__input" type="text" name="restaurantSpecial" />
          </div>
          <div className="form-group">
            <label htmlFor="specialDay">Day of Week:</label>
            <select ref={input => (this.specialDay = input)} name="specialDay" className="form-block__select" type="select">
              {weekdays.map(day => <option key={day} value={day}>
                  {day}
                </option>)}
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

export default AddWeeklySpecialForm;