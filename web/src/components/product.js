import React, { Component } from "react";

export default class Report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: props.product
		}
	}

	render() {
		const { product } = this.state;
		return (
			<tr>
				<td>
					{product.name}
				</td>
				<td className="stats-number" style={{fontSize: '20px'}}>
					{product.views}
				</td>
			</tr>
		);
	}
}
