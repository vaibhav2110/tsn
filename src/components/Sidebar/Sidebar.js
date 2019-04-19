import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../../actions/auth";
import "./Sidebar.css";
import { Icon, Tooltip, Popover, Button } from "antd";
import { Link } from "react-router-dom";
import history from "../../history";
import { BASE_URL } from "../../common/types";

class Sidebar extends Component {
  onLogOut = () => {
    this.props.logOut();
    history.push("/login");
  };
  renderProfilePic = () => {
    if (!this.props.profile) {
      return (
        <Icon
          type="user"
          style={{
            color: this.props.sidebarColor || "#ef5230",
            fontSize: "1.5em"
          }}
        />
      );
    } else if (
      this.props.profile && this.props.profile.profile && 
      this.props.profile.profile.active_profile_pic
    ) {
      if(this.props.profile.profile.active_profile_pic.charAt(0) === 'h'){
        return (
          <img
            alt="profile"
            src={this.props.profile.profile.active_profile_pic}
          />
        );
      }
      else{
        return (
          <img
            alt="profile"
            src={`${BASE_URL}${this.props.profile.profile.active_profile_pic.slice(
              1
            )}`}
          />
        );
      }
      
    }
    return (
      <Icon
        type="user"
        style={{
          color: this.props.sidebarColor || "#ef5230",
          fontSize: "1.5em"
        }}
      />
    );
  };
  render() {
    const content = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          style={{ marginBottom: "10px" }}
          type="primary"
          onClick={this.onLogOut}
        >
          Log Out
        </Button>
        <Link to={`/profile/${this.props.userId}`}>
          <Button style={{ width: "100%" }} type="primary">
            View Profile
          </Button>
        </Link>
      </div>
    );
    return (
      <div
        className="sidebar"
        style={{ borderRightColor: this.props.sidebarColor }}
      >
        <div className="middle-icons">{this.props.children}</div>
        <div className="bottom-icons">
          <Tooltip placement="right" title={"Write a new article..!"}>
            <div
              className="sidebar-create-button sidebar-icon"
              style={{ borderColor: this.props.sidebarColor }}
            >
              <Link to={`/create_article/`}>
                <Icon
                  type="highlight"
                  style={{
                    color: this.props.sidebarColor || "#ef5230",
                    fontSize: "1.5em"
                  }}
                />
              </Link>
            </div>
          </Tooltip>
          <Popover placement="topRight" title={"Profile"} trigger="click" content={content}>
            <div
              className="sidebar-current-user sidebar-icon"
              style={{ borderColor: this.props.sidebarColor }}
            >
              {this.renderProfilePic()}
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Sidebar);
