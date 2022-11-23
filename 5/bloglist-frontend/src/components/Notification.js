import React from 'react'

const Notification = ({message, errorMessage}) => {

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

    if (message === null && errorMessage === null) {
        return null
    }

    else if (message !== null && errorMessage===null) {
    return (
        <div style={messageStyle}>
            <h2>{message}</h2>
        </div>
    )
    }
    else if (errorMessage !== null && message === null) {
        return (
            <div style={errorMessageStyle}>
                <h2>{errorMessage}</h2>
            </div>
        )
    }
}

export default Notification