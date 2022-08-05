import React from 'react';
import style from '../styles/Loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <section className={ style.main }>
        <section className={ style.loading } />
      </section>
    )
  }
}

export default Loading;
