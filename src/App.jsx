import React, {Component} from 'react';
import Venue from './Venue.jsx';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
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
      modalShow: false,
      venue:null,
      filteredVenues:[]
    };
  }

  showModal = () => {
    this.setState({modalShow:true})
  }
  hideModal = () => {
    this.setState({modalShow:false})
  }

  loadVenue = (venueid) => {
    this.setState({
      venue:null
    })

    var venueUrl =  'https://api.foursquare.com/v2/venues/'+venueid+key;
    fetch(venueUrl)
      .then(res => res.json())
      .then(result => {
          var data = result.response.venue
          var photo = data.bestPhoto;
          var venue = {
            name: data.name,
            photo: photo.prefix+'200x200'+photo.suffix,
            address: data.location.formattedAddress,
            category: data.categories[0].name
          };
          
          this.setState({
            venue
          })
      })

  }

  loadVenues = () => {

    let exploreUrl = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll=-36.8446152873055,174.76662397384644';

    fetch(exploreUrl)
      .then(res => res.json())
      .then((result) => {
          return result.response.groups[0].items
      })
      .then((result) => {
        return result.map((item) => {

          var venue = {
            id: item.venue.id,
            name: item.venue.name,
            address: item.venue.location.formattedAddress,
            category: item.venue.categories[0].name
          };
          return venue;
        })
      })
      .then((result) => {

        this.setState({
          venues:result,
          filteredVenues:result,
        })
      });
  }

  handleVenueFilterChange = (value,e) => {

    var venues = this.state.venues;
    var filteredVenues = venues;

    console.log(value);
    if(value === 'food'){
      filteredVenues = venues.filter((venue)=>{
        var cat = venue.category;
        return cat.includes('Café') || cat.includes('Restaurant') || cat.includes('Food')
      });
    }

    if(value === 'drinks'){
      filteredVenues = venues.filter((venue)=>{
        var cat = venue.category;
        return cat.includes('Bar') || cat.includes('Lounge')
      });
    }

    if(value === 'others'){
      filteredVenues = venues.filter((venue)=>{
        var cat = venue.category;
        return !(cat.includes('Café') || cat.includes('Bar') || cat.includes('Lounge') ||cat.includes('Restaurant') || cat.includes('Food'))
      });
    }

    console.log(filteredVenues);
    this.setState({
      filteredVenues
    })
  }
  componentDidMount(){
    this.loadVenues();
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="venues">
           {
            this.state.filteredVenues.map( (venue)=>{
              var venueProps = {
                ...venue,
                key:venue.id,
                showModal: this.showModal,
                loadVenue: this.loadVenue
              }
           
              return <Venue {...venueProps}/>;
            })
           }
          </div> 

          <div className="venue-filters">
              <ToggleButtonGroup type="radio" name="venue-filter" onChange={this.handleVenueFilterChange} defaultValue="all">
                <ToggleButton className="venue-filter" value="all">All</ToggleButton>
                <ToggleButton className="venue-filter" value="food">Food</ToggleButton>
                <ToggleButton className="venue-filter" value="drinks">Drinks</ToggleButton>
                <ToggleButton className="venue-filter" value="others">Others</ToggleButton>
              </ToggleButtonGroup>
          </div>
        </div>


        <Modal show={this.state.modalShow} onHide={ (e)=>{this.hideModal()} }>
          <Modal.Body>
            { this.state.venue !== null ? (<div className="venue-popup-body row">
              <div className="col-6">
                <h1 className="venue-name">{this.state.venue.name}</h1>
                <p>{this.state.venue.address[0]}</p>
                <p>{this.state.venue.address[1]}</p>
                <p><span className="badge venue-type">{this.state.venue.category}</span></p>
              </div>

              <div className="col-6">
                  <img src={this.state.venue.photo} className="img-fluid" alt="Responsive image"/>
              </div>
            </div>) : 'Loading...'}
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}


export default App;
