import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { signUp, logIn, socialLogIn } from "../../actions/auth";
import "./LoginPage.css";
import { TimelineMax, Power3 } from "gsap/TweenMax";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import ResetPassword from "./Components/ResetPassword";
import { message, Modal } from "antd";
import history from "../../history";

class LoginPage extends React.Component {
  state = { showModal: false };
  constructor(props) {
    super(props);
    this.content = React.createRef();
    this.container = React.createRef();
    this.loginForm = React.createRef();
    this.signinForm = React.createRef();
    this.overlayLeft = React.createRef();
    this.overlayRight = React.createRef();
    this.timeline = new TimelineMax();
    this.timeline2 = new TimelineMax();
  }

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

  //Call signUp action creator
  onSignUp = formValues => {
    this.props.signUp(formValues);
  };

  //call logIn action creator
  onLogIn = formValues => {
    this.props.logIn(formValues);
  };

  //Animation to show login form
  showSignIn = () => {
    console.log(this.content.clientWidth);
    this.timeline
      .to(this.container, 1.8, {
        left: `${this.content.clientWidth - this.container.clientWidth}px`,
        ease: Power3.easeInOut,
        scaleX: 1.5
      })
      .to(
        this.container,
        0.9,
        {
          ease: Power3.easeInOut,
          scaleX: 1
        },
        "-=0.9"
      )
      .to(
        this.loginForm,
        2,
        {
          x: 0,
          ease: Power3.easeIn,
          zIndex: 2,
          autoAlpha: 1
        },
        "-=3"
      )
      .to(
        this.signinForm,
        2,
        {
          zIndex: 1,
          ease: Power3.easeOut,
          left: "20%",
          autoAlpha: 0
        },
        "-=3"
      )
      .to(
        this.overlayRight,
        1,
        {
          autoAlpha: 1,
          x: 0,
          display: "flex"
        },
        "-=1"
      )
      .to(
        this.overlayLeft,
        1,
        {
          autoAlpha: 0,
          x: -30,
          display: "none"
        },
        "-=1"
      );
  };

  //Animation to show sign up form
  showSignUp = () => {
    console.log(this.container.clientWidth);
    this.timeline
      .to(this.container, 1.8, {
        left: "0",
        ease: Power3.easeInOut,
        scaleX: 1.5
      })
      .to(
        this.container,
        0.9,
        {
          ease: Power3.easeInOut,
          scaleX: 1
        },
        "-=0.9"
      )
      .to(
        this.loginForm,
        2,
        {
          x: 500,
          zIndex: 1,
          ease: Power3.easeIn,
          autoAlpha: 0
        },
        "-=3"
      )
      .to(
        this.signinForm,
        2,
        {
          zIndex: 2,
          ease: Power3.easeOut,
          left: `${this.container.clientWidth}px`,
          autoAlpha: 1
        },
        "-=3"
      )
      .to(
        this.overlayRight,
        1,
        {
          autoAlpha: 0,
          x: 30,
          display: "none"
        },
        "-=1"
      )
      .to(
        this.overlayLeft,
        1,
        {
          display: "flex",
          autoAlpha: 1,
          x: 0
        },
        "-=1"
      );
  };

  //Check for query params returned after social media login redirect
  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    console.log(query);
    if (query.error) {
      message.error("No email found registered with this account!", 5);
      return;
    }
    if (query.token) {
      if (query.profile === "null") {
        this.props.socialLogIn({ ...query, profile: null });
      } else {
        this.props.socialLogIn(query);
      }
    }
  }

  componentDidUpdate() {
    //Check if user signs in successfully
    if (this.props.user) {
      message.success("Account created successfully!", 5);
      this.showSignIn();
    }

    //Check if we get a token on login
    if (this.props.token && this.props.profileId) {
      message.success("Logged in successfully!", 5);
      history.push("/");
    } else if (this.props.token) {
      message.success("Logged in successfully!", 5);
      history.push("/create");
    }
  }

  render() {
    return (
      <div className="login-page">
        <div
          className="login-container"
          id="login-container"
          ref={div => (this.content = div)}
        >
          <div
            className="form-container sign-up-container"
            ref={div => (this.signinForm = div)}
          >
            <SignupForm
              serverError={this.props.error}
              loading={this.props.loading}
              onSubmit={this.onSignUp}
              errorField={this.props.errorField}
            />
          </div>
          <div
            className="form-container sign-in-container"
            ref={div => (this.loginForm = div)}
          >
            <LoginForm
              serverError={this.props.error}
              loading={this.props.loading}
              onSubmit={this.onLogIn}
              errorField={this.props.errorField}
              showModal={this.showModal}
            />
          </div>
          <Modal
            visible={this.state.showModal}
            title="Reset Password"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            bodyStyle={{ background: "#181818" }}
            style={{ top: 20 }}
            footer={null}
          >
            <ResetPassword closeModal={this.handleCancel} />
          </Modal>
          <div className="overlay-container">
            <div className="overlay">
              <div
                className="overlay-left overflow-content"
                ref={div => (this.overlayLeft = div)}
              >
                <h1>Already have an account?</h1>
                <p>
                  Just click on the Sign in button and use your email & password
                  to log in.
                </p>
                <button className="ghost" id="signIn" onClick={this.showSignIn}>
                  Sign In
                </button>
                <img
                  className="overlay_img"
                  alt="Welcome"
                  src={require("../../images/welcome.jpg")}
                />
              </div>
              <div
                className="overlay-right overflow-content"
                ref={div => (this.overlayRight = div)}
              >
                <h1>Don't have an account?</h1>
                <p>
                  Just click on the sign up button and get yourself registered.
                </p>
                <button className="ghost" id="signUp" onClick={this.showSignUp}>
                  Sign Up
                </button>
                <img
                  className="overlay_img"
                  alt="Writing"
                  src={require("../../images/write.jpg")}
                />
              </div>
              <div
                className="overlay-panel"
                ref={div => (this.container = div)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    profileId: state.auth.profileId,
    error: state.auth.error,
    errorField: state.auth.errorField,
    loading: state.auth.loading,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { signUp, logIn, socialLogIn }
)(LoginPage);
