import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render() {
        const { id, author, optionOne, optionTwo, answered } = this.props
        return (
            <div>
                <h3>{author} asked: </h3>
                <div>Would you Rather?</div>
                <div>{optionOne}</div>
                <div>or:</div>
                <div>{optionTwo}</div>
                
                <Link to={`/questions/${id}`} className='question'>
                    <button>
                    {answered 
                        ? <span>View Poll</span>
                        : <span>Answer Poll</span>
                    }
                    </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, {id}) {
    const question = questions[id]
    const user = users[authedUser]
    const author = users[question.author].name
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const answers = user ? Object.keys(user.answers) : []
    const answered = answers.includes(id)

    return {
        author,
        optionOne,
        optionTwo,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(Question))
