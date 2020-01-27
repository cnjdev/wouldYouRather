import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Login from './Login'
import Logout from './Logout'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav user={this.props.user} />

            {this.props.loading === true
              ? null
              : (this.props.user === null
                ? <div>
                    <Route path='/' component={Login} />
                  </div>
                : <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/logout' exact component={Logout} />
                  </div> 
              )
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({users, authedUser }) {
  return {
    loading: false,
    user: authedUser ? users[authedUser] : null
  }
}

export default connect(mapStateToProps)(App)
