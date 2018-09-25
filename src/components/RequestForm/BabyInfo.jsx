import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Input from '../Input/Input'
import RadioGroup from '../RadioGroup/RadioGroup';
import NumberSelect from '../NumberSelect/NumberSelect';


class BabyInfo extends Component {


  handleInputChangeForBaby = name => event => {
    this.props.handleInputChangeForBaby({
      name,
      value: event.target.value,
      index: this.props.babyIndex
    })
  }


  render() {

    const {
      id,
      firstName,
      lastName,
      gender,
      birthDate,
      weightOunces,
      weightPounds,
      gestationDays,
      gestationWeeks,
      removeBaby
    } = this.props;

    return (
      <div id="babyDiv">


      <p className="section-title">Baby</p>
        
      <div className="baby-form">


        <div className="name-info">

            <Input
              required
              type="text"
              label="First Name"
              value={firstName}
              onChange={this.handleInputChangeForBaby('firstName')}
            />

            <Input
              required
              type="text"
              label="Last Name"
              value={lastName}
              onChange={this.handleInputChangeForBaby('lastName')}
            />

        </div>


        <div className="date-gender">

              <Input 
                required
                label="Birth Date"
                placeholder="mm/dd/yyyy"
                type="date"
                value={birthDate}
                onChange={this.handleInputChangeForBaby('birthDate')}
              />   
              
              <RadioGroup 
                required
                title="Gender"
                name="gender"
                id={"gender-" + id}
                onChange={this.handleInputChangeForBaby}
                data={[
                  { value: 'Girl', label: 'Girl'},
                  { value: 'Boy', label: 'Boy'}
                ]}
              />

        </div>

        <div className="gestation-weight">
          <div className="select-group">
            <p>Gestation <span className="required">*</span></p>
            <div>
              <NumberSelect
                required
                min={20}
                max={40}
                label="Weeks"
                name="gestationWeeks"
                value={gestationWeeks}
                onChange={this.handleInputChangeForBaby}
              />
              <NumberSelect 
                required
                max={6}
                label="Days"
                name="gestationDays"
                value={gestationDays}
                onChange={this.handleInputChangeForBaby}
              />
            </div>            
          </div>
          <div className="select-group">
            <p>Weight <span className="required">*</span></p>
            <div>
              <NumberSelect 
                max={6}
                label="Pounds"
                name="weightPounds"
                value={weightPounds}
                onChange={this.handleInputChangeForBaby}
              />
              <NumberSelect 
                max={15}
                label="Ounces"
                name="weightOunces"
                value={weightOunces}
                onChange={this.handleInputChangeForBaby}
              />
            </div> 
          </div>      
        </div>

        </div>
      </div>
    )
  }
}

export default BabyInfo;