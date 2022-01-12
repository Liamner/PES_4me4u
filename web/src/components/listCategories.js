import React, { Component } from "react";
import Category from "./category";

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories
    };
  }

  render() {
    const { categories } = this.state;

    return (
      <table  className='categorias' style={{ width: '100%' }}>
        <tbody>
          <tr style={{ width: '100%' }}>
            <th style={{textAlign: 'center', border: 'none', fontSize: '21px', textDecoration: 'underline'}}>Categoria</th>
            <th style={{textAlign: 'center', border: 'none', fontSize: '21px', textDecoration: 'underline'}}>Num. Prod</th>
          </tr>
          {categories.map(element => {
            return <Category key={element._id} category={element} />
          })}
        </tbody>
      </table>
    );
  }
}