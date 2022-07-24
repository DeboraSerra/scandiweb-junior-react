import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Attributes from './Attributes';
import { increase, decrease, removeItem } from '../redux/reducers/cartSlice';
import ProdGallery from './ProdGallery';

class CartProd extends React.Component {
  handleDecrease = (prod) => {
    const { dispatch } = this.props;
    if (prod.amount > 1) {
      dispatch(decrease(prod))
    } else {
      dispatch(removeItem(prod))
    }
  }

  render() {
    const { prod, dispatch, currency, style, history } = this.props;
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
          <button type="button" className={ style.amount_btn } onClick={ () => this.handleDecrease(prod) }>-</button>
        </section>
        <section>
          <ProdGallery images={ prod.gallery } name={ prod.name } style={ style } history={ history } id={ prod.id } />
        </section>
      </>
    );
  }
}

CartProd.propTypes = {
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
  currency: PropTypes.string,
  style: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.currencies.selectedCurr,
})

export default connect(mapStateToProps)(CartProd);
