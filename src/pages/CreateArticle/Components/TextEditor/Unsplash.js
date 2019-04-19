import React, { Component } from "react";
import { Input, Button, Spin } from "antd";
import Axios from "axios";
import "./Unsplash.css";

const Search = Input.Search;

export default class Unsplash extends Component {
  state = { searchTerm: "", searchResults: [], page: 1, spinning: false };

  //Call unsplash api
  onSearch = async page => {
    this.setState({ page: page, spinning: true });
    if (page === 1) {
      this.setState({ searchResults: [] });
    }
    const response = await Axios.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${
        this.state.searchTerm
      }&utm_source=quotes&utm_medium=referral&client_id=658531b864e2ec17daacb31466122437addb53efcdabc5288a25725329c1cb1e`
    );
    this.setState({
      searchResults: [...this.state.searchResults, ...response.data.results],
      spinning: false
    });
  };

  //Helper function to render images returned from unsplash
  renderImages = () => {
    return this.state.searchResults.map(image => {
      return (
        <div
          key={image.id}
          onClick={() => this.setFeaturedImage(image.urls.regular)}
          className="image-wrapper"
        >
          <img alt={image.description} src={image.urls.small} />
        </div>
      );
    });
  };

  //Call setFeaturedImage function of parent with an url
  setFeaturedImage = url => {
    this.props.setFeaturedImage(url);
  };

  render() {
    return (
      <div className="unsplash-container">
        <Search
          onChange={event => this.setState({ searchTerm: event.target.value })}
          value={this.state.searchTerm}
          placeholder="Input search term"
          onSearch={() => this.onSearch(1)}
          enterButton
        />
        <div className="images-container">{this.renderImages()}</div>
        <Spin spinning={this.state.spinning} />
        {this.state.searchResults.length !== 0 && (
          <Button
            className="editor-btn"
            onClick={() => this.onSearch(this.state.page + 1)}
          >
            Show more
          </Button>
        )}
      </div>
    );
  }
}
