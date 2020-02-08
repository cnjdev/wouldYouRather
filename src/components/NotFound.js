import React, { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {
    render () {
        return (
            <div className='panel'>
                <h3>Page Not Found.</h3>
            </div>
        )
    }
}

export default connect()(NotFound)