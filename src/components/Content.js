import React from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';
import Shop from '../pages/Shop';

class Content extends React.Component {
  render() {
    const WrapperShop = (props) => {
      const history = useNavigate();
      return <Shop { ...{ ...props, history } } />
    }
    const WrapperDetail = (props) => {
      const params = useParams();
      return <ProductDetail { ...{ ...props, match: { params } } } />
    }
    return (
      <main>
        <Routes>
          <Route exact path='/' element={ <WrapperShop /> } />
          <Route path='/cart' element={ <Cart />} />
          <Route path='/:id' element={ <WrapperDetail />} />
        </Routes>
      </main>
    )
  }
}

export default Content;
