import React, { Component } from "react";
import { TimelineMax, Power4 } from "gsap/TweenMax";
import { BASE_URL } from '../../../common/types';
import { Typography, Skeleton } from "antd";
import "./Slider.css";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

export default class Slider extends Component {
  state = { currentIndex: 0, loaded: true };
  constructor(props) {
    super(props);
    this.imageAnimatedOverlay = React.createRef();
    this.titleOverlay = React.createRef();
    this.subtitleOverlay = React.createRef();
    this.authorOverlay = React.createRef();
    this.timeline3 = new TimelineMax();
  }

  //If article is available start slideshow
  componentDidUpdate() {
    const article = this.props.articles[this.state.currentIndex];
    if (!article) {
      return;
    }
    if (article && this.state.loaded) {
      this.setState({ loaded: false });
      this.interval = setInterval(() => this.slideChange("next"), 10000);
    }
  }

  //Clear slideshow before unmounting
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Change slide based on input direction
  slideChange = direction => {
    const article = this.props.articles[this.state.currentIndex];
    if (!article) {
      return;
    }
    this.timeline3
      .to(this.imageAnimatedOverlay, 1, {
        width: "100%",
        ease: Power4.easeInOut
      })
      .to(
        this.titleOverlay,
        1,
        {
          width: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.subtitleOverlay,
        1,
        {
          width: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.authorOverlay,
        1,
        {
          width: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .add(() => (direction === "next" ? this.nextSlide() : this.prevSlide()))
      .to(this.imageAnimatedOverlay, 1, {
        left: "100%",
        ease: Power4.easeInOut
      })
      .to(
        this.titleOverlay,
        1,
        {
          left: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.subtitleOverlay,
        1,
        {
          left: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.authorOverlay,
        1,
        {
          left: "100%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(this.imageAnimatedOverlay, 1, {
        width: "0%",
        ease: Power4.easeInOut
      })
      .to(
        this.titleOverlay,
        1,
        {
          width: "0%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.subtitleOverlay,
        1,
        {
          width: "0%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(
        this.authorOverlay,
        1,
        {
          width: "0%",
          ease: Power4.easeInOut
        },
        "-=1"
      )
      .to(this.imageAnimatedOverlay, 0.1, {
        left: "0%",
        ease: Power4.easeInOut
      })
      .to(
        this.titleOverlay,
        0.1,
        {
          left: "0%",
          ease: Power4.easeInOut
        },
        "-=0.1"
      )
      .to(
        this.subtitleOverlay,
        0.1,
        {
          left: "0%",
          ease: Power4.easeInOut
        },
        "-=0.1"
      )
      .to(
        this.authorOverlay,
        0.1,
        {
          left: "0%",
          ease: Power4.easeInOut
        },
        "-=0.1"
      );
  };

  //show next slide
  nextSlide = () => {
    this.setState((state, props) => {
      return {
        currentIndex: (state.currentIndex + 1) % props.articles.length
      };
    });
  };

  //show prev slide
  prevSlide = () => {
    this.setState((state, props) => {
      console.log(props);
      let currentIndex;
      if (state.currentIndex === 0) {
        currentIndex = props.articles.length - 1;
      } else {
        currentIndex = state.currentIndex - 1;
      }
      return {
        currentIndex: currentIndex
      };
    });
  };

  render() {
    const article = this.props.articles[this.state.currentIndex];
    if (!article) {
      return (
        <div className="slider-skeleton-container">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      );
    }
    return (
      <div className="slider-wrapper">
        <div className="slider-content">
          <div className="slider-content-text">
            <div className="info">
              <p className="date">{this.props.renderDate(article.createdAt)}</p>
              {/* <p className="duration">10 min read</p> */}
            </div>
            <img
              className="plus-image"
              alt="plus"
              src={require("../../../images/plus.png")}
            />
            <h1 className="title">
              <div
                className="title-overlay"
                ref={div => (this.titleOverlay = div)}
              />
              {article.title}
            </h1>
            <Link to={`/profile/${article.user_id._id}`}>
              <div className="slider-article-author">
                <div
                  className="slider-article-author-overlay"
                  ref={div => (this.authorOverlay = div)}
                />
                <div className="slider-article-author-image">
                  {!article.user_id.active_profile_pic && (
                    <img
                      alt="profile"
                      src={require("../../../images/profile.svg")}
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
                <div className="slider-article-author-bio">
                  <p>Author</p>
                  <h5>{article.user_id.username}</h5>
                </div>
              </div>
            </Link>
            <div className="subtitle">
              <div
                className="subtitle-overlay"
                ref={div => (this.subtitleOverlay = div)}
              />
              <Paragraph
                ellipsis={{ rows: 3 }}
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  opacity: 0.5,
                  zIndex: -1
                }}
              >
                {article.subtitle}
              </Paragraph>
            </div>
            <Link to={`/article/${article._id}`}>
              <div className="slider-article-button">
                <p>Continue Reading</p>
                <img alt="arrow" src={require("../../../images/arrow.png")} />
              </div>
            </Link>
          </div>
          <div className="slider-content-image">
            <div
              className="slider-content-image-animated"
              ref={div => (this.imageAnimatedOverlay = div)}
            />
            <div className="slider-content-image-overlay" />
            <img alt="slider" src={article.featured_image} />
          </div>
          <div className="slider-control">
            <img
              alt="arrow"
              onClick={() => this.slideChange("prev")}
              src={require("../../../images/arrow-left.png")}
            />
            <img
              alt="arrow"
              onClick={() => this.slideChange("next")}
              src={require("../../../images/arrow-right.png")}
            />
          </div>
        </div>
      </div>
    );
  }
}
