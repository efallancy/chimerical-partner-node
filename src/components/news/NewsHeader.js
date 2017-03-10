import React, { Component } from "react";

class NewsHeader extends Component {
  render() {
    // Will receive data from props.categories
    let categories = this.props.categories;

    let categoryElements = categories.map( ( category, key ) => {
      let value = "";
      let textDisplay = "";

      for( var identifier in category ) {
        value = identifier;
        textDisplay = category[ identifier ];
      }

      return (
        <option value={ value } key={ key }>
          { textDisplay }
        </option>
      );

    } );

    return (
      <div className="news-header row">
      <div className="two columns">
        <img src="https://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_30a.png"
             className="nytimes-logo"
        />
      </div>
      <div className="ten columns">
        <select className="u-full-width categories-select" name="categories" onChange={ this.props.onchange }>
          { categoryElements }
        </select>
      </div>
      </div>
    )
  }
}

// Props Validation
NewsHeader.propTypes = {
  onchange: React.PropTypes.func,
  categories: React.PropTypes.array
};

export default NewsHeader;
