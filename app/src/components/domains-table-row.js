import React from 'react';
import PropTypes from 'prop-types';

const DomainsTableRow = ({ data: { name, domain } }) => (
  <div className="domains-table-row">
    <span className="name-column">{name}</span>
    :
    <span className="domain-column">{domain}</span>
  </div>
);

DomainsTableRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }).isRequired,
};

export default DomainsTableRow;
