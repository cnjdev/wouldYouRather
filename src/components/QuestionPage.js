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
                <p>Question not found.</p>
            )
        }

        const { 
            author,
            optionOne, votedOne, percentOne,
            optionTwo, votedTwo, percentTwo,
            votedTotal,
            answer 
        } = this.props

        if (answer === null || answer === undefined) {
            return (
                <div>
                    <h3>{author} asked: </h3>
                    <div>Would you Rather?</div>
                    <div>
                        <button onClick={this.answerOption1}>
                            {optionOne}
                        </button>
                    </div>
                    <div>
                        <button onClick={this.answerOption2}>
                            {optionTwo}
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <h3>{author} asked: </h3>
                <div>Would you Rather?</div>

                <div>
                    {answer === 'optionOne' && <span>You answered:</span>}
                    <div>{optionOne}</div>
                    <div>{votedOne} of {votedTotal} ({percentOne}%)</div>
                </div>

                <div>
                    {answer === 'optionTwo' && <span>You answered:</span>}
                    <div>{optionTwo}</div>
                    <div>{votedTwo} of {votedTotal} ({percentTwo}%)</div>
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
        const optionOne = question.optionOne.text
        const votedOne = question.optionOne.votes.length
        const optionTwo = question.optionTwo.text
        const votedTwo = question.optionTwo.votes.length
        const votedTotal = votedOne + votedTwo
        const percentOne = (votedOne / votedTotal) * 100
        const percentTwo = (votedTwo / votedTotal) * 100
        return {
            id,
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

