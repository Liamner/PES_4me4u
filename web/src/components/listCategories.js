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
      <table >
        <tbody >
          { categories.map(element => {
              return  <Category key={element._id} category={element} />
          })}
        </tbody>
      </table>
    );
  }
}