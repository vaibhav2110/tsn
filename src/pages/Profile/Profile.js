import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../common/types';
import {
  getUserProfile,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
  editProfile,
  changePic
} from "../../actions/profile";
import { getUserArticles } from "../../actions/article";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
import {
  Button,
  Icon,
  Empty,
  Drawer,
  Upload,
  message,
  Menu,
  Dropdown,
  Typography,
  Modal
} from "antd";
import LoadingBar from "react-redux-loading-bar";
import Unsplash from "../CreateArticle/Components/TextEditor/Unsplash";
import ProfileForm from "../CreateProfile/Components/ProfileForm";

const { Paragraph } = Typography;

class Profile extends Component {
  state = {
    showArticles: true,
    showFollowers: false,
    showFollowings: false,
    showCoverPicUpload: false,
    showModal: false
  };

  //Call get userprofile and get userarticles action creator
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUserProfile(id);
    this.props.getUserArticles(id);
  }

  //If loading changes from true to false, close modal
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.match.params !== this.props.match.params) {
      const { id } = this.props.match.params;
      this.props.getUserProfile(id);
      this.props.getUserArticles(id);
    }
    if (prevProps.loading && !this.props.loading) {
      this.handleCancel();
      message.success("Profile updated successfully");
    }
  }

  //Show side drawer
  showDrawer = () => {
    this.setState({
      showCoverPicUpload: true
    });
  };

  //Close side drawer
  onClose = () => {
    this.setState({
      showCoverPicUpload: false
    });
  };

  //show modal
  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  //on modal close
  handleCancel = () => {
    this.setState({ showModal: false });
  };

  //Check which tab is selected
  renderSelectedContent() {
    if (this.state.showArticles) {
      return this.renderUserArticles();
    }
    if (this.state.showFollowers) {
      return <div className="users-list">{this.renderUserFollowers()}</div>;
    }
    if (this.state.showFollowings) {
      return <div className="users-list">{this.renderUserFollowings()}</div>;
    }
  }

  //show user articles
  renderUserArticles() {
    return this.props.articles.map(article => {
      return (
        <div key={article._id} className="profile-article-card">
          <Link to={`/article/${article._id}`}>
            <div className="profile-article-card-top">
              <div className="profile-article-card-image">
                <img alt="profile" src={article.featured_image} />
              </div>
            </div>
            <div className="profile-article-card-bottom">
              <h4>{article.title}</h4>
              <Paragraph
                ellipsis={{ rows: 3 }}
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: "0.8em",
                  opacity: 0.8
                }}
              >
                {article.subtitle}
              </Paragraph>
              <div className="views">
                <Icon style={{ color: "white" }} type="eye" />
                <h6>{article.views}</h6>
              </div>
              {/* <p>10 min read</p> */}
            </div>
            <div className="comment-stats">
              <div className="likes">
                <Icon
                  type="like"
                  style={{ color: "#3AB19B", fontSize: "1.5em" }}
                />
                <p>{article.upvotes}</p>
              </div>
              <div className="dislikes">
                <Icon
                  type="dislike"
                  style={{ color: "#F34623", fontSize: "1.5em" }}
                />
                <p>{article.downvotes}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

  //render list of user followers
  renderUserFollowers() {
    if (!this.props.followers) {
      this.props.getUserFollowers(this.props.match.params.id);
    } else if (this.props.followers.length === 0) {
      return (
        <Empty
          description={
            <span style={{ color: "white", fontFamily: "Poppins" }}>
              No followers
            </span>
          }
        />
      );
    } else {
      return this.props.followers.map(follower => {
        return (
          <Link to={`/profile/${follower._id}`}>
            <div className="users-list-item">
              <div className="user-avatar">
                {!follower.active_profile_pic && (
                  <img
                    alt="profile"
                    src={require("../../images/profile.svg")}
                  />
                )}
                {follower.active_profile_pic &&
                  follower.active_profile_pic.charAt(0) !== "h" && (
                    <img
                      alt="profile"
                      src={`${BASE_URL}${follower.active_profile_pic.slice(
                        1
                      )}`}
                    />
                  )}
                {follower.active_profile_pic &&
                  follower.active_profile_pic.charAt(0) === "h" && (
                    <img alt="profile" src={follower.active_profile_pic} />
                  )}
              </div>
              <div className="user-username">
                <p>{follower.username}</p>
              </div>
            </div>
          </Link>
        );
      });
    }
  }

  //render list of user followings
  renderUserFollowings() {
    if (!this.props.followings) {
      this.props.getUserFollowings(this.props.match.params.id);
    } else if (this.props.followings.length === 0) {
      return (
        <Empty
          description={
            <span style={{ color: "white", fontFamily: "Poppins" }}>
              No followings
            </span>
          }
        />
      );
    } else {
      return this.props.followings.map(following => {
        return (
          <Link to={`/profile/${following._id}`}>
            <div className="users-list-item">
              <div className="user-avatar">
                {!following.active_profile_pic && (
                  <img
                    alt="profile"
                    src={require("../../images/profile.svg")}
                  />
                )}
                {following.active_profile_pic &&
                  following.active_profile_pic.charAt(0) !== "h" && (
                    <img
                      alt="profile"
                      src={`${BASE_URL}${following.active_profile_pic.slice(
                        1
                      )}`}
                    />
                  )}
                {following.active_profile_pic &&
                  following.active_profile_pic.charAt(0) === "h" && (
                    <img alt="profile" src={following.active_profile_pic} />
                  )}
              </div>
              <div className="user-username">
                <p>{following.username}</p>
              </div>
            </div>
          </Link>
        );
      });
    }
  }

  //Check if the profile is of the user that is logged in or of a different user
  //And based on the result render follow button
  renderActionButton() {
    const { id } = this.props.match.params;
    const { activity, token, userId, profile } = this.props;
    if (!activity || profile.user_id === userId) {
      return;
    }
    if (activity.followings.includes(id)) {
      return (
        <Button
          className="follow-btn"
          loading={this.props.unfollowing}
          onClick={() => this.props.unfollowUser(id, token)}
        >
          <Icon type="check" />
          Following
        </Button>
      );
    }
    return (
      <Button
        className="follow-btn"
        loading={this.props.following}
        onClick={() => this.props.followUser(id, token)}
      >
        Follow
      </Button>
    );
  }

  //call editprofile action creator
  setCoverPic = url => {
    this.props.editProfile(this.props.token, { cover_pic: url });
  };

  //changing cover pic properties
  renderChangeCoverPicBtn = () => {
    //upload options
    const coverPicProps = {
      name: "image",
      showUploadList: false,
      className: "avatar-uploader",
      action: `${BASE_URL}/api/profiles/cover_pic`,
      headers: {
        authorization: `Bearer ${this.props.token}`
      },
      onChange: info => {
        if (info.file.status !== "uploading") {
        }
        if (info.file.status === "done") {
          message.success("Cover pic updated successfully");
          this.props.changePic(info.file.response);
        } else if (info.file.status === "error") {
          message.error("Cover pic upload failed");
        }
      }
    };

    //check if the logged in user is same as the current profile
    const { userId, profile } = this.props;
    if (profile.user_id !== userId) {
      return;
    }

    const onMenuClick = ({ key }) => {
      if (key === "search") {
        this.setState({ showCoverPicUpload: true });
      }
    };

    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="upload">
          <Upload {...coverPicProps}>Upload</Upload>
        </Menu.Item>
        <Menu.Item key="search">Search</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown placement="bottomLeft" overlay={menu}>
        <div className="change-cover-btn">
          <div className="change-cover-btn-bg" />
          <Icon style={{ color: "white" }} type="edit" />
        </div>
      </Dropdown>
    );
  };

  //call editProfile action creator
  onEditProfile = formValues => {
    this.props.editProfile(this.props.token, formValues);
  };

  render() {
    const profilePicProps = {
      name: "image",
      showUploadList: false,
      className: "avatar-uploader",
      action: `${BASE_URL}/api/profiles/profile_pic`,
      headers: {
        authorization: `Bearer ${this.props.token}`
      },
      onChange: info => {
        if (info.file.status !== "uploading") {
        }
        if (info.file.status === "done") {
          message.success(`Profile pic uploaded successfully`);
          this.props.changePic(info.file.response);
        } else if (info.file.status === "error") {
          message.error(`Profile pic upload failed.`);
        }
      }
    };
    const {
      profile,
      followersCount,
      followingsCount,
      articles,
      userId
    } = this.props;
    return (
      <div className="profile-page-container">
        <LoadingBar
          showFastActions
          style={{ backgroundColor: "#0c9dbf", height: "3px" }}
        />
        <Sidebar sidebarColor={"#0c9dbf"} />
        <Drawer
          title="Search Image"
          placement="right"
          width={420}
          closable={true}
          onClose={this.onClose}
          visible={this.state.showCoverPicUpload}
        >
          <Unsplash setFeaturedImage={this.setCoverPic} />
        </Drawer>
        {profile && (
          <div className="profile-page-content">
            <div className="profile-page-top">
              <div className="profile-cover-pic">
                {profile.cover_pic && (
                  <img
                    alt="profile"
                    src={
                      profile.cover_pic[0] !== "h"
                        ? `${BASE_URL}${profile.cover_pic.slice(
                            1
                          )}`
                        : profile.cover_pic
                    }
                  />
                )}
                {this.renderChangeCoverPicBtn()}
              </div>

              <div className="profile-display-pic">
                {profile.user_id === userId && (
                  <Upload {...profilePicProps}>
                    <div className="change-profile-pic">
                      <Icon type="camera" />
                      <p>Change Profile Pic</p>
                    </div>
                  </Upload>
                )}
                {!profile.active_profile_pic && (
                  <img
                    alt="profile"
                    src={require("../../images/profile.svg")}
                  />
                )}
                {profile.active_profile_pic &&
                  profile.active_profile_pic.charAt(0) !== "h" && (
                    <img
                      alt="profile"
                      src={`${BASE_URL}${profile.active_profile_pic.slice(
                        1
                      )}`}
                    />
                  )}
                {profile.active_profile_pic &&
                  profile.active_profile_pic.charAt(0) === "h" && (
                    <img alt="profile" src={profile.active_profile_pic} />
                  )}
              </div>

              <h3 className="name">{profile.name}</h3>
              <div className="profile-stats">
                <div className="profile-stats-info-wrapper">
                  <div
                    className={`profile-stats-info ${
                      this.state.showArticles ? "active" : ""
                    }`}
                    onClick={() =>
                      this.setState({
                        showArticles: true,
                        showFollowers: false,
                        showFollowings: false
                      })
                    }
                  >
                    <p>{articles.length}</p>
                    <h5>Articles</h5>
                  </div>
                  <div
                    className={`profile-stats-info ${
                      this.state.showFollowers ? "active" : ""
                    }`}
                    onClick={() =>
                      this.setState({
                        showArticles: false,
                        showFollowers: true,
                        showFollowings: false
                      })
                    }
                  >
                    <p>{followersCount}</p>
                    <h5>Followers</h5>
                  </div>
                  <div
                    className={`profile-stats-info ${
                      this.state.showFollowings ? "active" : ""
                    }`}
                    onClick={() =>
                      this.setState({
                        showArticles: false,
                        showFollowers: false,
                        showFollowings: true
                      })
                    }
                  >
                    <p>{followingsCount}</p>
                    <h5>Followings</h5>
                  </div>
                  {this.renderActionButton()}
                </div>
              </div>
            </div>
            <div className="profile-page-main">
              <div className="profile-about">
                <div className="profile-bio">
                  <h5>
                    <span>About</span>{" "}
                    {profile.user_id === userId && (
                      <Icon
                        onClick={this.showModal}
                        style={{ color: "#0c9dbf" }}
                        type="edit"
                      />
                    )}
                  </h5>
                  <Modal
                    visible={this.state.showModal}
                    title="Edit Personal Details"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={{ background: "#181818" }}
                    style={{ top: 20 }}
                    footer={null}
                  >
                    <div className="edit-profile-form">
                      <ProfileForm
                        profile={this.props.profile}
                        loading={this.props.loading}
                        onSubmit={this.onEditProfile}
                      />
                    </div>
                  </Modal>
                  {this.props.profile.bio && <p>{this.props.profile.bio}</p>}
                </div>
                <div className="profile-about-list">
                  <div className="profile-about-list-item">
                    <Icon type="pushpin" style={{ color: "white" }} />
                    <h5>{this.props.profile.address}</h5>
                  </div>
                  <div className="profile-about-list-item">
                    <Icon type="calendar" style={{ color: "white" }} />
                    <h5>Member since Mar 2019</h5>
                  </div>
                </div>
              </div>
              <div className="profile-article-cards">
                {this.renderSelectedContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    profile: state.selectedProfile.profile,
    followersCount: state.selectedProfile.followersCount,
    followingsCount: state.selectedProfile.followingsCount,
    followers: state.selectedProfile.followers,
    followings: state.selectedProfile.followings,
    following: state.selectedProfile.following,
    unfollowing: state.selectedProfile.unfollowing,
    loading: state.selectedProfile.loading,
    articles: state.selectedProfile.articles,
    activity: state.profile.activity
  };
};

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    getUserArticles,
    followUser,
    unfollowUser,
    getUserFollowers,
    getUserFollowings,
    editProfile,
    changePic
  }
)(Profile);
