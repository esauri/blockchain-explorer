import React from 'react';
import './SearchLabel.css';

/**
 * SearchLabel
 *
 * Returns label for the address-search input.
 */
export default ({ children, disabled, inputId }) => (
  <label
    htmlFor={inputId}
    className={`${disabled ? 'search-label disabled' : 'search-label'}`}
  >
    {children}
  </label>
);
