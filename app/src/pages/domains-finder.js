import React, { PureComponent } from 'react';
import { DomainsTable, SearchBar } from '../components';
import logger from '../logger';
import { findCompaniesDomains } from '../api';
import './domains-finder.css';

const extractNames = (namesString) => {
  const names = namesString.split(',').map(name => name.trim()).filter(name => !!name);
  return [...new Set(names)];
};

class DomainsFinder extends PureComponent {
  state = { companies: [], queryError: '', hasServerError: false };

  onSearch = async (namesString) => {
    let hasServerError;
    try {
      const names = extractNames(namesString);
      if (this.validate(names)) {
        const companies = await findCompaniesDomains(names);
        this.setState({ companies });
      }
    } catch (err) {
      hasServerError = !!err;
      logger.error(err);
    } finally {
      this.setState({ hasServerError });
    }
  }

  get queryHasError() {
    return !!this.state.queryError;
  }

  validate = (names) => {
    let queryError;
    if (!names.length) {
      queryError = 'No search query provided.';
    } else if (names.length > 25) {
      queryError = 'Requested Company Domains Exceeds the Limit of 25';
    }

    this.setState({ queryError });
    return !queryError;
  }

  render() {
    return (
      <div className="container">
        <SearchBar
          searchPlaceholder="Enter company names separated by comma (e.g. 'company1, company2')"
          onSearch={this.onSearch}
          hasError={this.queryHasError}
        />
        <div className="p-1 error-message" role="alert">
          {
            (this.queryHasError && <small className="text-danger">{this.state.queryError}</small>)
            ||
            (this.state.hasServerError && <strong className="text-danger">Could not find any result</strong>)
          }
        </div>
        <DomainsTable companies={this.state.companies} />
      </div>
    );
  }
}

export default DomainsFinder;
