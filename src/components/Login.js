import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleLogin } from '../actions/authedUser'
import LoadingBar from "react-redux-loading"

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
                <h3>Login</h3>
                <select value={this.state.user} onChange={this.loginUser.bind(this)}>
                    <option value='none'>Select a user</option>
                    {Object.keys(users).map(userId => (
                        <option key={userId} value={userId}>{users[userId].name}</option>
                    ))}
                </select>
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