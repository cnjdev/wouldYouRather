import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render () {
    const { user } = this.props

    return (
      <nav className='nav'>
        <NavLink to='/' exact activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/add' activeClassName='active'>
          New Question
        </NavLink>
        <NavLink to='/leaderboard' activeClassName='active'>
          Leaderboard
        </NavLink>
        
        {user != null &&  
          <nav className='nav-right'>
            <NavLink to='/logout'>
              Log out ({user.name})
            </NavLink>
          </nav>
        }
      </nav>
    )
  }
} 

export default Nav