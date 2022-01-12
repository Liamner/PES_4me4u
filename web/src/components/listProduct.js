import React, { Component } from "react";
import Product from "./product";

export default class ListCProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products
    };
  }

  render() {
    const { products } = this.state;

    return (
      <table  className='categorias' style={{ width: '100%' }}>
        <tbody>
          <tr style={{ width: '100%' }}>
            <th style={{textAlign: 'center', border: 'none', fontSize: '21px', textDecoration: 'underline'}}>Producto</th>
            <th style={{textAlign: 'center', border: 'none', fontSize: '21px', textDecoration: 'underline'}}>Visitas</th>
          </tr>
          {products.map(element => {
            return <Product key={element._id} product={element} />
          })}
        </tbody>
      </table>
    );
  }
}