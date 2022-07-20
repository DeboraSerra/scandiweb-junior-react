import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cartImg from '../images/Empty_Cart_white.svg';
import style from '../styles/Shop.module.css';
import { addItem } from '../redux/reducers/cartSlice';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      products: props.products.products,
      name: props.products.name,
      target: '',
    }
  }

  mouseEnter = ({ target: { id } }) => {
    this.setState((prevSt) => ({
      ...prevSt,
      target: id,
    }))
  }

  mouseLeave = () => {
    this.setState((prevSt) => ({
      ...prevSt,
      target: '',
    }))
  }

  handleClick = (prod) => {
    const { dispatch } = this.props;
    if (prod.inStock) {
      const attributesSelected = prod.attributes.map(({ id, items }) => ({ id, item: items[0].id }));
      dispatch(addItem({ ...prod,  attributesSelected, amount: 1 }));
    }
  }

  render() {
    const { loading, products, name, currency } = this.props;
    const { target } = this.state;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency)
    return (
      loading ? <p className="loading">Loading</p> : (
        <>
          <h2 className={ style.cat_name }>{name[0].toUpperCase() + name.slice(1)}</h2>
          <section className={ style.cards_sect }>
            {products.map((prod) => (
              <section
                key={ prod.id }
                id={ prod.id }
                className={ style.card }
                onMouseEnter={ this.mouseEnter }
                onMouseLeave={ this.mouseLeave }
              >
                <img
                  src={ prod.gallery[0] }
                  alt={ prod.name }
                  className={ prod.inStock ? style.img : style.out }
                />
                {!prod.inStock && <p className={ style.out_msg }>OUT OF STOCK</p>}
                <h2 className={ style.card_name }>
                  {prod.brand + ' ' + prod.name}
                </h2>
                <p className={ style.card_price }>
                  {price(prod).currency.symbol + ' ' + price(prod).amount}
                </p>
                <button
                  type="button"
                  className={ target === prod.id ? style.cart_btn : style.hide_btn }
                  onClick={ () => this.handleClick(prod) }
                >
                  <img className={ style.card_cart } src={ cartImg } alt="Add to cart" />
                </button>
              </section>
            ))}
          </section>
        </>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.category.category,
  products: state.category.products,
  loading: state.category.loading,
  currency: state.currencies.selectedCurr,
})

// Shop.propTypes = {
//   name: PropTypes.string.isRequired,
//   products: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string,
//     gallery: PropTypes.arrayOf(PropTypes.string),
//     name: PropTypes.string,
//     prices: PropTypes.arrayOf(PropTypes.shape({
//       currency: PropTypes.any.shape({
//         label: PropTypes.string,
//         symbol: PropTypes.string,
//       }),
//       amount: PropTypes.number,
//     })),
//   })).isRequired,
//   loading: PropTypes.bool.isRequired,
//   currency: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(Shop);
