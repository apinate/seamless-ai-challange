import React from 'react';
import PropTypes from 'prop-types';

import DomainsTableRow from './domains-table-row';

const DomainsTable = (props) => {
  const renderRow = data => <DomainsTableRow key={data.name} data={data} />;
  const { companies } = props;

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
        {props.companies.map(renderRow)}
      </tbody>
    </table>
  );
};

DomainsTable.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DomainsTable;
