import React, {Component} from 'react';
import Venue from './Venue.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.css';

const version = '?v=20170901';
const clientid = '&client_id=RPGUL25RSMX1OOV0ZFGA3OGD0IF5XKQB0SA4RWEC1VIHWTHF';
const clientSecret = '&client_secret=UY2ZX5BNM03Z0SIHI4CPLHI4PMAW1PS01ZLK2D2NOV14DVL4';
const key = version + clientid + clientSecret;

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      venues:[
        // {
        //   id:1,
        //   name: 'Cafe Crema',
        //   description:'Cafe near school',
        //   types:['Food','Drink']
        // },
        // {
        //   id:2,
        //   name: 'Cafe Crema',
        //   description:'Cafe near school',
        //   types:['Food','Drink']
        // }
      ],
      modalShow: true
    };
  }

  handleModalShow = () => {
    this.setState({modalShow:true})
  }
  handleModalHide = () => {
    this.setState({modalShow:false})
  }

  componentDidMount() {

    let exploreUrl = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.8446152873055,174.76662397384644';

    fetch(exploreUrl)
      .then(res => res.json())
      .then((result) => {
          return result.response.groups[0].items
      })
      .then((result) => {
        console.log(result)

        return result.map((item) => {

          var venue = {
            id: item.venue.id,
            name: item.venue.name,
            address: item.venue.location.formattedAddress,
            categories: item.venue.categories
          };
          return venue;
        })
      })
      .then((result) => {

        this.setState({
          venues:result
        })
      });
  }
  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="venues">
           {
            this.state.venues.map((venue) =>{
              var venueProps = {
                ...venue,
                key:venue.id,

              }
              console.log(venueProps);
              return <Venue {...venueProps}/>;
            })
           }
          </div> 

          <div className="venue-filters">
            
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn venue-filter active">
                <input type="radio" name="options" id="option1" autoComplete="off" checked="checked"/> Cafe
              </label>
              <label className="btn venue-filter">
                <input type="radio" name="options" id="option2" autoComplete="off"/> Food
              </label>
              <label className="btn venue-filter">
                <input type="radio" name="options" id="option3" autoComplete="off"/> Bar
              </label>
            </div>

          </div>
        </div>


        <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleModalClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

{/*        <div className="venue-popup">
            <div className="venue-popup-body row">
              <div className="col-8">
                  <h1 className="venue-name">Cafe Crema</h1>
                  <p>Cafe near school</p>
                  <p><span className="badge venue-type">Cafe</span><span className="badge venue-type">Food</span></p> 
              </div>

              <div className="col-4">
                  <img src="http://lorempixel.com/400/400/" className="img-fluid" alt="Responsive image"/>
              </div>
            </div>

        </div>*/}
      </div>
    );
  }

}


export default App;
