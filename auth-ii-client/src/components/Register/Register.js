import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
    state ={
        username: "matty",
        password: "pass",
        department: 'HR'
    }
    handleInputChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        const endpoint = 'http://localhost:5000/api/register';
        axios
          .post(endpoint, this.state)
          .then(res => {
            // localStorage.setItem('jwt', res.data.token);
            if(res.data){
                alert("Congrats you've been registered")
            }
            this.props.history.push('/login');
          })
          .catch(error => console.error(error));
      };
  
    render() {
    return (
        <div>
        <div className="w-full max-w-xs mx-auto">
            <form onSubmit={ev=>this.handleSubmit(ev)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center">Register</h2>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                    Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    id="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="department">
                    Department
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    name="department"
                    id="department"
                    type="text"
                    value={this.state.department}
                    onChange={this.handleInputChange}
                     />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Register
                    </button>
                </div>
            </form>
        <p className="text-center text-grey text-xs">
        ©2019 Basile Corp. All rights reserved.
        </p>
        </div>
    </div>
    )
  }
}
