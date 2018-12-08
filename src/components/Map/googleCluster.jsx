import React, { Component } from 'react';
import { connect } from 'react-redux';
//action
import { GET_MAP } from '../../redux/actions/googleMapAction'

//css
import '../../styles/googleMap.css'

const { compose, withProps, withHandlers } = require("recompose");
const mapStateToProps = state => ({
  googleMap: state.googleMap
});
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

  const MapWithAMarkerClusterer = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div className='mapContainer' />,
    }),
    withHandlers({
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
      },
    }),
    withScriptjs,
    withGoogleMap
  )

  (googleClusterMap =>
    <GoogleMap defaultZoom={4.5} defaultCenter={{ lat: 25.911047, lng: -97.491602 }}>
      <MarkerClusterer
        onClick={googleClusterMap.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >

        {googleClusterMap.markers.map(((marker, i) => (

          <Marker
            key={i}
            visible={marker.photo_id}
            position={{ lat: marker.latitude, lng: marker.longitude }}>
          </Marker>

        )
        )
        )
        }
      </MarkerClusterer>
    </GoogleMap>
  );


class Cluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: GET_MAP.LOCATION_LOADED });

  }

  render() {
    return (
      <div>
        <MapWithAMarkerClusterer markers={this.props.googleMap.googleMap} />
      </div>
    )
  }
}

<Cluster />

export default connect(mapStateToProps)(Cluster)