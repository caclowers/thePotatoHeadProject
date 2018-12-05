import React, { Component } from 'react';
import './Request.css';

import Button from '../Button/Button';

const RequestDetail = ({ title, children }) => (
  <div className="RequestDetail">
    { title && <p className="request-detail-header">{title}</p> }
    { children }
  </div>
)

class Request extends Component {
  
  state = { open: false }

  renderRequestDetails() {
    const {
      baby,
      streetAddress,
      streetAddress2,
      city,
      state,
      postalcode,
      hospitalVerified,
      subscription,
      nominatorEmail,
      parentEmail,
      showEmailForm,
      showNotes,
      markedSent,
      toggleMarkedSent,
      opened,
      floorNumber,
      roomNumber
    } = this.props;
    if (!opened) return null;
    return (
      <div className="request-sub-menu">
        <div className="request-details">

          <div>
            { baby.map((b, i) => (
              <div key={i}>

                <RequestDetail title="DOB">
                  <p className="request-detail-data">{b.birthDate}</p>
                </RequestDetail>  

                <RequestDetail title="Gender">
                  <p className="request-detail-data">{b.gender}</p>
                </RequestDetail> 

                <RequestDetail title="Gestation">
                  <p className="request-detail-data">{`${b.gestationWeeks} weeks`}</p>
                  { b.gestationDays > 0 && <p className="request-detail-data">{`${b.gestationDays} days`}</p> }
                </RequestDetail>

              
                <RequestDetail title="Weight">
                  <p className="request-detail-data">{`${b.weightPounds} pounds`}</p>
                  { b.weightOunces > 0 && <p className="request-detail-data">{`${b.weightOunces} ounces`}</p> }
                </RequestDetail>

              </div>
            )) }
          </div> 


          <div>
            <RequestDetail title="Email">
              <p className="request-detail-data">{nominatorEmail}</p>
            </RequestDetail>

            <RequestDetail title="Subscribed">
              <p className="request-detail-data">{subscription ? 'Yes' : 'No'}</p>
            </RequestDetail>
          </div>  

          <div>
            <RequestDetail title="Email">
              <p className="request-detail-data">{parentEmail}</p>
            </RequestDetail>
          </div>
            

          <div>
            <RequestDetail title="Address">
              <p className="request-detail-data">{streetAddress}</p>
              { streetAddress2 && <p className="request-detail-data">{streetAddress2}</p> }
              <p className="request-detail-data">{`${city}, ${state} ${postalcode}`}</p>
              { floorNumber && <p className="request-detail-data">{`Floor: ${floorNumber}`}</p>}
              { roomNumber && <p className="request-detail-data">{`Room: ${roomNumber}`}</p>}
            </RequestDetail>
            <RequestDetail title="Verified">
              <p className="request-detail-data">{hospitalVerified ? 'Yes' : 'No'}</p>
            </RequestDetail>
          </div> 

        </div>


        <div className="request-toolbar">
            <Button title="Show Notes" onClick={showNotes}/>
            <Button title="Send Email" onClick={showEmailForm}/>
            <Button title="Print Shipping Label" onClick={() => {
              window.open('https://www.paypal.com/shiplabel/create/', '_blank');
            }}/>
            <Button 
              title={markedSent ? 'Mark Unsent' : ' Mark Sent'} 
              onClick={toggleMarkedSent}
              style={ markedSent ? { backgroundColor: '#c3e1e1' } : {} } 
            />

        </div>  

        
        
      </div> 
    )
  }

  render() {
    const {
      baby,
      nominatorName,
      parentName,
      hospitalName,
      markedSent
    } = this.props;
    return (
        <div
          className="Request"
          onClick={this.props.openRequest}
        >
          <div 
            className="request-header"
            style={ markedSent ? { backgroundColor: '#c3e1e1' } : {} }
          >

              <div>
                {
                  baby.map((b, i) => (
                    i === 0 ? 
                      <p key={i}>{b.firstName}</p> :
                      <p key={i} style={{ marginLeft: '6px' }}> {`and ${b.firstName}`}</p>
                  ))
                }
                
              </div>

              <div>
                <p>{nominatorName}</p>
              </div>

              <div>
                <p>{parentName}</p>
              </div>

              <div>
                <p>{hospitalName}</p>
              </div>
  
          </div>

          { this.renderRequestDetails() }

        </div>
    )
  }
}

export default Request;