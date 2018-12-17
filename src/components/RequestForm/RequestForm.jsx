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
import SubmitPopup from '../../components/SubmitPopup/SubmitPopup';
import { ProgressSpinner } from 'primereact/progressspinner';
import Button from '../Button/Button'

const MySwal = withReactContent(swal);

const BABY_OBJECT = {
  id: 1,
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

    this.numBabies = 1;

    this.state = {
      baby: [
        BABY_OBJECT
      ],
      subscription: false,
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
      console.log('SCROLLL TO TOP', nextProps.error)
      window.parent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    const { isLoading, success } = nextProps;
    if (!isLoading && success) {
      MySwal.fire({
        html: <SubmitPopup />,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> OK',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down">Close</i>',
        cancelButtonAriaLabel: 'Thumbs down',
      }).then(function (result) {
          this.setState({
            baby: [
              {...BABY_OBJECT}
            ],
            subscription: '',
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
          }).bind(this);
        if (result.value) {
          window.top.location.href = 'https://www.thepotatoheadproject.org/donate';
        }
      })
    }
  }

  handleInputChangeForBaby = ({ index, name, value }) => {
    let babies = this.state.baby;
    babies[index][name] = value;
    this.setState({
      ...this.state,
      baby: babies
    });
  };


  addAnotherBaby = () => {
    this.numBabies += 1;
    this.setState({
      ...this.state,
      baby: [
        ...this.state.baby,
        {
          ...BABY_OBJECT,
          id: this.numBabies
        }
      ]
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


  removeBaby = id => {
    if (this.numBabies > 1) {
      this.numBabies -= 1;
      const newArr = this.state.baby.filter(b => b.id !== id)

      this.setState({
        ...this.state,
        baby: newArr
      });
    }
  };


  handleError() {
    return (
      <div className="error">
        <p>{this.props.error}</p>
      </div>
    )
  }

  render() {
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
        {this.props.error ?
          this.handleError() :
          null
        }



        <div className="form">
          <span className="required" style={{ alignSelf: 'flex-end' }}>* required</span>
          {babyArray}  
          
          <div id="addRemoveDiv">
            {this.numBabies < 3 &&
              <Button
                onClick={this.addAnotherBaby}
                title={
                  this.numBabies === 1 ? 'Twins?' :
                    'Triplets?'
                }
              />
            }
            {
              this.numBabies > 1 &&
              <Button
                title="Undo"
                onClick={() => this.removeBaby(this.numBabies)}
              />
            }
          </div>

          <div id="nominatorDiv">

            <p className="section-title">You</p>

            <div>
              <Input
                required
                type="text"
                label="Your Name"
                value={nominatorName}
                onChange={this.handleInputChangeFor('nominatorName')}
              />
              <Input
                required
                type="text"
                label="Your Email"
                value={nominatorEmail}
                onChange={this.handleInputChangeFor('nominatorEmail')}
              />
            </div>
          </div>



          <div id="parentContactDiv">

            <p className="section-title">The Parents</p>

            <div className="parents-form">

              <Input
                required
                label="Parent's Name"
                value={parentName}
                onChange={this.handleInputChangeFor('parentName')}
              />
              <Input
                required
                label="Parent's Email"
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




          <div id="notesDiv">
            <p className="section-title">Personal Note</p>
            <div>
              <TextArea
                name="personalNote"
                placeholder="Add your personal note here"
                value={personalNote}
                onChange={this.handleInputChangeFor('personalNote')}
              />
            </div>
          </div>

          <div id="subscribeAndSubmitDiv">

            <div>
              <input
                type="checkbox"
                name="subscribe"
                value={subscription}
                onChange={this.handleSubscribe}
              />
              <label
                htmlFor="subscribe"
              >
                <p>Subscribe to the Potato Head Project newsletter</p>
              </label>

            </div>

            <div className="g-recaptcha" data-sitekey="6Ld-fG8UAAAAAJd3wpbVbW5IlaMrs3TBHd1R8_2x"></div>


            <div id="submitDiv">
              {this.props.isLoading ?
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
    )
  }
}

const mapStateToProps = ({ form }) => ({
  isLoading: form.isLoading,
  error: form.error,
  success: form.success
});

export default connect(mapStateToProps)(RequestForm);