import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DomainsTable extends PureComponent {
  static propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  render() {
    const { companies } = this.props;
    if (!companies || !companies.length) {
      return null;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Domain Name</th>
          </tr>
        </thead>
        <tbody>
          {
            companies.map(({ name, domain }) => (
              <tr key={name}>
                <td >{name}</td>
                <td>{domain}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default DomainsTable;
