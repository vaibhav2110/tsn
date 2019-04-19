import React, { Component } from "react";
import Dante from "Dante2";

export default class ArticleContent extends Component {
  render() {
    let content = {
      ...this.props.content
    };

    //Handling Dante error when entityMap is null
    if (!content.entityMap) {
      content = {
        ...this.props.content,
        entityMap: {}
      };
    }
    return (
      <div>
        <Dante
          default_wrappers={[
            { className: "graf--p white_default my_unstyled", block: "unstyled" },
            { className: "graf--h2 white_default", block: "header-one" },
            { className: "graf--h3 white_default", block: "header-two" },
            { className: "graf--h4 white_default", block: "header-three" },
            {
              className: "graf--blockquote white_default my_block",
              block: "blockquote"
            },
            {
              className: "graf--insertunorderedlist white_default my_list",
              block: "unordered-list-item"
            },
            {
              className: "graf--insertorderedlist white_default my_list",
              block: "ordered-list-item"
            },
            {
              className: "graf--code white_default my_code",
              block: "code-block"
            },
            { className: "graf--bold white_default my_bold", block: "BOLD" },
            { className: "graf--italic white_default", block: "ITALIC" }
          ]}
          content={content}
          read_only={true}
        />
      </div>
    );
  }
}
