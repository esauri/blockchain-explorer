import React from 'react';
import './SearchInput.css';

export default ({ inputId, onChangeEvent, onKeyDownEvent }) => (
  <input
    type={'text'}
    id={inputId}
    className={'search-input'}
    placeholder={'Enter Ethereum Address'}
    onKeyDown={onKeyDownEvent}
    onChange={onChangeEvent}
  />
);