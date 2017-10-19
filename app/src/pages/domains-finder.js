import React, { Component } from 'react';
import { DomainsTable, SearchBar } from '../components';
import logger from '../logger';
import { findCompaniesDomains } from '../api';

const extractNames = namesString => namesString.split(',').map(name => name.trim()).filter(name => !!name);

const validation = (names) => {
  if (!names.length) {
    throw new Error('No search query provided.');
  } else if (names.length > 25) {
    throw new Error('Requested Company Domains Exceeds the Limit of 25');
  }
};

class DomainsFinder extends Component {
  state = { companies: [] };

  findCompaniesDomains = async (names) => {
    try {
      const companies = (await findCompaniesDomains(names));
      this.setState({ companies });
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    return (
      <div className="domains-finder">
        <SearchBar
          onSearch={this.findCompaniesDomains}
          validation={validation}
          queryExtractor={extractNames}
        />
        <DomainsTable companies={this.state.companies} />
      </div>
    );
  }
}

export default DomainsFinder;
