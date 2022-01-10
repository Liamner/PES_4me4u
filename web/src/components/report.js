import React, { Component } from "react";
import APIService from "../services/API";

export default class Report extends Component {
	constructor(props) {
		super(props);
		this.onClickStrike = this.onClickStrike.bind(this);
		this.onClickClose = this.onClickClose.bind(this);

		this.state = {
			report: props.report
		}
	}

	onClickStrike() {
		APIService.put('/report/close/' + this.state.report._id, {
			strike: true
		}).then(
			response => {
				this.setState({
					posts: response.data,
				});
			}
		);

	}

	onClickClose() {
		APIService.put('/report/close/' + this.state.report._id, {
			strike: false
		}).then(
			response => {
				this.setState({
					posts: response.data,
				});
			}
		);

	}

	renderType(type) {
		if (type === undefined) {
			return <span>Usuario</span>
		}
		else {
			return <span>Producto</span>
		}
	}

	renderName(product, name) {
		if (product === undefined) {
			return <span>{name}</span>
		}
		else {
			return <span>{product}</span>
		}

	}

	render() {
		const { report } = this.state;
		return (
			<tr>
				<td>
					{this.renderType(report.relatedProduct)}
				</td>
				<td>
					{this.renderName(report.relatedProduct, report.userReported)}
				</td>
				<td>
					{report.description}
				</td>
				<td>
					<span style={{ backgroundColor: 'red', borderRadius: 5, marginRight: 10, padding: 4 }} onClick={this.onClickStrike}>Strike</span>
					<span style={{ backgroundColor: 'orange', borderRadius: 5, marginRight: 10, padding: 4 }} onClick={this.onClickClose}>Cerrar</span>
				</td>
			</tr>
		);
	}
}
