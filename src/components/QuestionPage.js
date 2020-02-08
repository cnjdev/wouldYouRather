import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionPage extends Component {

    answerOption1 = (e) => {
        e.preventDefault()
    
        const { id, dispatch } = this.props
        
        dispatch(handleAnswerQuestion(id, 'optionOne'))
    }

    answerOption2 = (e) => {
        e.preventDefault()

        const { id, dispatch } = this.props

        dispatch(handleAnswerQuestion(id, 'optionTwo'))
    }

    render(){
        if (this.props.notFound === true){
            return (
                <div className='panel'>
                    <h3>Question not found.</h3>
                </div>
            )
        }

        const { 
            avatarURL, author,
            optionOne, votedOne, percentOne,
            optionTwo, votedTwo, percentTwo,
            votedTotal,
            answer 
        } = this.props

        if (answer === null || answer === undefined) {
            return (
                <div className='panel'>
                    <img src={avatarURL}
                        alt={`Avatar of ${author}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <h3>{author} asked: </h3>
                        <h4>Would you Rather?</h4>
                        <button className='btn' onClick={this.answerOption1}>
                            {optionOne}
                        </button>
                        <button className='btn' onClick={this.answerOption2}>
                            {optionTwo}
                        </button>
                    </div>
                </div>
            )
        }

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
                        {answer === 'optionOne' && <b>You answered:<br/></b>}
                        {optionOne} <br/>
                        <b>{votedOne} of {votedTotal} ({percentOne}%)</b>
                    </p>

                    <p>
                        {answer === 'optionTwo' && <b>You answered:<br/></b>}
                        {optionTwo} <br/>
                        <b>{votedTwo} of {votedTotal} ({percentTwo}%)</b>
                    </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props) {
    const { id } = props.match.params
    const question = questions[id]
    const user = users[authedUser]
    const answer = user.answers[id]

    if (question) {
        const author = users[question.author].name
        const avatarURL = users[question.author].avatarURL
        const optionOne = question.optionOne.text
        const votedOne = question.optionOne.votes.length
        const optionTwo = question.optionTwo.text
        const votedTwo = question.optionTwo.votes.length
        const votedTotal = votedOne + votedTwo
        const percentOne = (votedOne / votedTotal) * 100
        const percentTwo = (votedTwo / votedTotal) * 100
        return {
            id,
            avatarURL,
            author,
            optionOne,
            votedOne,
            percentOne,
            optionTwo,
            votedTwo,
            percentTwo,
            votedTotal,
            answer
        }
    }
    else {
        return {
            notFound: true
        }
    }

}

export default connect(mapStateToProps)(QuestionPage)

