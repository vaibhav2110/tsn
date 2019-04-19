import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getArticles,
  getTopArticles,
  getFollowingArticles
} from "../../actions/article";
import { getActivity, getProfile } from "../../actions/profile";
import Slider from "./Components/Slider";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Articles.css";
import { Affix, Typography, Icon } from "antd";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../common/types";

const { Paragraph } = Typography;

class Articles extends Component {
  //Call getArticles and getActivity action creator
  componentDidMount() {
    this.props.getArticles();
    this.props.getTopArticles();
    this.props.getFollowingArticles(this.props.token);
    this.props.getActivity(this.props.token);
    this.props.getProfile(this.props.token);
  }

  //Convert ISO date into proper format
  renderDate(isoDate) {
    return new Date(isoDate + "")
      .toString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
  }

  //Render articles
  renderArticles(articles) {
    return articles.map(article => {
      return (
        <div key={article._id} className="article-card">
          <Link to={`/article/${article._id}`}>
            <div className="article-card-top">
              <Link to={`/profile/${article.user_id._id}`}>
                <div className="article-card-author">
                  <div className="article-card-author-avatar">
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
                  <div className="article-card-author-info">
                    <p>{article.user_id.username}</p>
                    <p className="date">{this.renderDate(article.createdAt)}</p>
                  </div>
                </div>
              </Link>
              <div className="article-card-image">
                <img alt="profile" src={article.featured_image} />
              </div>
            </div>
            <div className="article-card-bottom">
              <div className="article-card-bottom-content">
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
              </div>
              <div className="article-card-stats">
                <div className="views">
                  <Icon type="eye" />
                  <h6>{article.views}</h6>
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
              </div>
              {/* <p>10 min read</p> */}
            </div>
          </Link>
        </div>
      );
    });
  }

  //Render latest section
  renderLatest() {
    return this.props.articles.map((article, index) => {
      if (index > 3) {
        return null;
      }
      return (
        <div key={article._id} className="latest-article-list-item">
          <div className="latest-article-image">
            <img alt="profile" src={article.featured_image} />
          </div>
          <div className="latest-article-content">
            <h5>{article.title}</h5>
            <Paragraph
              ellipsis={{ rows: 1 }}
              style={{
                color: "white",
                fontFamily: "Poppins",
                marginLeft: 15,
                fontSize: "0.8em",
                opacity: 0.8
              }}
            >
              {article.subtitle}
            </Paragraph>
            <p className="date">{this.renderDate(article.createdAt)}</p>
          </div>
        </div>
      );
    });
  }

  //Render Home Page content
  render() {
    return (
      <div className="articles-page-container">
        <Sidebar />
        <div className="slider-container">
          <Slider articles={this.props.articles} renderDate={this.renderDate} />
        </div>
        <div className="homepage-content">
          <div className="center-content">
            <div className="top-pick">
              <div className="top-pick-title-container">
                <div className="top-pick-title-wrapper">
                  <p>Top Pick Article</p>
                  <h1>TOP PICK</h1>
                </div>
              </div>
              <div className="article-cards">
                {this.renderArticles(this.props.toparticles)}
              </div>
            </div>
            {this.props.followingarticles.length > 0 && (
              <div className="top-pick">
                <div className="top-pick-title-container">
                  <div className="top-pick-title-wrapper">
                    <p>From People You Follow</p>
                    <h1>FOLLOWINGS</h1>
                  </div>
                </div>
                <div className="article-cards">
                  {this.renderArticles(this.props.followingarticles)}
                </div>
              </div>
            )}
          </div>
          <div className="right-content">
            <Affix offsetTop={0}>
              <div className="latest-article">
                <h4>Latest Articles</h4>
                <div className="latest-article-list">{this.renderLatest()}</div>
              </div>
            </Affix>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    articles: state.articles,
    toparticles: state.toparticles,
    followingarticles: state.followingarticles,
    token: state.auth.token
  };
};
export default connect(
  mapStateToProps,
  { getArticles, getActivity, getProfile, getTopArticles, getFollowingArticles }
)(Articles);
