import React, { Component } from "react";
import { connect } from "react-redux";
import "./Profile.css";
import ProfileForm from "./Components/ProfileForm";
import { createProfile } from "../../actions/profile";
import { message } from "antd";
import history from "../../history";

class Profile extends Component {
  componentDidUpdate() {
    //Check if profile gets created successfully
    if (this.props.profileId) {
      message.success("Profile created successfully!", 5);
      history.push("/");
    }
  }
  //Call create Profile action creator
  onCreateProfile = formValues => {
    this.props.createProfile(this.props.token, formValues);
  };
  render() {
    return (
      <div className="create-profile-container">
        <div className="create-profile-form">
          <ProfileForm
            loading={this.props.loading}
            onSubmit={this.onCreateProfile}
          />
        </div>
        <div className="create-profile-overlay">
          <h4>Enter your personal details to get started</h4>
          <img
            className="create-profile-overlay-img"
            alt="Welcome"
            src={require("../../images/welcome.jpg")}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.profile.loading,
    profileId: state.profile.profileId
  };
};

export default connect(
  mapStateToProps,
  { createProfile }
)(Profile);
