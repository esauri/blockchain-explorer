import React from 'react';
import './ErrorMessage.css';

export default ({ address, errorMessage }) => (
  <article className={'error-container'}>
    <section className={'error-info'}>
      <h2>Error</h2>
      <p className={'error-message'}>{errorMessage}</p>
      <p className={'error-address-info'}>For address: <span className={'error-address'}>{address}</span></p>
    </section>
  </article>
);