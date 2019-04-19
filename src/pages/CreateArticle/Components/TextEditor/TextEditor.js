import React, { Component } from "react";
import Dante from "Dante2";
import { BASE_URL } from '../../../../common/types';
import { ImageBlockConfig } from "Dante2/package/lib/components/blocks/image";
import { VideoBlockConfig } from "Dante2/package/lib/components/blocks/video";
import { DividerBlockConfig } from "Dante2/package/lib/components/blocks/divider";
import { PlaceholderBlockConfig } from "Dante2/package/lib/components/blocks/placeholder";
import "./TextEditor.css";
import Unsplash from "./Unsplash";
import { Input, Button, Drawer, Select } from "antd";
const { TextArea } = Input;
const Option = Select.Option;

export default class TextEditor extends Component {
  state = {
    article: {
      title: "",
      subtitle: "",
      featured_image: "",
      tags: [],
      body: null
    },
    showImageUpload: false
  };

  //If article is received as prop, fill the current state with correct values
  componentDidMount() {
    if (this.props.article) {
      let { title, subtitle, featured_image, tags } = this.props.article;
      this.setState({
        article: {
          ...this.state.article,
          title,
          subtitle,
          featured_image,
          tags
        }
      });
    }
  }

  //Show side drawer
  showDrawer = () => {
    this.setState({
      showImageUpload: true
    });
  };

  //Close side drawer
  onClose = () => {
    this.setState({
      showImageUpload: false
    });
  };

  //Call onSubmit received from parent
  onPublishClick = () => {
    this.props.onSubmit(this.state.article);
  };

  // onSaveClick = () => {
  //   this.props.onSubmit({ ...this.state, status: "Saved" });
  // };

  //Set featured image returned from Unsplash
  setFeaturedImage = url => {
    console.log(url);
    this.setState({ article: { ...this.state.article, featured_image: url } });
  };

  showSelectableTags() {
    const options = ["Science", "Technology", "Animals", "Life"];
    return options.map(option => {
      return <Option key={option}>{option}</Option>;
    });
  }

  handleTagsChange = value => {
    this.setState({ article: { ...this.state.article, tags: value } });
  };

  render() {
    let content = null;
    if (this.props.article) {
      content = {
        ...this.props.article.body
      };
      if (!content.entityMap) {
        content = {
          ...this.props.article.body,
          entityMap: {}
        };
      }
    }
    return (
      <div className="editor">
        <div className="editor-nav">
          {/* <Button onClick={this.onSaveClick} loading={this.props.loading}>
            Save
          </Button> */}
          <Button onClick={this.onPublishClick} loading={this.props.loading}>
            {this.props.action}
          </Button>
        </div>
        <Button onClick={this.showDrawer} className="editor-btn">
          Add or change cover image
        </Button>
        <div className="featured_image">
          {this.state.article.featured_image && (
            <img alt="featured_img" src={this.state.article.featured_image} />
          )}
        </div>
        <Drawer
          title="Search Image"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.showImageUpload}
        >
          <Unsplash setFeaturedImage={this.setFeaturedImage} />
        </Drawer>
        <div className="input-wrapper">
          <TextArea
            onChange={event =>
              this.setState({
                article: { ...this.state.article, title: event.target.value }
              })
            }
            value={this.state.article.title}
            autosize
            type="text"
            className="article-title"
            placeholder="Enter Title"
          />
        </div>
        <div className="input-wrapper">
          <TextArea
            onChange={event =>
              this.setState({
                article: { ...this.state.article, subtitle: event.target.value }
              })
            }
            value={this.state.article.subtitle}
            autosize
            type="text"
            className="article-subtitle"
            placeholder="Enter Caption"
          />
        </div>
        <div className="divider" />
        <Dante
          title_placeholder={"Title"}
          content={content}
          default_wrappers={[
            {
              className: "graf--p white_default my_unstyled",
              block: "unstyled"
            },
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
            { className: "graf--bold white_default", block: "BOLD" },
            { className: "graf--italic white_default", block: "ITALIC" }
          ]}
          continuousBlocks={[
            "header-one",
            "unstyled",
            "blockquote",
            "ordered-list",
            "unordered-list",
            "unordered-list-item",
            "ordered-list-item",
            "code-block"
          ]}
          onChange={editor => {
            this.setState({
              article: {
                ...this.state.article,
                body: editor.emitSerializedOutput()
              }
            });
            console.log("editor content: ", editor.emitSerializedOutput());
          }}
          widgets={[
            ImageBlockConfig({
              options: {
                upload_url: `${BASE_URL}/api/articles/article_pic`,
                upload_callback: (ctx, img) => {
                  console.log(ctx);
                  console.log(img);
                  alert("file uploaded: " + ctx.data.url);
                },
                upload_formName: "image",
                upload_error_callback: (ctx, img) => {
                  console.log(ctx);
                }
              }
            }),
            VideoBlockConfig(),
            DividerBlockConfig(),
            PlaceholderBlockConfig()
          ]}
        />
        <Select
          mode="multiple"
          style={{ width: "100%", marginTop: "50px" }}
          placeholder="Select Tags"
          onChange={this.handleTagsChange}
          value={this.state.article.tags}
        >
          {this.showSelectableTags()}
        </Select>
        ,
      </div>
    );
  }
}
