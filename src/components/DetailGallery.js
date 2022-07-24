import React from 'react';
import PropTypes from 'prop-types';

class DetailGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    }
  }

  render() {
    const { images, name, style, inStock } = this.props;
    const { index } = this.state;
    return (
      <section className={ style.gallery_sect }>
        <section className={ style.sm_gallery }>
          {images.map((img, index) => (
            <img
              key={ index }
              className={ style.img_sm }
              src={ img } alt={ name }
              onClick={ () => this.setState({ index }) }
            />
          ))}
        </section>
        <section className={ style.img_sect }>
          <img className={ style.img } src={ images[index] } alt={ name } />
          {!inStock && <p className={ style.img_out }>OUT OF STOCK</p>}
        </section>
      </section>
    )
  }
}

DetailGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  inStock: PropTypes.bool.isRequired,
};

export default DetailGallery;
