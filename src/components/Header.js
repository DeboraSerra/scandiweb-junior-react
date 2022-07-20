import React from 'react';
import PropTypes from 'prop-types';
import { fetchCurrencies, selectCurr } from '../redux/reducers/currencySlice';
import { connect } from 'react-redux';
import logo from '../images/Brand-iconbrand_icon.svg';
import cartImg from '../images/Empty-cart.svg';
import style from '../styles/Header.module.css';
import { fetchCategory, selectCategory } from '../redux/reducers/categorySlice';
import FloatCart from './FloatCart';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'USD',
      location: 'all',
      show: false,
    }
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    await dispatch(fetchCategory());
    await dispatch(selectCategory({ category:  'all' }));
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

  handleClick = ({ target }) => {
    const category = target.innerText.toLowerCase();
    this.setState((prevSt) => ({
      ...prevSt,
      location: category,
    }), () => {
      const { dispatch } = this.props;
      dispatch(selectCategory({ category }));
    })
  }

  showCart = () => {
    this.setState((prevSt) => ({
      ...prevSt,
      show: true,
    }))
  }

  hideCart = () => {
    this.setState((prevSt) => ({
      ...prevSt,
      show: false,
    }))
  }

  render() {
    const { currencies, loading, cart } = this.props;
    const { selected, location, show } = this.state;
    return (
      loading
        ? <p className="loading">Loading</p>
        : (
          <header className={ style.header }>
            <nav className={ style.nav }>
              <section className={ location === 'all' ? style.active : style.link_box }>
                <button type="button" className={ style.link } onClick={this.handleClick}>
                  ALL
                </button>
              </section>
              <section className={ location === 'clothes' ? style.active : style.link_box }>
                <button type="button" className={ style.link } onClick={this.handleClick}>
                  CLOTHES
                </button>
              </section>
              <section className={ location === 'tech' ? style.active : style.link_box }>
                <button type="button" className={ style.link } onClick={this.handleClick}>
                  TECH
                </button>
              </section>
            </nav>
            <img className={ style.logo } src={ logo } alt="Brand icon" />
            <section className={ style.select_cart }>
              <select  className={ style.select } name="currency" onChange={ this.handleChange } value={ selected }>
                {currencies?.map(({ label, symbol }) => (
                  <option key={ label } value={ label }>{symbol}</option>
                ))}
              </select>
              <section className={ style.cart } onMouseEnter={this.showCart} onMouseLeave={this.hideCart}>
                <img src={ cartImg } alt="Cart icon" />
                {cart !== 0 && (
                  <section className={ style.amount }>
                    {cart.reduce((acc, { amount }) => acc + amount, 0) }
                  </section>
                )}
              </section>
            </section>
            {show && <FloatCart mouseEnter={ this.showCart } mouseLeave={ this.hideCart } />}
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
  cart: state.cart.cart,
})

export default connect(mapStateToProps)(Header);
