import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

  render () {
    const { user } = this.props

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>

          {user != null &&  
            <li>
              Hello, {user.name} <br/>
              <NavLink to='/logout'>
                Log out
              </NavLink>
            </li>
          }
        </ul>
      </nav>
    )
  }
} 

export default Nav