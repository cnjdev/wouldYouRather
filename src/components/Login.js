import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleLogin } from '../actions/authedUser'

class Login extends Component {

    state = {
        user: 'none'
    }

	loginUser(event) {
        event.preventDefault()

        const user = event.target.value    
        this.setState({ user })
        
        const { dispatch } = this.props
        if (user !== 'none')
    	    dispatch(handleLogin(user))
    }

    render() {
        const { user } = this.state
        if (user !== 'none')
            return <Redirect to='/' />

        const { users } = this.props
        return (
            <div>
                <h3 className='center'>Login</h3>
                <div className='panel'>
                    <select value={this.state.user} onChange={this.loginUser.bind(this)}>
                        <option value='none'>Select a user</option>
                        {Object.keys(users).map(userId => (
                            <option key={userId} value={userId}>{users[userId].name}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps({users}) {
    return {
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))