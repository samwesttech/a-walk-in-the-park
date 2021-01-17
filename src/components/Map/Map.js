import React, {Component} from "react";
import './Map.css';
import {GoogleApiWrapper} from 'google-maps-react';
import Key from "../../ignorethisfile";

const mapStyles = {
  // position: "relative",
  width: "100%",
  height: "100%",
};

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: [],
  };
 
  componentDidMount(){
    const {google, centerLatitude, centerLongitude} = this.props;
    const center = new google.maps.LatLng(centerLatitude, centerLongitude);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 13,
      });
    const request = {
      location:center,
      radius: '2000',
      type: ['park'],
      };

    const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({places: results}, () => {
            this.state.places.forEach((place) => {
              createMarker(place)
            })
          })
          }
      });
    
    function createMarker(place) {
      const infowindow = new google.maps.InfoWindow({
        content: (
          `<h2>${place.name}</h2>` +
          `<p>Rating: ${place.rating ? place.rating : 'no ratings'}</p>` +
          `<a target="_blank" href='http://www.google.com/search?q=${place.name}'>Search Google</a>`
          )
      });
    
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map,
        title: "Marker",
      });
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    }
}
 
  render() {
    return (<div id='map' className="map">
    </div>)
  }
}

export default GoogleApiWrapper({
  apiKey: Key,
  libraries: ['places'],
})(MapContainer);
