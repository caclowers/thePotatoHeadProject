import React, { Component } from 'react';
import { connect } from 'react-redux';
import BabyInfo from './BabyInfo';
import AutoComplete from '../GoogleAutoComplete/AutoComplete';
import Radiobox from './Radiobox';
import './RequestForm.css';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SubmitPopup from'../../components/SubmitPopup/SubmitPopup';
import {ProgressSpinner} from 'primereact/progressspinner';

const MySwal = withReactContent(swal);

const BABY_OBJECT = {
  gender: '',
  lastName: '',
  firstName: '',
  birthDate: '',
  weightOunces: '',
  weightPounds: '',
  gestationDays: '',
  gestationWeeks: '',
}

class RequestForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      baby: [
        BABY_OBJECT
      ],
      subscription: null,
      nominatorName: '',
      nominatorEmail: '',
      contactChecked: false,
      parentName: '',
      parentEmail: '',
      personalNote: '',
      streetAddress: '',
      streetAddress2: '',
      floorNumber: '',
      roomNumber: '',
      city: '',
      state: '',
      postalcode: '',
      country: '',
      searchField: '',
      hospitalName: ''
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.error) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    const { isLoading, success } = nextProps;
    if (!isLoading && success) {
      MySwal.fire({
        html: <SubmitPopup />,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Donate',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down">Close</i>',
        cancelButtonAriaLabel: 'Thumbs down',
      }).then(function (result) {
          this.setState({
            baby: [
              BABY_OBJECT
            ],
            subscription: null,
            nominatorName: '',
            nominatorEmail: '',
            contactChecked: false,
            parentName: '',
            parentEmail: '',
            personalNote: '',
            streetAddress: '',
            streetAddress2: '',
            floorNumber: '',
            roomNumber: '',
            city: '',
            state: '',
            postalcode: '',
            country: '',
            searchField: '',
            hospitalName: ''
          });
        if (result.value) {
          window.location.href = 'https://www.thepotatoheadproject.org/donate';
        }
      })
    }
  }

  handleInputChangeForBaby = ({ index, name, value }) => {
    console.log(index, name, value);
    let babies = this.state.baby;
    babies[index][name] = value;
    this.setState({
      ...this.state,
      baby: babies
    });
  };


  addAnotherBaby = () => {
    this.setState({
      ...this.state,
      baby: [
        ...this.state.baby,
        {...BABY_OBJECT}
      ]
    });
  };


  handleClearParents = () => {
    this.setState({
      ...this.state,
      parentName: '',
      parentEmail: '',
      contactChecked: "false"
    });
  };


  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };



  handleSubmit = e => {
      e.preventDefault()
      this.props.dispatch({
        type: 'HANDLE_FORM_SUBMIT',
        payload: this.state
      });
  }


  handleSubscribe = (event) => {
    this.setState({
      ...this.state,
      subscription: !this.state.subscription
    });
  };


  removeBaby = (state, index) => {
    this.setState({
      ...this.state,
      baby: [
        this.state.baby.filter(a => a !== index)
      ]
    });
  };


  handleError() {
    return (
      <p className="error">{this.props.error}</p>
    )
  }

  fillDummyData = () => {
    this.setState({
      baby: [
        {
          firstName: 'Suzy',
          lastName: 'Black',
          birthDate: '2018-09-09',
          gender: '',
          weightOunces: '3',
          weightPounds: '2',
          gestationDays: '2',
          gestationWeeks: '22'
        }
      ],
      subscription: null,
      nominatorName: 'Dane Smith',
      nominatorEmail: 'dane@dane.com',
      floorNumber: '5',
      roomNumber: '577',
      contactChecked: false,
      parentName: 'Jack Black',
      parentEmail: 'jack@black.com',
      personalNote: 'We\'re thinking of you, let us know if you need anything!',
    });
  }



  render() {
    console.log(this.state);
    // mapping through how many times to render the babyInfoDiv

    const {
      baby,
      subscription,
      nominatorName,
      nominatorEmail,
      contactChecked,
      parentName,
      parentEmail,
      personalNote,
      streetAddress,
      streetAddress2,
      floorNumber,
      roomNumber,
      city,
      state,
      postalcode,
      country,
      searchField,
      hospitalName
    } = this.state;

    let babyArray = baby.map((item, index) => (
      <BabyInfo
        key={index}
        {...item}
        babyIndex={index}
        handleInputChangeForBaby={this.handleInputChangeForBaby}
        removeBaby={this.removeBaby}
        addAnotherBaby={this.addAnotherBaby}
      />
    ));


    return (
      <div id="requestForm">
        { this.props.error ? 
          this.handleError() :
          null
        }
        <div className="form">

          {babyArray}    
        
          <div id="nominatorDiv">

            <div>
              <p onClick={this.fillDummyData}>You</p>
            </div>

            <div>
              <Input
                type="text"
                label="Your Name"
                placeholder="Your Name"
                value={nominatorName}
                onChange={this.handleInputChangeFor('nominatorName')}
              />
              <Input
                type="text"
                label="Your Email"
                placeholder="Your Email"
                value={nominatorEmail}
                onChange={this.handleInputChangeFor('nominatorEmail')}
              />
            </div>
          </div>



          <div id="parentContactDiv">

            <div>
              <p>The Parent</p>
            </div>

            <div className="parents-form">
              
              <Input
                label="Name"
                placeholder="Mary and Dave"
                value={parentName}
                onChange={this.handleInputChangeFor('parentName')}
              />
              <Input
                label="Email"
                placeholder="mary@yahoo.com"
                value={parentEmail}
                onChange={this.handleInputChangeFor('parentEmail')}
              />
            </div>
          </div>   

          <AutoComplete
            handleInputChangeFor={this.handleInputChangeFor}
            streetAddress={streetAddress}
            streetAddress2={streetAddress2}
            floorNumber={floorNumber}
            roomNumber={roomNumber}
            city={city}
            state={state}
            postalcode={postalcode}
            country={country}
            searchField={searchField}
          />


          <div id="extrasDiv">

            <div id="notesDiv">
              <TextArea 
                name="personalNote"
                label="Personal Note"
                value={personalNote}
                onChange={this.handleInputChangeFor}

              />
            </div>

            <div id="subscribeAndSubmitDiv">
              <div id="subscribeAndCaptchaDiv">
                <div id="subscribeDiv">
                  <Input
                    type="checkbox"
                    name="subscribe"
                    value="subscribe"
                    onChange={this.handleSubscribe}
                  />
                  <label
                    htmlFor="subscribe">
                    <p className="requestFormPtag"><b>Subscribe</b> to the</p>
                    <p className="requestFormPtag">Potato Head Project newsletter</p>
                  </label>
                </div>
                <div class="g-recaptcha" data-sitekey="6Ld-fG8UAAAAAJd3wpbVbW5IlaMrs3TBHd1R8_2x"></div>
              </div>
              <div id="submitDiv">
                { this.props.isLoading ? 
                  <p>Loading...</p> :
                  <input
                    type="submit"
                    className="Button"
                    value="Submit Request"
                    onClick={this.handleSubmit}
                  />
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ form }) => ({
  isLoading: form.isLoading,
  error: form.error,
  success: form.success
});

export default connect(mapStateToProps)(RequestForm);