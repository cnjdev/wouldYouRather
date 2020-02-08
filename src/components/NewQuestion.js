import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleOpt1Change = (e) => {
        const text = e.target.value
    
        this.setState(() => ({
            optionOne: text
        }))
    }

    handleOpt2Change = (e) => {
        const text = e.target.value

        this.setState(() => ({
            optionTwo: text
        }))
    }

    handleSubmit = (e) => {
      e.preventDefault()
  
      const { optionOne, optionTwo } = this.state
      const { dispatch } = this.props
  
      console.log('Would You Rather ', optionOne, '? Or ', optionTwo, '?')
      dispatch(handleAddQuestion(optionOne, optionTwo))
  
      this.setState(() => ({
          optionOne: '',
          optionTwo: '',
          toHome: true,
      }))
    }

    render() {
      const { optionOne, optionTwo, toHome } = this.state
  
      if (toHome === true) {
          return <Redirect to='/' />
      }
  
      return (
        <div>
          <h3 className='center'>Would you Rather?</h3>
          <div className='panel'>
            <form className='new-question' onSubmit={this.handleSubmit}>
              <textarea
                placeholder="Enter option 1"
                value={optionOne}
                onChange={this.handleOpt1Change}
                className='textarea'
                maxLength={280}
              />

              <div>
              or?
              </div>

              <textarea
                placeholder="Enter option 2"
                value={optionTwo}
                onChange={this.handleOpt2Change}
                className='textarea'
                maxLength={280}
              />

              <button
                className='btn'
                type='submit'
                disabled={optionOne === '' || optionTwo === ''}>
                  Submit
              </button>
            </form>
          </div>
        </div>
      )
    }
  }
  
  export default connect()(NewQuestion) 