import React, { Component } from "react";
import "./Comment.css";
import { BASE_URL } from '../../../common/types'
import { Icon, Menu, Dropdown, Popconfirm, Input, Button } from "antd";
const { TextArea } = Input;

export default class Comment extends Component {
  state = { editting: false, comment: "" };

  componentDidMount() {
    this.setState({ comment: this.props.comment.comment })
  }
  //Convert ISO Date in proper format
  renderDateAndTime(isoDate) {
    return new Date(isoDate + "")
      .toString()
      .split(" ")
      .slice(1, 5)
      .join(" ");
  }

  //Render like icon based on whether user has already liked or not
  renderLikeIcon = () => {
    if (
      this.props.liking &&
      this.props.activeComment === this.props.comment._id
    ) {
      return (
        <Icon type="loading" style={{ color: "#3AB19B", fontSize: "1.5em" }} />
      );
    }
    if (this.props.activity.comments_liked.includes(this.props.comment._id)) {
      return (
        <Icon
          type="like"
          theme="filled"
          style={{ color: "#3AB19B", fontSize: "1.5em" }}
        />
      );
    }
    return <Icon type="like" style={{ color: "#3AB19B", fontSize: "1.5em" }} />;
  };

  //Render Dislike icon based on whether user has already liked or not
  renderDislikeIcon = () => {
    if (
      this.props.disliking &&
      this.props.activeComment === this.props.comment._id
    ) {
      return (
        <Icon type="loading" style={{ color: "#F34623", fontSize: "1.5em" }} />
      );
    }
    if (
      this.props.activity.comments_disliked.includes(this.props.comment._id)
    ) {
      return (
        <Icon
          type="dislike"
          theme="filled"
          style={{ color: "#F34623", fontSize: "1.5em" }}
        />
      );
    }
    return (
      <Icon type="dislike" style={{ color: "#F34623", fontSize: "1.5em" }} />
    );
  };

  //Render menu button when logged in user is same as the comment author
  renderMenuButton = () => {
    if (this.props.activity.user_id !== this.props.comment.user_id._id) {
      return;
    }

    const onMenuClick = ({ key }) => {
      if (key === "edit") {
        this.setState({ editting: true });
      }
    };

    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="edit">
          <p style={{ color: "#ef5230", margin: 0 }}>
            <Icon type="edit" /> Edit
          </p>
        </Menu.Item>
        <Menu.Item key="delete">
          <Popconfirm
            title="Are you sure delete this comment?"
            onConfirm={() => this.props.onDelete(this.props.comment._id)}
            onCancel={e => console.log(e)}
            okText="Yes"
            cancelText="No"
          >
            <p style={{ color: "#ef5230", margin: 0 }}>
              <Icon type="delete" /> Delete
            </p>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown placement="bottomLeft" overlay={menu}>
        <Icon style={{ color: "white" }} type="more" />
      </Dropdown>
    );
  };

  onEditClick = () => {
    this.setState({ editting: false });
    this.props.onEdit(this.props.comment._id, this.state.comment);
  }

  renderEditComment() {
    if (this.state.editting) {
      return (
        <div className="article-comment-post comment-edit">
          <TextArea
            autosize
            type="text"
            className="article-comment-textarea comment-edit-textarea"
            placeholder="Edit comment"
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
          />
          <div className="comment-edit-buttons">
            <Button className="btn" onClick={this.onEditClick}>Edit</Button>
            <Button className="btn" onClick={() => this.setState({ editting: false })}>Cancel</Button>
          </div>
        </div>
      );
    }
    return <p>{this.props.comment.comment}</p>;
  }

  //Render comments
  render() {
    return (
      <div className="comment-container">
        <div className="comment-author">
          <div className="comment-author-avatar">
            {!this.props.comment.user_id.active_profile_pic && (
              <img alt="profile" src={require("../../../images/profile.svg")} />
            )}
            {this.props.comment.user_id.active_profile_pic && this.props.comment.user_id.active_profile_pic[0] !== "h" && (
              <img
                alt="profile"
                src={`${BASE_URL}${this.props.comment.user_id.active_profile_pic.slice(
                  1
                )}`}
              />
            )}
            {this.props.comment.user_id.active_profile_pic && this.props.comment.user_id.active_profile_pic[0] === "h" && (
              <img
                alt="profile"
                src={this.props.comment.user_id.active_profile_pic}
              />
            )}
          </div>
          <div className="comment-author-info">
            <p>{this.props.comment.user_id.username}</p>
            <p className="date">
              {this.renderDateAndTime(this.props.comment.createdAt)}
            </p>
          </div>
          {this.renderMenuButton()}
        </div>
        <div className="comment-body">
          {this.renderEditComment()}
        </div>
        <div className="comment-stats">
          <div
            className="likes"
            onClick={() => this.props.onLike(this.props.comment._id)}
          >
            {this.renderLikeIcon()}
            <p>{this.props.comment.upvotes}</p>
          </div>
          <div
            className="dislikes"
            onClick={() => this.props.onDislike(this.props.comment._id)}
          >
            {this.renderDislikeIcon()}
            <p>{this.props.comment.downvotes}</p>
          </div>
        </div>
      </div>
    );
  }
}
