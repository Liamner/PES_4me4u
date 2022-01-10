import React, { Component } from "react";
import APIService from "../services/API";

export default class Report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: props.category
		}
	}

	componentDidMount() {

	}


	render() {
		const { category } = this.state;
		return (
			<tr>
				<td>
					{category.name}
				</td>
				<td className="stats-number" style={{fontSize: '20px'}}>
					{category.products.length}
				</td>
			</tr>
		);
	}
}
