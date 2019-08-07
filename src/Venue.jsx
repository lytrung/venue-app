import React, {Component} from 'react';

class Venue extends Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="card venue">
        <div className="card-body">
          <h1 className="venue-name">{this.props.name}</h1>
          <p>{this.props.address[0]}</p>
          <p>{this.props.address[1]}</p>
          <p>
            {this.props.categories.map((cat) => {
              return <span className="badge venue-type">{cat.name}</span>
            })}
          
          </p> 
        </div>
      </div>
    );
  }
}
export default Venue;
