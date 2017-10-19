import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = { value: '' };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  render() {
    const { onSearch } = this.props;
    return (
      <div className="search-bar">
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <button onClick={() => onSearch(this.state.value)}>Find Domains</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
