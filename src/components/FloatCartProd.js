import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Attributes from './Attributes';
import { increase } from '../redux/reducers/cartSlice';

class FloatCartProd extends React.Component {
  render() {
    const { prod, dispatch, handleDecrease, currency, style } = this.props;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency);
    return (
      <>
        <section className={ style.item_info }>
          <p className={ style.brand }>{prod.brand}</p>
          <p className={ style.name }>{prod.name}</p>
          <p className={ style.price }>{price(prod).currency.symbol + ' ' + price(prod).amount}</p>
          {prod.attributes.map((att) => (
            <Attributes style={ style } key={ att.id + att.name } attributes={ att } selected={ prod.attributesSelected } />
          ))}
        </section>
        <section className={ style.amount_sect }>
          <button type="button" className={ style.amount_btn } onClick={ () => dispatch(increase(prod)) }>+</button>
          <p className={ style.amount_item }>{prod.amount}</p>
          <button type="button" className={ style.amount_btn } onClick={ () => handleDecrease(prod) }>-</button>
        </section>
        <img className={ style.img_cart } src={prod.gallery[0]} alt={prod.brand + ' ' + prod.name} />
      </>
    );
  }
}

FloatCartProd.propTypes = {
  prod: PropTypes.shape({
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
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.currencies.selectedCurr,
});

export default connect(mapStateToProps)(FloatCartProd);
