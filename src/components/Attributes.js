import React from 'react';
import style from '../styles/FloatCart.module.css';

class Attributes extends React.Component {
  render() {
    const { attributes: att, selected } = this.props;
    const isSelected = (attId) => selected.find(({ id, item }) => id === attId);
    return (
      <section className={ style.att_sect }>
        <p className={ style.att_name }>{att.name}</p>
        <section className={ style.atts }>
          {att.items.map((item) => (
            item.name === 'Color'
              ? (
                <p
                  key={ item.id }
                  style={{ backgroundColor: item.value }}
                  className={ isSelected(att.id).item === item.id ? style.item_selected : style.item }
                ></p>
              ) : (
                <p
                  className={ isSelected(att.id).item === item.id ? style.item_selected : style.item }
                  key={ item.id }
                >
                  {item.value}
                </p>
              )
          ))}
        </section>
      </section>
    );
  }
}

export default Attributes;
