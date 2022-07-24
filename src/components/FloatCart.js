import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../styles/FloatCart.module.css';
import PropTypes from 'prop-types';
import { decrease, removeItem } from '../redux/reducers/cartSlice';
import FloatCartProd from './FloatCartProd';

class FloatCart extends React.Component {

  handleDecrease = (prod) => {
    const { dispatch } = this.props;
    if (prod.amount > 1) {
      dispatch(decrease(prod))
    } else {
      dispatch(removeItem(prod))
    }
  }
  render() {
    const { cart, show, currency, currencies, hideCart } = this.props;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency);
    const selectedCurr = currencies.find((item) => item.label === currency).symbol;
    return (
      <section className={ style.back } style={{ display: show }}>
        <section className={ style.cart }>
          <section className={ style.cart_title }>
            <h3 className={ style.title }>My Bag</h3>
            <p className={ style.amount }>{cart.reduce((acc, { amount }) => acc + amount, 0) } items</p>
          </section>
          <section className={ style.items_sect }>
            {cart.map((prod, index) => (
              <section key={ prod.id + prod.name + index } className={ style.item }>
                <FloatCartProd prod={ prod } handleDecrease={ this.handleDecrease } style={ style } />
              </section>
            ))}
          </section>
          <section className={ style.price_sect}>
              <p className={ style.price_title }>Total</p>
              <p className={ style.price_value }>
                {selectedCurr + cart.reduce((acc, item) => acc + (price(item).amount * item.amount),0).toFixed(2)}
              </p>
          </section>
          <section className={ style.btn_sect }>
            <Link to="/cart" className={ style.btn_to_cart } onClick={ hideCart }>VIEW BAG</Link>
            <Link to="/checkout" className={ style.btn_checkout }>CHECK OUT</Link>
          </section>
        </section>
      </section>
    );
  }
}

FloatCart.propTypes = {
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
  })).isRequired,
  show: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
  })).isRequired,
  hideCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency: state.currencies.selectedCurr,
  currencies: state.currencies.currencies,
})

export default connect(mapStateToProps)(FloatCart);
