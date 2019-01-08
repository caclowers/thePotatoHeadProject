import React from 'react';
import Script from 'react-load-script';
import Input from '../Input/Input';
import './AutoComplete.css';
// import { thisExpression } from 'babel-types';
// import '../../styles/google.css'

// var clone = require('clone');

export default class GoogleAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      scriptError: false,
      scriptLoaded: false,
      labels: {
        streetAddress: "Street Address 1",
        streetAddress2: "Street Address 2",
        floorNumber: "Floor Number",
        roomNumber: "Room Number",
        city: "City",
        postalcode: "Postal / Zip Code",
        state: "State / Province",
        country: "Country",
        searchField: "Hospital Name",
      },
      showResult: false,
    };
    this.handleMapChange = this.handleMapChange.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.scriptLoaded !== nextState.scriptLoaded) && (this.autocomplete === null)) {
      this.autocomplete = new window.google.maps.places.Autocomplete((this.searchInput));
      this.autocomplete.addListener('place_changed', this.handleMapChange);
    }
    return true;
  }


  renderFields() {
    return Object.keys(this.props.fields).map((key, i) => {

      let required = true;
      switch(key){
        case 'streetAddress2':
        // case 'floorNumber':
        // case 'roomNumber':
          required = false;
          break;
      }

      return (

        <div id="autoCompleteDiv2" key={i} className={`address-field address-${key}`}>

          <Input
            required={required}
            type="text"
            label={this.state.labels[key]}
            className="hospAddInputs"
            id="this"
            onChange={this.props.handleInputChangeFor(key)}
            value={this.props[key]}
          />
        </div>
      )
    }
    )
  }


  handleSearchClear(searchText) {
    if (searchText.target.type === "search") {
      if (searchText.target.value === "") {
        const { fieldsForState } = this.state;
        if (fieldsForState) {
          Object.keys(fieldsForState).map((key, i) => {
            fieldsForState[key] = "";
            key = { i }
          })
          this.setState({ fieldsForState });
        }
      }
    }
  }

  handleMapChange() {
    this.place = this.autocomplete.getPlace();
    this.props.callbackFunction(this.place);
    const fieldsForState = { ...this.state.fieldsForState };
    if (this.place.address_components) {
      this.props.handleInputChangeFor('hospitalName')({ target: { value: this.place.name } });
      const addrComps = this.place.address_components;
      var matchForStreet1 = this.place.adr_address ? this.place.adr_address.match(/<span class="street-address">(.*?)<\/span>/) : false;
      if (matchForStreet1 && matchForStreet1[1]) fieldsForState.streetAddress = matchForStreet1[1];
      const { fields } = this.props;
      Object.keys(addrComps).map((index, i) => {

        const addrType = addrComps[index].types[0];
        switch (addrType) {

          case fields.city: fieldsForState.city = addrComps[index].long_name;
            break;

          case fields.state: fieldsForState.state = addrComps[index].long_name;
            break;

          case fields.country: fieldsForState.country = addrComps[index].long_name;
            break;

          case fields.postalcode: fieldsForState.postalcode = addrComps[index].long_name;
            break;
          default:
        }
      });

      Object.keys(fieldsForState).forEach(field => {
        const event = {
          target: {
            value: fieldsForState[field]
          }
        }
        this.props.handleInputChangeFor(field)(event);
      })

      this.setState({ showResult: true });
    }
    else {
    }
  }


  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }


  handleScriptError() {
    this.setState({ scriptError: true })
  }


  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }



  render() {
    const { scriptLoaded } = this.state;
    const { id } = this.props;
    return (
      [!scriptLoaded && <Script
        url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M&libraries=places`}
        onCreate={this.handleScriptCreate.bind(this)}
        onError={this.handleScriptError.bind(this)}
        onLoad={this.handleScriptLoad.bind(this)}
      />,
      <div id="autoCompleteDiv">

      <p className="section-title">Hospital</p>

        <div  className={`address ${this.state.showResult ? "showFields" : ""}`}>
          <div className="addressInput">
            <Input
              required
              type="search"
              label="Hospital Name"
              className="hospitalInput"
              id={id}
              onChange={this.props.handleInputChangeFor('hospitalName')}
              childRef={ele => {
                this.searchInput = ele;
                (ele || {}).onsearch = this.handleSearchClear
              }}
            />
          </div>
          <div className="addressFields">
            {this.renderFields()}
          </div>
        </div>
      </div>

      ]
    )
  }
}
GoogleAutoComplete.defaultProps = {
  fields: {
    streetAddress: "route",
    streetAddress2: "administrative_level_4",
    city: "locality",
    state: "administrative_area_level_1",
    postalcode: "postal_code",
    country: "country",
    floorNumber: "Floor #",
    roomNumber: "Room #",
  },
  callbackFunction: f => f
}