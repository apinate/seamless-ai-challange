import React from 'react';
import PropTypes from 'prop-types';

const DomainsTableRow = ({ data: { name, domain } }) => (
  <tr>
    <td >{name}</td>
    <td>{domain}</td>
  </tr>
);

DomainsTableRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }).isRequired,
};

export default DomainsTableRow;
