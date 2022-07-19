import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchCategory, selectCategory } from '../redux/reducers/categorySlice';

class Shop extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchCategory());
    dispatch(selectCategory({ category: 'clothes' }));
  }
  render() {
    const { category, products } = this.props;
    console.log(products);
    return (
      <>

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
  products: state.category.products,
})

export default connect(mapStateToProps)(Shop);
