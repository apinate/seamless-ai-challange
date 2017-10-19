import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = { value: '' };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  onClick = () => {
    const { queryExtractor, onSearch } = this.props;
    const queryData = (queryExtractor && queryExtractor(this.state.value)) || this.state.value;

    if (this.validate(queryData)) {
      onSearch(queryData);
    }
  }

  validate(queryData) {
    let error = '';
    try {
      const { validation } = this.props;
      if (validation) {
        validation(queryData);
      }
    } catch (err) {
      error = err.message;
    }
    this.setState({ error });

    return !error;
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChange}
          className={`search-input ${this.state.error ? 'validation-error' : ''}`}
        />
        <button onClick={this.onClick}>Find Domains</button>
        <div className="validation-error">
          <span>{this.state.error}</span>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  validation: PropTypes.func,
  queryExtractor: PropTypes.func,
};

SearchBar.defaultProps = {
  validation: _ => null,
  queryExtractor: value => value,
};

export default SearchBar;
