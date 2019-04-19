import React, { Component } from "react";
import { Input, Button, notification, message } from "antd";
import server from "../../../apis/server";

export default class ResetPassword extends Component {
  state = {
    showPasswordReset: false,
    email: "",
    password: "",
    otp: "",
    password2: "",
    loading: false
  };
  showNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };
  sendOTP = async () => {
    try {
      this.setState({ loading: true });
      const response = await server.post("/users/forgot", {
        email: this.state.email
      });
      if (response.status === 200) {
        this.setState({ showPasswordReset: true, loading: false });
        this.showNotification(
          "OTP",
          "An OTP has been sent to your email. Please enter the OTP to continue"
        );
      }
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };
  resetPassoword = async () => {
    try {
      this.setState({ loading: true });
      const response = await server.post(`/users/reset/${this.state.otp}`, {
        password: this.state.password
      });
      if (response.status === 200) {
        this.props.closeModal();
        message.success("Password updated successfully!", 5);
      }
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.showPasswordReset && (
          <div className="login-container">
            <div className="form-control" style={{ width: "100%" }}>
              <label>Enter Email</label>
              <Input
                size="large"
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
              />
            </div>
            <Button
              loading={this.state.loading}
              type="primary"
              onClick={() => this.sendOTP()}
            >
              Send OTP
            </Button>
          </div>
        )}
        {this.state.showPasswordReset && (
          <div className="login-container">
            <div className="form-control" style={{ width: "100%" }}>
              <label>Enter OTP</label>
              <Input
                size="large"
                type="password"
                value={this.state.otp}
                onChange={event => this.setState({ otp: event.target.value })}
              />
            </div>
            <div className="form-control" style={{ width: "100%" }}>
              <label>Enter new password</label>
              <Input
                size="large"
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
            <div className="form-control" style={{ width: "100%" }}>
              <label>Confirm new password</label>
              <Input
                size="large"
                type="password"
                value={this.state.password2}
                onChange={event =>
                  this.setState({ password2: event.target.value })
                }
              />
            </div>
            <Button
              loading={this.state.loading}
              disabled={this.state.password === "" || (this.state.password !== this.state.password2)}
              type="primary"
              onClick={() => this.resetPassoword()}
            >
              Reset Password
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
