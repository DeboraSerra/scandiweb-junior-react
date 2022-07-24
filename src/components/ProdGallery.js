import React from 'react';
import PropTypes from 'prop-types';
import next from '../images/next.svg';
import prev from '../images/prev.svg';

class ProdGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    }
  }
  next = () => {
    const { images } = this.props;
    this.setState((prevSt) => ({
      index: prevSt.index === images.length - 1 ? 0 : prevSt.index + 1,
    }))
  }

  prev = () => {
    const { images } = this.props;
    this.setState((prevSt) => ({
      index: prevSt.index === 0 ? images.length - 1 : prevSt.index - 1,
    }))
  }

  render() {
    const { images, name, style } = this.props;
    const { index } = this.state;
    return (
      <section className={ style.gallery_sect }>
        <img className={ style.img } src={ images[index] } alt={ name } />
        {images.length > 1 && (
          <section className={ style.gallery_btn_sect }>
            <button type="button" onClick={ this.prev } className={ style.prev_btn }>
              <img src={ prev } alt="Previous" />
            </button>
            <button type="button" onClick={ this.next } className={ style.next_btn }>
              <img src={ next } alt="Next" />
            </button>
          </section>
        )}
      </section>
    )
  }
}

ProdGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
};

export default ProdGallery;
