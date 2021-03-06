import React, { Component } from 'react';
import { connect } from 'react-redux';

///Google map
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

//action
import { GET_MAP } from '../../redux/actions/googleMapAction'

//css
import '../../styles/googleMap.css'

const mapStateToProps = state => ({
    googleMap: state.googleMap
});

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false,
            latLng: {
                lat: 38.964748,
                lng: -94.579535,
            },
            zoom: 4.3,
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: GET_MAP.GET });
    }

    onMarkerClick = ( marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
        });
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }

    render() {
        const mapLocation = this.props.googleMap.googleMap
        let mapMarker = mapLocation.map(((location,i) => {
            return (
                <Marker
                    key={i}
                    visible={true}
                    onClick={this.onMarkerClick}
                    position={{ lng: location.longitude, lat: location.latitude }}>
                </Marker>
            )
        }))
        return (
            <div className="mapContainer">
                <Map
                    onClick={this.onMapClick}
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                >
                    {mapMarker}
                    <InfoWindow

                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <p>Testing, This will take hospital information.
                            For now it's just text
                             </p>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M')
})(MapContainer)

export default (connect(mapStateToProps)(connectToGoogleMaps))