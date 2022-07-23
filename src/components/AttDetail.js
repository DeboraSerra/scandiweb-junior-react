import React from 'react';

class AttDetail extends React.Component {
  render() {
    const { attributes: att, selected, style, selectAtt } = this.props;
    const isSelected = (attId) => selected.find(({ id, item }) => id === attId);
    return (
      <section className={ style.att_sect }>
        <p className={ style.att_name }>{att.name}</p>
        <section className={ style.atts }>
          {att.items.map((item) => (
            <section key={ item.id + item.value } className={ isSelected(att.id)?.item === item.id && att.name === 'Color' ? style.color_sect : style.att_box }>
              {att.name === 'Color'
                ? (
                  <p
                    style={{ backgroundColor: item.id, color: item.id, overflow: 'hidden' }}
                    onClick={ selectAtt }
                    id={att.id}
                    className={ isSelected(att.id)?.item === item.id ? style.color_selected : style.color_att }
                  >{item.id}</p>
                ) : (
                  <p
                    className={ isSelected(att.id)?.item === item.value ? style.att_selected : style.att }
                    id={att.id}
                    onClick={ selectAtt }
                  >
                    {item.value}
                  </p>
                )
              }
            </section>
          ))}
        </section>
      </section>
    );
  }
}

export default AttDetail;
