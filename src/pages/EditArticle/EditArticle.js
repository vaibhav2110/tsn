import React, { Component } from "react";
import { connect } from "react-redux";
import TextEditor from "../CreateArticle/Components/TextEditor/TextEditor";
import { editArticle } from "../../actions/article";
import { message } from "antd";
import history from "../../history";

class EditArticle extends Component {

  componentDidUpdate(prevProps) {
    //check to see if editting changes from true to false
    if (prevProps.editting && !this.props.editting) {
        message.success("Article editted successfully");
        history.goBack();
    }
  }

  //call edit Article action creator
  onSubmit = formValues => {
    this.props.editArticle(this.props.token, this.props.article._id, formValues);
  };
  render() {
    return (
      <div className="create-article-container">
        <div className="text-editor-wrapper">
          <TextEditor article={this.props.article} action={"Edit"} loading={this.props.editting} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.selectedArticle.article,
    editting: state.selectedArticle.editting,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { editArticle }
)(EditArticle);
