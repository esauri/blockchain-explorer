import React, { Component } from 'react';
import axios from 'axios';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import EmptyContainer from './containers/EmptyContainer/EmptyContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
import AddressContainer from './containers/AddressContainer/AddressContainer';
import apiKey from './utils/getApiKey';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      address: null,
      searchterm: null,
      transactions: null,
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onSearchAddress = this.onSearchAddress.bind(this);
    this.getEthereumAddress = this.getEthereumAddress.bind(this);
  }

  /**
   * Gets an Ethereum addresses's information from Etherscan API.
   *
   * @param {string} address
   */
  async getEthereumAddress(address) {
    try {
      const params = {
        apiKey: apiKey,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 5,
      };

      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}`;
      const response = await axios.get(url, { params });
      const data = response.data;
      console.log(data);

      // Update app state based on response
      this.setState({
        // Make the searched string the address
        address,
        // If status is 0 then there was an error
        errorMessage: (data.status === '0')
          // Set error message based on result
          ? data.result.length
            // In this case error message is sent as result
            ? data.result
            // In this case error message is sent in message as result is an empty array (for no results found)
            : data.message
          : null,
        // If response status is 1 then we successfully found the address
        transactions: (data.status === '1')
          // Set transactions to result
          ? data.result
          : null,
      })
    } catch (e) {
      console.error(e);
      // Update state with error message
      this.setState({
        address,
        transactions: null,
        errorMessage: 'Error accessing address.',
      })
    }
  }

  /**
   * Updates searchterm based on user input
   *
   * @param e
   */
  onChangeEvent(e) {
    this.setState({ searchterm: e.target.value });
  }

  /**
   * Verifies that address is not empty and retrieves address information
   *
   * @param {string} searchterm
   */
  onSearchAddress(searchterm) {
    // If no searchterm or if its empty exit
    if (!searchterm || searchterm.trim('') === '')
      return;

    // Otherwise get ethereum address
    this.getEthereumAddress(searchterm);
  }

  /**
   * Returns content based on state of the app
   *
   */
  renderContent() {
    const { address, transactions, errorMessage } = this.state;

    // If there is an error message
    return (errorMessage)
      // Return error message content
      ? <ErrorMessage address={address} errorMessage={errorMessage} />
      // Otherwise if we have address and transaction
      : (address && transactions)
        // Return address content
        ? <AddressContainer address={address} transactions={transactions} onSearchAddress={this.onSearchAddress} />
        // Otherwise return empty state
        : <EmptyContainer onSearchAddress={this.onSearchAddress} />;

  }

  render() {
    const { searchterm } = this.state;

    return (
      <main>
        {/* Header */}
        <header className={'app-header container'}>
          <h1 className={'app-title'}>Blockchain Explorer</h1>
          <SearchContainer
            searchterm={searchterm}
            onChangeEvent={this.onChangeEvent}
            onSearchAddress={this.onSearchAddress}
          />
        </header>
        {/* Content */}
        <section className={'container'}>
          {this.renderContent()}
        </section>
      </main>
    );
  }
}

export default App;
