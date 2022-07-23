import React from 'react';
import { connect } from 'react-redux';
import CartProd from '../components/CartProd';
import { decrease, removeItem } from '../redux/reducers/cartSlice';
import style from '../styles/Cart.module.css';

class Cart extends React.Component {

  handleDecrease = (prod) => {
    const { dispatch } = this.props;
    if (prod.amount > 1) {
      dispatch(decrease(prod))
    } else {
      dispatch(removeItem(prod))
    }
  }

  render() {
    const { cart } = this.props;
    return (
      <section className={ style.cart_page }>
        <h2>CART</h2>
        {cart.map((item) =>
          <CartProd prod={ item } handleDecrease={ this.handleDecrease } style={ style } />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
})

export default connect(mapStateToProps)(Cart);
