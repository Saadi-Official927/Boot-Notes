import React from 'react'

function Alert(props) {

    return (
        <div className='App d-block text-center'  >
            {props.alert && <div className={`alert alert-danger alert-dismissible fade show my-2`} role="alert">
                <strong> {props.alert.type} </strong> {props.alert.message}
            </div>
            }
        </div>
    )
}

export default Alert