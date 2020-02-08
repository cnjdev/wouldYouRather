import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render() {
        const { id, avatarURL, author, optionOne, optionTwo, answered } = this.props
        return (
            <div className='panel'>
                <img src={avatarURL}
                    alt={`Avatar of ${author}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <h3>{author} asked: </h3>
                    <h4>Would you Rather?</h4>
                    <p>
                        {optionOne}<br/>
                        <b>or:</b><br/>
                        {optionTwo}
                    </p>                
                    <Link to={`/questions/${id}`} className='question'>
                        <button className='btn'>
                        {answered 
                            ? <span>View Poll</span>
                            : <span>Answer Poll</span>
                        }
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
    const question = questions[id]
    const user = users[authedUser]
    const author = users[question.author].name
    const avatarURL = users[question.author].avatarURL
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const answers = user ? Object.keys(user.answers) : []
    const answered = answers.includes(id)

    return {
        avatarURL,
        author,
        optionOne,
        optionTwo,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(Question))
