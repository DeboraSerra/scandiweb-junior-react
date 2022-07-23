import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../styles/FloatCart.module.css';
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
            {cart.map((prod) => (
              <section key={ prod.id } className={ style.item }>
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

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency: state.currencies.selectedCurr,
  currencies: state.currencies.currencies,
})

export default connect(mapStateToProps)(FloatCart);
