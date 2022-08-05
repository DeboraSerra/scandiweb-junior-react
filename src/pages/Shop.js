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
      loading: true,
      products: [],
      name: '',
    }
  }

  componentDidMount() {
    const { products, name } = this.props;
    this.setState({ loading: true }, () => {
      this.setState({
        products,
        name,
        loading: false,
      })
    })
  }

  handleClick = (prod) => {
    const { dispatch } = this.props;
    if (prod.inStock) {
      const attributesSelected = prod.attributes.map(({ id, items }) => ({ id, item: items[0].value }));
      dispatch(addItem({ ...prod,  attributesSelected, amount: 1 }));
    }
  }

  render() {
    const { loading, products, name, currency, history } = this.props;
    const price = (prod) => prod.prices.find(({ currency: { label } }) => label === currency);
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
                  onClick={ () => history(`/${prod.id}`) }
                  src={ prod.gallery[0] }
                  alt={ prod.name }
                  className={ prod.inStock ? style.img : style.out }
                />
                {!prod.inStock && <p onClick={ () => history(`/${prod.id}`) } className={ style.out_msg }>OUT OF STOCK</p>}
                <h2 className={ style.card_name }>
                  {prod.brand + ' ' + prod.name}
                </h2>
                <p className={ style.card_price }>
                  {price(prod).currency.symbol + ' ' + price(prod).amount}
                </p>
                <button
                  type="button"
                  className={ style.cart_btn }
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
  products: state.category.products.products,
  loading: state.category.loadingProd,
  currency: state.currencies.selectedCurr,
})

Shop.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    prices: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.shape({
        label: PropTypes.string,
        symbol: PropTypes.string,
      }),
      amount: PropTypes.number,
    })),
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Shop);
