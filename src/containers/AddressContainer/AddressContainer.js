import React, { Component } from 'react';
import TransactionCard from './../../components/TransactionCard/TransactionCard';
import './AddressContainer.css';

export default class AddressContainer extends Component {
  /**
   * Renders transactions if any, otherwise renders empty state.
   */
  renderTransactions() {
    const { transactions, onSearchAddress } = this.props;

    // If there are transactions
    return (transactions && transactions.length > 0)
      // Render list of transactions
      ? (
        <ul className={'transaction-list'}>
          {transactions.map((transaction, index) => {
            return (
              <li className={'transaction-item'} key={index}>
                <TransactionCard transaction={transaction} onSearchAddress={onSearchAddress} />
              </li>
            );
          })}
        </ul>
      )
      // Otherwise render empty state
      : (
        <ul className={'transaction-list'}>
          <li className={'transaction-item'}>
            <p className={'transaction-empty'}>No transactions found for current address.</p>
          </li>
        </ul>
      );
  }

  render() {
    const { address } = this.props;

    return (
      <article className={'address-container'}>
        <h2 className={'address-title'}>{address}</h2>
        <h4>Recent Transactions</h4>
        {this.renderTransactions()}
      </article>
    );
  }
}