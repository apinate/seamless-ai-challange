import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './search-bar.css';

class SearchBar extends PureComponent {
  static propTypes = {
    searchPlaceholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
  };

  static defaultProps = {
    hasError: false,
  };

  state = { value: '' };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onSearch(this.state.value);
  }

  render() {
    const { searchPlaceholder, hasError } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="mt-3 d-flex flex-wrap flex-row justify-content-between align-content-center">
        <div className={`form-group search-input-container col-lg-10 ${hasError && 'has-danger'}`}>
          <div className="input-group search-input-group">
            <span className="input-group-addon search-icon-addon">
              <i className="fa fa-search" aria-hidden="true" />
            </span>
            <input
              placeholder={searchPlaceholder}
              id="search-input"
              type="search"
              value={this.state.value}
              onChange={this.onChange}
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Find Domains</button>
      </form>
    );
  }
}

export default SearchBar;
