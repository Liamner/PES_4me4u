import React, { Component } from "react";

export default class Report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: props.category
		}
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
