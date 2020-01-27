import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Unanswered Questions</h3>
        <ul className='dashboard-list'>
          {this.props.openQIds.map((id) => (
            <li key={id}>
                <Question id={id}/>
            </li>
          ))}
        </ul>

        <h3 className='center'>Answered Questions</h3>
        <ul className='dashboard-list'>
          {this.props.answerQIds.map((id) => (
            <li key={id}>
                <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users, questions, authedUser }) {
  const user = users[authedUser]
  let answerQIds = user ? Object.keys(user.answers) : []
  let openQIds = Object.keys(questions).filter(
    (qId) => !answerQIds.includes(qId)
  )
  return {
    openQIds: openQIds.sort((a,b) => 
      questions[b].timestamp - questions[a].timestamp
    ),
    answerQIds: answerQIds.sort((a,b) => 
      questions[b].timestamp - questions[a].timestamp
    )
  }
}

export default connect(mapStateToProps)(Dashboard) 