import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { Link, browserHistory } from "react-router";
import { Meteor } from 'meteor/meteor';
import React from "react";


export class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ""
    }
  }


  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Enter your email address" />
            <input type="password" ref="password" name="password" placeholder="Enter a password" />
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    let email = this.refs.email.value.trim()
    ,   password = this.refs.password.value.trim()
    ;

    this.props.loginWithPassword(email, password, (err) => {
      if (!err) {
        console.log("Signed in:", email);
        this.setState({ error: "" });
        browserHistory.push("/dashboard");

      } else {
        const message = err.reason || "Unable to log in. Check email and password.";
        console.log(message);
        this.setState({ error: message });
      }
    })
  }  
}


Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};


export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login);
