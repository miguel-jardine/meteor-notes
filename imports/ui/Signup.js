import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { Link, browserHistory } from "react-router";
import { Meteor } from 'meteor/meteor';
import React from "react";


export class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ""
    }
  }


  onSubmit (e) {
    e.preventDefault();
    let email = this.refs.email.value.trim()
    ,   password = this.refs.password.value.trim()
    ;

    if (password.length < 9) {
      this.setState({
        error: "Password length must be greater than 8 characters."
      });

      return true;
    }
    
    this.props.createUser({email, password}, (err) => {
      if (!err) {
        console.log("Account created:", email);
        this.setState({ error: "" });
        browserHistory.push("/dashboard");

      } else {
        console.log("Account not created.",err);
        console.log(email, password);
        this.setState({ error: err.reason });
      }
    })
  }


  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign up</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Enter your email address" />
            <input type="password" ref="password" name="password" placeholder="Enter a password" />
            <button className="button">Create Account</button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
}


Signup.propTypes = {
  createUser: React.PropTypes.func.isRequired
};


export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  }
}, Signup);
