import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProd from '../components/CartProd';
import style from '../styles/Cart.module.css';

class Cart extends React.Component {
  render() {
    const { cart, currencies, currency, history } = this.props;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency);
    const total = cart.reduce((acc, item) => acc + (price(item).amount * item.amount),0).toFixed(2);
    const selectedCurr = currencies.find(({ label }) => label === currency);
    return (
      <section className={ style.cart_page }>
        <h2 className={ style.cart_title }>CART</h2>
        <section className={ style.cards_sect }>
          {cart.map((item, index) =>
            <section className={ style.prod_card } key={ item.id + item.name + index }>
              <CartProd prod={ item } handleDecrease={ this.handleDecrease } style={ style } history={ history } />
            </section>
          )}
        </section>
        <section className={ style.price_sect }>
          <p className={ style.price_p }>Tax 21%: <span className={ style.price_span }>{selectedCurr.symbol + (total * 0.21).toFixed(2)}</span></p>
          <p className={ style.price_p }>Quantity: <span className={ style.price_span }>{cart.reduce((acc, item) => acc + item.amount, 0)}</span></p>
          <p className={ style.price_p }>Total: <span className={ style.price_span }>{selectedCurr.symbol + total}</span></p>
        </section>
        <section className={ style.link_sect }>
          <Link className={ style.link } to="/checkout">ORDER</Link>
        </section>
      </section>
    );
  }


}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    prices: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.shape({
        label: PropTypes.string,
        symbol: PropTypes.string,
      }),
      amount: PropTypes.number,
    })),
    gallery: PropTypes.arrayOf(PropTypes.string),
    attributes: PropTypes.arrayOf(PropTypes.object),
  }).isRequired),
  currencies: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currencies: state.currencies.currencies,
  currency: state.currencies.selectedCurr,
})

export default connect(mapStateToProps)(Cart);
