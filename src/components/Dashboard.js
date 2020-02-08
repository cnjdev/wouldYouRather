import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    answered: false
  }

  showAnswered(e) {
    e.preventDefault()

    this.setState({
      answered: true
    })
  } 

  showUnanswered(e) {
    e.preventDefault()

    this.setState({
      answered: false
    })
  }

  render() {
    if (! this.state.answered){
      return (
        <div>
          <h3 className='center'>Unanswered Questions</h3>
          <h4 className='center'>
            <a href='/' className='toggle' onClick={this.showAnswered.bind(this)}>
              (Show Answered Questions)
            </a>
          </h4>
          <ul className='dashboard-list'>
            {this.props.openQIds.map((id) => (
              <li key={id}>
                  <Question id={id}/>
              </li>
            ))}
          </ul>
        </div>
      )
    } 

    else {
      return (
        <div>
          <h3 className='center'>Answered Questions</h3>
          <h4 className='center'>
            <a href='/' className='toggle' onClick={this.showUnanswered.bind(this)}>
              (Show Unanswered Questions)
            </a>
          </h4>
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