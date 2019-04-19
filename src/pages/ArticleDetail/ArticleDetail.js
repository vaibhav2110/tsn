import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../common/types';
import {
  getArticle,
  likeArticle,
  dislikeArticle,
  getArticleComments,
  postComment,
  likeComment,
  disLikeComment,
  bookmarkArticle,
  recordEngagement,
  deleteArticle,
  deleteComment,
  editComment
} from "../../actions/article";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ArticleDetail.css";
import ArticleContent from "./components/ArticleContent";
import Comment from "./components/Comment";
import {
  Input,
  Button,
  Icon,
  Skeleton,
  Tag,
  Dropdown,
  Menu,
  Popconfirm,
  message
} from "antd";
import history from "../../history";
const { TextArea } = Input;

class ArticleDetail extends Component {
  state = {
    comment: "",
    activeComment: null,
    start_time: null,
    end_time: null
  };

  constructor(props) {
    super(props);
    this.tagColors = ["#ff7b39", "#0c9dbf", "#f04b51"];
  }

  //Call getArticle and getArticleComments Action Creator
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getArticle(id);
    this.props.getArticleComments(id);
    this.setState({ start_time: new Date().toISOString() });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      message.success("Article deleted successfully");
      history.goBack();
    }
  }

  // componentWillUnmount() {
  //   this.props.recordEngagement(
  //     this.props.token,
  //     this.props.match.params.id,
  //     this.state.start_time
  //   );
  // }

  //Convert ISO Date in proper format
  renderDate(isoDate) {
    return new Date(isoDate + "")
      .toString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
  }

  //Call likeArticle action creator
  onArticleLike = () => {
    this.props.likeArticle(this.props.token, this.props.match.params.id);
  };

  //Call dislikeArticle action creator
  onArticleDislike = () => {
    this.props.dislikeArticle(this.props.token, this.props.match.params.id);
  };

  //Call bookmarkArticle action creator
  onArticleBookmark = () => {
    this.props.bookmarkArticle(this.props.token, this.props.match.params.id);
  };

  //Call deleteArticle action creator
  onArticleDelete = () => {
    this.props.deleteArticle(this.props.token, this.props.match.params.id);
  };

  //Render like icon based on whether user has already liked article or not
  renderLikeIcon = () => {
    if (this.props.liking) {
      return (
        <Icon type="loading" style={{ color: "#3AB19B", fontSize: "1.5em" }} />
      );
    }
    if (
      this.props.activity.articles_liked.includes(this.props.match.params.id)
    ) {
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

  //Render dislike icon based on whether user has already disliked article or not
  renderDislikeIcon = () => {
    if (this.props.disliking) {
      return (
        <Icon type="loading" style={{ color: "#F34623", fontSize: "1.5em" }} />
      );
    }
    if (
      this.props.activity.articles_disliked.includes(this.props.match.params.id)
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

  //Render bookmark icon based on whether user has already bookmarked article or not
  renderBookmarkIcon = () => {
    if (this.props.bookmarking) {
      return (
        <Icon type="loading" style={{ color: "#F8B721", fontSize: "1.5em" }} />
      );
    }
    if (this.props.activity.bookmarks.includes(this.props.match.params.id)) {
      return (
        <Icon
          type="book"
          theme="filled"
          style={{ color: "#F8B721", fontSize: "1.5em" }}
        />
      );
    }
    return <Icon type="book" style={{ color: "#F8B721", fontSize: "1.5em" }} />;
  };

  //Render list of comments
  renderComments() {
    return this.props.comments.map(comment => {
      return (
        <div key={comment._id} className="article-comments-list-item">
          <Comment
            liking={this.props.commentliking}
            disliking={this.props.commentdisliking}
            onLike={this.onCommentLike}
            onDislike={this.onCommentDislike}
            activity={this.props.activity}
            comment={comment}
            activeComment={this.state.activeComment}
            onDelete={this.onCommentDelete}
            onEdit={this.onCommentEdit}
          />
        </div>
      );
    });
  }

  //Call post comment action creator
  onCommentPost = () => {
    this.props.postComment(
      this.props.token,
      this.props.match.params.id,
      this.state
    );
    this.setState({ comment: "" });
  };

  //Call like comment action creator
  onCommentLike = commentId => {
    this.setState({ activeComment: commentId });
    this.props.likeComment(
      this.props.token,
      this.props.match.params.id,
      commentId
    );
  };

  //Call dislike comment action creator
  onCommentDislike = commentId => {
    this.setState({ activeComment: commentId });
    this.props.disLikeComment(
      this.props.token,
      this.props.match.params.id,
      commentId
    );
  };

  //Call delete comment action creator
  onCommentDelete = commentId => {
    this.setState({ activeComment: commentId });
    console.log(commentId);
    this.props.deleteComment(
      this.props.token,
      this.props.match.params.id,
      commentId
    );
  };

  //Call editComment action creator
  onCommentEdit = (commentId, comment) => {
    this.props.editComment(this.props.token, this.props.match.params.id, commentId, comment);
  }

  //render Tags of the article
  renderTags = tags => {
    return tags.map(tag => (
      <Tag
        key={tag}
        color={
          this.tagColors[Math.floor(Math.random() * this.tagColors.length)]
        }
      >
        {tag}
      </Tag>
    ));
  };

  //Show menu button when article author is same as the logged in user
  renderMenuButton = () => {
    if (this.props.article.user_id._id !== this.props.userId) {
      return;
    }

    const onMenuClick = ({ key }) => {
      if (key === "search") {
        this.setState({ showCoverPicUpload: true });
      }
    };

    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="edit">
          <Link to={`/edit_article/${this.props.article._id}`}>
            <p style={{ color: "#ef5230", margin: 0 }}><Icon type="edit" /> Edit</p>
          </Link>
        </Menu.Item>
        <Menu.Item key="delete">
          <Popconfirm
            title="Are you sure delete this article?"
            onConfirm={this.onArticleDelete}
            onCancel={e => console.log(e)}
            okText="Yes"
            cancelText="No"
          >
            <p style={{ color: "#ef5230", margin: 0 }}><Icon type="delete" /> Delete</p>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown placement="bottomLeft" overlay={menu}>
        <Icon style={{color: "white"}} type="more" />
      </Dropdown>
    );
  };

  //Render Article details
  render() {
    let article;
    if (this.props.article) {
      article = this.props.article;
    }
    return (
      <div>
        <Sidebar>
          {article && (
            <React.Fragment>
              <div className="icon-container">
                <div
                  className="sidebar-icon like-icon"
                  onClick={this.onArticleLike}
                >
                  {this.renderLikeIcon()}
                </div>
                <p>{article.upvotes}</p>
              </div>
              <div className="icon-container">
                <div
                  className="sidebar-icon dislike-icon"
                  onClick={this.onArticleDislike}
                >
                  {this.renderDislikeIcon()}
                </div>
                <p>{article.downvotes}</p>
              </div>
              <div className="icon-container">
                <div
                  className="sidebar-icon bookmark-icon"
                  onClick={this.onArticleBookmark}
                >
                  {this.renderBookmarkIcon()}
                </div>
              </div>
            </React.Fragment>
          )}
        </Sidebar>
        <div className="article-detail-content">
          {!article && (
            <div className="skeleton-container">
              <Skeleton active />
            </div>
          )}
          {article && (
            <div className="article-detail">
              <div className="article-author">
                <Link to={`/profile/${article.user_id._id}`}>
                  <div className="article-author-avatar">
                    {!article.user_id.active_profile_pic && (
                      <img
                        alt="profile"
                        src={require("../../images/profile.svg")}
                      />
                    )}
                    {article.user_id.active_profile_pic && (
                      <img
                        alt="profile"
                        src={`${BASE_URL}${article.user_id.active_profile_pic.slice(
                          1
                        )}`}
                      />
                    )}
                  </div>
                </Link>
                <Link to={`/profile/${article.user_id._id}`}>
                  <div className="article-author-info">
                    <p>{article.user_id.username}</p>
                    <p className="date">{this.renderDate(article.createdAt)}</p>
                  </div>
                </Link>
                {this.renderMenuButton()}
              </div>

              <div className="article-featured-image">
                <img alt="profile" src={article.featured_image} />
              </div>
              <h1 className="title">{article.title}</h1>
              <p className="subtitle">{article.subtitle}</p>
              <ArticleContent
                content={article.body}
                config={{ read_only: true }}
              />
              {/* {article.tags.map(tag => <Tag color="red">{tag}</Tag>)} */}
              <div className="article-tags">
                {this.renderTags(article.tags)}
              </div>
            </div>
          )}
          <div className="article-comments">
            <h4>Comments({this.props.comments.length})</h4>
            <div className="article-comments-list">
              {!article && (
                <div className="skeleton-container-comment">
                  <Skeleton active />
                </div>
              )}
              {article && this.renderComments()}
            </div>
          </div>
          <div className="article-comment-post-container">
            <div className="article-comment-background-blur" />
            <div className="article-comment-post">
              <TextArea
                autosize
                type="text"
                className="article-comment-textarea"
                placeholder="Write a comment"
                value={this.state.comment}
                onChange={event =>
                  this.setState({ comment: event.target.value })
                }
              />
              <Button
                loading={this.props.commenting}
                onClick={this.onCommentPost}
                className="btn"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.selectedArticle.article,
    liking: state.selectedArticle.liking,
    commenting: state.selectedArticle.commenting,
    commentliking: state.selectedArticle.commentliking,
    commentdisliking: state.selectedArticle.commentdisliking,
    comments: state.selectedArticle.comments,
    disliking: state.selectedArticle.disliking,
    bookmarking: state.selectedArticle.bookmarking,
    deleting: state.selectedArticle.deleting,
    activity: state.profile.activity,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  {
    getArticle,
    likeArticle,
    dislikeArticle,
    getArticleComments,
    postComment,
    likeComment,
    disLikeComment,
    bookmarkArticle,
    recordEngagement,
    deleteArticle,
    deleteComment,
    editComment
  }
)(ArticleDetail);
