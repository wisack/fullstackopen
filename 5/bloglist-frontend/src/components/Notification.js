import React from 'react'

const Notification = ({ message, errorMessage }) => {

  const messageStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20
  }

  const errorMessageStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 20
  }

  if (message !== null && errorMessage===null) {
    return (
      <div style={messageStyle} id='success-message'>
        <h2>{message}</h2>
      </div>
    )
  }
  else if (errorMessage !== null && message === null) {
    return (
      <div style={errorMessageStyle} id='error-message'>
        <h2>{errorMessage}</h2>
      </div>
    )
  }
}

export default Notification