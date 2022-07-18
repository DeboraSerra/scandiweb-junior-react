import React from 'react';
import { Link } from 'react-router-dom';
import { request, gql } from 'graphql-request';
import { fetchedCurrencies } from '../features/currencies/currenciesSlice';
import { connect } from 'react-redux';
import logo from '../images/Brand-iconbrand_icon.svg';
import cart from '../images/Empty-cart.svg';

class Header extends React.Component {
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    const { dispatch } = this.props;
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
    dispatch(fetchedCurrencies({ payload:  response.currencies }));
    console.log({response});
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
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
          <img src={ cart } alt="Cart icon" />
        </section>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
})

export default connect(mapStateToProps)(Header);
