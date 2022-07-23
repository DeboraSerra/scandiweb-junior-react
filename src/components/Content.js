import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from '../pages/Cart';
import Shop from '../pages/Shop';

class Content extends React.Component {
  render() {
    return (
      <main>
        <Routes>
          <Route exact path='/' element={ <Shop /> } />
          <Route path='/cart' element={ <Cart />} />
          <Route path='/:id' element={ <Shop />} />
        </Routes>
      </main>
    )
  }
}

export default Content;
