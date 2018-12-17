import React, { Component } from 'react';
import './EmailFormModal.css';

import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';

class EmailFormModal extends Component {

  state = {
    tracking: '',
    note: ''
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  }


handleSubmit = () => {
this.props.onSend({
  ...this.state,
  _id: this.props.opened
})
}

  render() {
    const {
      visible,
      closeModal,
      onSend,
      nominator: {
        nominatorName,
        nominatorEmail
      }
    } = this.props;
    return (
      <Modal
        visible={visible}
      >
        <div className="EmailFormModal">

          <button className="cancelBtn" onClick={closeModal}>cancel</button>

          <div>
            <span>To:</span>
            <p>{nominatorName}</p>
            <p>{nominatorEmail}</p>
          </div>
        
          <Input 
            label="Tracking Number"
            onChange={this.handleChange('tracking')}
            value={this.state.tracking}
          />
        
          <TextArea 
            label="Message"
            onChange={this.handleChange('note')}
            value={this.state.note}
          />

          <Button 
            title="SEND"
            onClick={ this.handleSubmit }
          />
        
        </div>
      </Modal>
    )
  }
}

export default EmailFormModal;