import React from 'react';
import PropTypes from 'prop-types';

import DomainsTableRow from './domains-table-row';

const DomainsTable = (props) => {
  const renderRow = data => <DomainsTableRow key={data.name} data={data} />;

  return (
    <div className="domains-table">
      {props.companies.map(renderRow)}
    </div>
  );
};

DomainsTable.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DomainsTable;
