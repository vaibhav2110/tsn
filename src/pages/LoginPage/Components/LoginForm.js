import React, { Component } from "react";
import { Button, Input, Alert, Icon } from "antd";
import { Field, reduxForm } from "redux-form";

class LoginForm extends Component {
  state = {
    loading: false
  };

  //Render form validation errors
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div style={{ marginLeft: "-15px", paddingTop: "10px" }}>
          <Alert message={error} type="error" showIcon />
        </div>
      );
    }
  }

  //Render error from the server side
  renderServerError(label) {
    if (this.props.errorField && label === this.props.errorField) {
      return (
        <div style={{ marginLeft: "-15px", paddingTop: "10px" }}>
          <Alert message={this.props.serverError} type="error" showIcon />
        </div>
      );
    }
  }

  //Render input fields
  renderInput = ({ input, label, meta }) => {
    const className = `form-control ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{label}</label>
        {label === "Password" ? (
          <Input size="large" {...input} type="password" />
        ) : (
          <Input size="large" {...input} className="danger" id="warning" />
        )}
        {this.renderError(meta)}
        {this.renderServerError(label)}
      </div>
    );
  };

  //Call onSubmit defined in parent class
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a
            href="https://agile-brook-48457.herokuapp.com/api/users/facebook"
            className="social facebook"
          >
            <Icon type="facebook" />
          </a>
          <a
            href="https://agile-brook-48457.herokuapp.com/api/users/google"
            className="social google"
          >
            <Icon type="google" />
          </a>
          <a
            href="https://agile-brook-48457.herokuapp.com/api/users/twitter"
            className="social twitter"
          >
            <Icon type="twitter" />
          </a>
        </div>
        <Field
          name="email"
          component={this.renderInput}
          label="Email"
          serverError={this.props.serverError}
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Password"
          serverError={this.props.serverError}
        />
        <div className="forgot" onClick={() => this.props.showModal()}>
          Forgot your password?
        </div>
        <Button htmlType="submit" size="large" loading={this.props.loading}>
          Log In
        </Button>
      </form>
    );
  }
}

//Validation function
const validate = formValues => {
  const errors = {};
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  }
  if (!formValues.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm);
