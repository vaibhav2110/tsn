import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticle } from "../../actions/article";
import TextEditor from "./Components/TextEditor/TextEditor";
import { message } from "antd";
import "./CreateArticle.css";
import history from "../../history";

class CreateArticle extends Component {
  componentDidUpdate() {
    //check if article gets published and we get an id in return
    if (this.props.id) {
      message.success("Article published successfully!", 5);
      history.push("/");
    }
  }
  //Call create Article action creator
  onSubmit = formValues => {
    this.props.createArticle(this.props.token, formValues);
  };
  render() {
    return (
      <div className="create-article-container">
        <div className="text-editor-wrapper">
          <TextEditor action={"Publish"} loading={this.props.loading} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    id: state.createArticle.articleId,
    loading: state.createArticle.loading,
    error: state.createArticle.error
  };
};

export default connect(
  mapStateToProps,
  { createArticle }
)(CreateArticle);
