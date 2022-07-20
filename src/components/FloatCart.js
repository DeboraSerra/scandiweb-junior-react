import React from 'react';
import { connect } from 'react-redux';
import Attributes from './Attributes';
import style from '../styles/FloatCart.module.css';

class FloatCart extends React.Component {
  render() {
    const { cart, currency, mouseEnter, mouseLeave } = this.props;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency);
    return (
      <section className={ style.back } onMouseEnter={ mouseEnter } onMouseLeave={ mouseLeave }>
        <section className={ style.cart }>
          <section className={ style.cart_title }>
            <h3 className={ style.title }>My Bag</h3>
            <p className={ style.amount }>{cart.reduce((acc, { amount }) => acc + amount, 0) } items</p>
          </section>
          <section className={ style.items_sect }>
            {cart.map((prod) => (
              <section key={ prod.id } className={ style.items }>
                <p className={ style.brand }>{prod.brand}</p>
                <p className={ style.name }>{prod.name}</p>
                <p className={ style.price }>{price(prod).currency.symbol + ' ' + price(prod).amount}</p>
                {prod.attributes.map((att) => (
                  <Attributes key={ att.id } attributes={ att } selected={ prod.attributesSelected } />
                ))}
              </section>
            ))}
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency: state.currencies.selectedCurr,
})

export default connect(mapStateToProps)(FloatCart);
