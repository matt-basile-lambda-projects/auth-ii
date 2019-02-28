import React, { Component } from 'react'
import axios from 'axios'

export default class List extends Component {
        state = {
          users: [],
        };
        componentDidMount() {
          axios.get('http://localhost:5000/api/users').then(res => {
            this.setState({ users: res.data.users });
          });
        }
      
        render() {
          return (
            <>
              <h2>List of Users</h2>
              <ul>
                {this.state.users.map(u => (
                  <li key={u.id}>{u.username}</li>
                ))}
              </ul>
            </>
          );
        }
}
