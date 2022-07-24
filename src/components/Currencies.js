import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../styles/Header.module.css';

class Currencies extends React.Component {
  render() {
    const { currencies, changeCurr } = this.props;
    return (
      <table className={ style.curr_table }>
        {currencies.map(({ symbol, label }) => (
          <tr className={ style.curr_row } onClick={ changeCurr }>{`${symbol} ${label}`}</tr>
        ))}
      </table>
    );
  }
}

Currencies.propTypes = {
  currencies: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  changeCurr: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies.currencies,
});

export default connect(mapStateToProps)(Currencies);
