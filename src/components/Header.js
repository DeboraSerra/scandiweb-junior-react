import React from 'react';
import { Link } from 'react-router-dom';
import { request, gql } from 'graphql-request';
// import { fetchedCurrencies } from '../features/currencies/currenciesSlice';
// import { connect } from 'react-redux';
import logo from '../images/Brand-iconbrand_icon.svg';
import cartImg from '../images/Empty-cart.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      loading: true,
      cart: 0,
    }
  }
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const query = gql`
      {
        currencies {
          label
          symbol
        }
      }
    `
    const url = 'http://localhost:4000';
    const response = await request(url, query);
    this.setState((prevSt) => ({
      ...prevSt,
      currencies: response.currencies,
      loading: false,
    }))
  }

  render() {
    const { currencies, loading, cart } = this.state;
    return (
      loading
        ? <p>Loading</p>
        : (
          <header>
            <nav>
              <Link to="/women">WOMEN</Link>
              <Link to="/men">MEN</Link>
              <Link to="/kids">KIDS</Link>
            </nav>
            <img src={ logo } alt="Brand icon" />
            <section>
              <select name="currency">
                {currencies?.map(({ label, symbol }) => (
                  <option key={ label } value={ label }>{symbol}</option>
                ))}
              </select>
              <section>
                <img src={ cartImg } alt="Cart icon" />
                {cart !== 0 && <section>{cart}</section>}
              </section>
            </section>
          </header>
        )
    )
  }
}

// const mapStateToProps = (state) => ({
//   currencies: state.currencies,
// })

// export default connect(mapStateToProps)(Header);

export default Header;
