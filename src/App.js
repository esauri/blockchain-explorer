import React, { Component } from 'react';
import axios from 'axios';
import EmptyContainer from './containers/EmptyContainer/EmptyContainer';
import SearchContainer from './containers/SearchContainer/SearchContainer';
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
          <EmptyContainer onSearchAddress={this.onSearchAddress} />
        </section>
      </main>
    );
  }
}

export default App;
