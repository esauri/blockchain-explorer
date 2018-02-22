import React from 'react';
import Address from './../../components/AddressLink/AddressLink';
import addresses from './../../utils/getDefaultAddresses';
import './EmptyContainer.css';

/**
 * EmptyContainer
 *
 * Empty state for the app.
 * Displays list of preset addresses for quick look up.
 */
export default ({ onSearchAddress }) => (
  <article className={'Empty-Container'}>
    <h2>Find the latest transactions</h2>
    <p>To begin look up an address above or select one of these preset addresses:</p>
    <ul className={'Address-List'}>
      { addresses.map((address, index) => {
        return (
          <li className={'Address-Item'} key={index} >
            <Address
              address={address}
              onSearchAddress={onSearchAddress}
            >
            {address}
          </Address>
          </li>
        );
      }) }
    </ul>
  </article>
);
