import React, {Component} from 'react';

class Venue extends Component{
  constructor(props){
    super(props)
  }
  handleVenueNameClick = () => {
    this.props.showModal();
    this.props.loadVenue(this.props.id);
  }

  render() {
    return (
      <div className="card venue">
        <div className="card-body">
          <h1 className="venue-name" onClick={this.handleVenueNameClick}>{this.props.name}</h1>
          <p>{this.props.address[0]}</p>
          <p>{this.props.address[1]}</p>
          <p><span className="badge venue-type">{this.props.category}</span></p>
        </div>
      </div>
    );
  }
}
export default Venue;
