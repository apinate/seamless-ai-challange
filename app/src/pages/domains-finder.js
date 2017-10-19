import React, { Component } from 'react';
import { SearchBar, DomainsTable } from '../components';

import { findCompaniesDomains } from '../api';

class DomainsFinder extends Component {
  state = { companies: [] };

  findCompaniesDomains = async (names) => {
    const companies = await findCompaniesDomains(names);
    this.setState({ companies });
  }

  render() {
    return (
      <div className="domains-finder">
        <SearchBar onSearch={this.findCompaniesDomains} />
        <DomainsTable companies={this.state.companies} />
      </div>
    );
  }
}

export default DomainsFinder;
