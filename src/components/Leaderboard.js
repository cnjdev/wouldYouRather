import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const {users} = this.props
      
        return (
            <table>
            <thead>
                <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Questions</th>
                    <th>Answers</th>
                    <th>Score</th>
                </tr>
            </thead>   
            <tbody>
            {users.map((user) => (<tr>
                <td></td>
                <td>{user.name}</td>
                <td>{user.questions.length}</td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length + Object.keys(user.answers).length}</td>
            </tr>))}
            </tbody>
            </table>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    let userScore = user =>
        Object.keys(user.answers).length + user.questions.length
       
    return {
        users: Object.values(users).sort(
            (a,b) => userScore(b) - userScore(a)),
        authedUser        
    }
}

export default connect(mapStateToProps)(Leaderboard) 