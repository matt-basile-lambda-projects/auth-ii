import React, { Component } from 'react'
import axios from 'axios'
import requireAuth  from '../../auth/requiresAuth'


 class List extends Component {
        state = {
          users: [],
        };
        componentDidMount() {
          axios.get('/users').then(res => {
            this.setState({ users: res.data.users });
          });
        }
        logout = () => {
          localStorage.removeItem('jwt');

          this.props.history.push('/login');
        };
      
        render() {
          return (
            <>
              <h2>List of Users</h2>
              <ul>
                {this.state.users.map(u => (
                  <li key={u.id}>{u.username}</li>
                ))}
              </ul>
              <button onClick={this.logout}>Logout</button>
            </>
          );
        }
}

export default requireAuth(List)