import React, { Component } from "react";
import APIService from "../services/API";

export default class Report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: props.report
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
				<td>
					{category.products.length}
				</td>
			</tr>
		);
	}
}
