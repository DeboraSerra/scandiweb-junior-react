import React from 'react';
import PropTypes from 'prop-types';
import { fetchCurrencies, selectCurr } from '../redux/reducers/currencySlice';
import { connect } from 'react-redux';
import logo from '../images/Brand-iconbrand_icon.svg';
import cartImg from '../images/Empty-cart.svg';
import up from '../images/up.svg';
import down from '../images/down.svg';
import style from '../styles/Header.module.css';
import { fetchCategories, fetchCategory, selectCategory } from '../redux/reducers/categorySlice';
import FloatCart from './FloatCart';
import { Link, NavLink } from 'react-router-dom';
import Currencies from './Currencies';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'USD',
      selectSymbol: '$',
      location: 'all',
      show: false,
      showCurr: false,
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    await dispatch(fetchCategories());
    await dispatch(fetchCategory('all'));
    await dispatch(selectCategory({ category:  'all' }));
  }

  handleChange = ({ target: { innerText: value } }) => {
    this.setState((prevSt) => ({
      ...prevSt,
      selected: value.split(' ')[1],
      selectSymbol: value.split(' ')[0],
      showCurr: false,
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
    }), async () => {
      const { dispatch } = this.props;
      await dispatch(fetchCategory(category));
      dispatch(selectCategory({ category }));
    })
  }

  handleCart = () => {
    this.setState((prevSt) => ({
      ...prevSt,
      show: prevSt.show === 'block' ? 'none' : 'block',
      showCurr: false,
    }))
  }

  showCurrTable = () => {
    this.setState((prevSt) => ({
      ...prevSt,
      showCurr: !prevSt.showCurr,
    }))
  }

  render() {
    const { loading, cart, categories } = this.props;
    const { location, show, showCurr, selectSymbol } = this.state;
    return (
      loading
        ? <p className="loading">Loading</p>
        : (
          <header className={ style.header }>
            <nav className={ style.nav }>
              {categories?.map((cat) => (
                <section key={ cat.name } className={ location === cat.name ? style.active : style.link_box }>
                  <Link to="/" type="button" className={ style.link } onClick={this.handleClick}>
                    {cat.name.toUpperCase()}
                  </Link>
                </section>
              ))}
            </nav>
            <img className={ style.logo } src={ logo } alt="Brand icon" />
            <section className={ style.select_cart }>
              <section className={ style.select_sect }>
                <section  className={ style.select } onClick={ this.showCurrTable }>
                  <p>{selectSymbol}</p>
                  <img className={ style.arrow } src={ showCurr ? up : down } alt={ showCurr ? 'Close currencies' : 'Select currency' } />
                </section>
                {showCurr && (
                  <Currencies changeCurr={ this.handleChange } />
                )}
              </section>
              <section className={ style.cart } onClick={ this.handleCart }>
                <img className={ style.cart_img } src={ cartImg } alt="Cart icon" />
                {cart.reduce((acc, { amount }) => acc + amount, 0) !== 0 && (
                  <section className={ style.amount }>
                    {cart.reduce((acc, { amount }) => acc + amount, 0)}
                  </section>
                )}
              </section>
            </section>
            {show && <FloatCart show={ show } hideCart={ this.handleCart } />}
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
  cart: PropTypes.array.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
}

const mapStateToProps = (state) => ({
  currencies: state.currencies.currencies,
  loading: state.currencies.loading,
  cart: state.cart.cart,
  categories: state.category.allCategories,
})

export default connect(mapStateToProps)(Header);
