import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const {users} = this.props
      
        return (
            <div>
                <h3 className='center'>Leader Board</h3>
                <div className='panel'>
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
                    {users.map((user) => (
                    <tr key={user.id}>
                        <td>        
                            <img src={user.avatarURL}
                                alt={`Avatar of ${user.name}`}
                                className='avatar'
                            />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.questions.length}</td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length + Object.keys(user.answers).length}</td>
                    </tr>
                    ))}
                    </tbody>

                    </table>
                </div>
            </div>
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