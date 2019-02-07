import React, { Component } from "react";

class Home extends Component {  
  
  render() {
    
    return <div className="home text-center">        
        <p>Hi {this.props.user.displayName}!<br /> Where should we eat?</p>
      </div>;
  }
}
export default Home;
