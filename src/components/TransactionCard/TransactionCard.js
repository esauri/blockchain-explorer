import React from 'react';
import Address from './../AddressLink/AddressLink';
import './TransactionCard.css';

/**
 * TransactionCard
 *
 * Returns card component with transaction amount, and address links for sender and receiver.
 */
export default ({ transaction, onSearchAddress }) => (
  <section className={'transaction-container'}>
    <p>
      Amount: <span className={'transaction-amount'}>{transaction.value}</span>
    </p>
    <p>
      From: <Address address={transaction.from} onSearchAddress={onSearchAddress}>{transaction.from}</Address>
    </p>
    <p>
      To: <Address address={transaction.to} onSearchAddress={onSearchAddress}>{transaction.to}</Address>
    </p>
  </section>
);
