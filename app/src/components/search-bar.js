import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search-bar.css';

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

  get hasError() {
    return this.state.error;
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

  classNamesOnError(classNames) {
    return this.hasError ? classNames : '';
  }

  render() {
    return (
      <div className="mt-3">
        <div className="d-flex flex-wrap flex-row justify-content-between align-content-center">
          <div className={`form-group search-input-container col-lg-10 ${this.classNamesOnError('has-danger')}`}>
            <div className="input-group search-input-group">
              <span className="input-group-addon search-icon-addon">
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                placeholder={this.props.searchPlaceholder}
                id="search-input"
                type="search"
                value={this.state.value}
                onChange={this.onChange}
                className="form-control"
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={this.onClick}>Find Domains</button>
        </div>
        <div className={`text-danger ${this.hasError ? '' : 'invisible'}`} >
          <small>{this.state.error || 'No Error'}</small>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchPlaceholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  validation: PropTypes.func,
  queryExtractor: PropTypes.func,
};

SearchBar.defaultProps = {
  validation: _ => null,
  queryExtractor: value => value,
};

export default SearchBar;
