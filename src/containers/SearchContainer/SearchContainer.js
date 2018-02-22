import React, { Component } from 'react';
import SearchInput from './../../components/SearchInput/SearchInput';
import SearchLabel from './../../components/SearchLabel/SearchLabel';
import SearchButton from './../../components/SearchButton/SearchButton';
import './SearchContainer.css';

export default class SearchContainer extends Component {

  /**
   * Handles keydown event on input.
   * If 'Enter' key was pressed calls and searchterm is not empty
   * then it calls the onSearchAddress function.
   *
   * @param e
   */
  onKeyDownEvent(e) {
    const { searchterm, onSearchAddress } = this.props;

    // If enter was pressed
    if (e.which === 13 && searchterm && searchterm.trim('') !== '') {
      // Emit search event
      onSearchAddress(searchterm);
    }
  }

  render() {
    const { searchterm, onChangeEvent, onSearchAddress } = this.props;

    // If no searchterm or if it's empty disable searching
    const disableSearch = !searchterm || searchterm.trim('') === '';

    return (
      <div>
        <SearchInput inputId={'address-search'} onChangeEvent={onChangeEvent} onKeyDownEvent={this.onKeyDownEvent.bind(this)} />
        <section className={'search-info'}>
          <SearchLabel disabled={disableSearch} inputId={'address-search'}>
            Hit enter to search Ethereum address.
          </SearchLabel>
          <SearchButton disabled={disableSearch} onClickEvent={() => onSearchAddress(searchterm)}>
            Search
          </SearchButton>
        </section>
      </div>
    );
  }
}
