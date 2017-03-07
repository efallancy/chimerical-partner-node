import React, { Component } from "react";

class NewsHeader extends Component {
  render() {
    // Will receive data from props.categories
    let categories = this.props.categories;

    let categoryElements = categories.map( ( category, key ) => {
      return (  <option
                  value = { category }
                  key   = { key }
                >
                  { category }
                </option> );
    } );

    return (
      <div className="news-header">
        <select name="categories" onChange={ this.props.onchange }>
          { categoryElements }
        </select>
      </div>
    )
  }
}

export default NewsHeader;
