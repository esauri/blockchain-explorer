import React from 'react';
import './SearchButton.css';

/**
 * SearchButton
 *
 * Returns button that when pressed searches for ethereum address.
 */
export default ({ children, disabled, onClickEvent }) => (
  <button
    className={'search-btn'}
    disabled={disabled}
    type={'button'}
    onClick={onClickEvent}
  >
    {children}
  </button>
);