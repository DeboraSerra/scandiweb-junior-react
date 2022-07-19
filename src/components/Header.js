import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCurrencies, selectCurr } from '../redux/reducers/currencySlice';
import { connect } from 'react-redux';
import logo from '../images/Brand-iconbrand_icon.svg';
import cartImg from '../images/Empty-cart.svg';
import style from '../styles/Header.module.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'USD',
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { value } }) => {
    this.setState((prevSt) => ({
      ...prevSt,
      selected: value,
    }), () => {
      const { selected } = this.state;
      const { dispatch } = this.props;
      dispatch(selectCurr(selected));
    })
  }

  render() {
    const { currencies, loading, cart } = this.props;
    const { selected } = this.state;
    return (
      loading
        ? <p className="loading">Loading</p>
        : (
          <header className={ style.header }>
            <nav className={ style.nav }>
              <section className={ style.active }>
                <Link className={ style.link } to="/women">WOMEN</Link>
              </section>
              <section className={ style.link_box }>
                <Link className={ style.link } to="/men">MEN</Link>
              </section>
              <section className={ style.link_box }>
                <Link className={ style.link } to="/kids">KIDS</Link>
              </section>
            </nav>
            <img className={ style.logo } src={ logo } alt="Brand icon" />
            <section className={ style.select_cart }>
              <select  className={ style.select } name="currency" onChange={ this.handleChange } value={ selected }>
                {currencies?.map(({ label, symbol }) => (
                  <option key={ label } value={ label }>{symbol}</option>
                ))}
              </select>
              <section className={ style.cart }>
                <img src={ cartImg } alt="Cart icon" />
                {cart !== 0 && <section className={ style.amount }>{cart}</section>}
              </section>
            </section>
          </header>
        )
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  cart: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  currencies: state.currencies.currencies,
  loading: state.currencies.loading,
  cart: state.cart.cart.length,
})

export default connect(mapStateToProps)(Header);
