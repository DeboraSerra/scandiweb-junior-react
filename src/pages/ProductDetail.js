import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AttDetail from '../components/AttDetail';
import DetailGallery from '../components/DetailGallery';
import { fetchProduct } from '../redux/reducers/detailSlice';
import { addItem } from '../redux/reducers/cartSlice';
import style from '../styles/ProductDetail.module.css';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
    }
  }
  async componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    await dispatch(fetchProduct(id));
  }

  selectAtt = ({ target }) => {
    const itemSelect = {
      id: target.id,
      item: target.innerText,
    }
    const index = this.state.selected.findIndex(({ id }) => id === target.id)
    if (index === -1) this.setState((prevSt) => ({ selected: [...prevSt.selected, itemSelect] }))
    else {
      const newState = this.state.selected.map((item) => {
        if (item.id === target.id) return itemSelect;
        else return item;
      })
      this.setState({ selected: newState })
    }
  }
  render() {
    const { product, currency, loading, dispatch } = this.props;
    const { name, inStock, gallery, description, attributes, prices, brand } = product;
    const { selected } = this.state;
    const price = () => prices.find(({ currency: { label } }) => label === currency);
    return (
      loading ? <p>Loading</p> : (
        <section className={ style.detail_page }>
          <DetailGallery images={ gallery } name={ name } style={ style } inStock={ inStock } />
          <section className={ style.detail_sect }>
            <p className={ style.brand }>{brand}</p>
            <p className={ style.name }>{name}</p>
            <section className={ style.att_sect }>
              {attributes.map((att, index) => (
                <AttDetail key={ index } attributes={ att } selected={ selected } style={ style } selectAtt={ this.selectAtt } />
              ))}
            </section>
            <p className={ style.price_title }>PRICE:</p>
            <p className={ style.price }>{price().currency.symbol + price().amount}</p>
            <button type="button" className={ style.add_btn } onClick={ () => {
              if (inStock) dispatch(addItem({ ...product, attributesSelected: selected, amount: 1 }))
            } }>
              ADD TO CART
            </button>
            <section className={ style.description } dangerouslySetInnerHTML={{ __html: description }} />
          </section>
        </section>
      )
    );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
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
  currency: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  currency: state.currencies.selectedCurr,
  loading: state.product.loading,
});

export default connect(mapStateToProps)(ProductDetail);
