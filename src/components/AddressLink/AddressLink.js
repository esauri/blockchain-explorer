import React from 'react';
import './AddressLink.css';

/**
 * AddressLink
 *
 * Stateless function component that returns an A that acts as a button.
 * When pressed calls onSearchAddress and sends its address.
 */
export default ({ address, children, onSearchAddress }) => (
  <a
    role={'button'}
    className={'Address-Link'}
    onClick={() => onSearchAddress(address)}
  >
    {children}
  </a>
);
