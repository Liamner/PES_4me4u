import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import APIService from "../services/API";
import ListReports from "../components/listReports";

class Reports extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			posts: []
		};
	}

	componentDidMount() {
		APIService.get('/report/nosolved/').then(
			response => {
				this.setState({
					reports: response.data,
					loading: false
				});
			}
		);
	}

	componentDidUpdate() {
		APIService.get('/report/nosolved/').then(
			response => {
				this.setState({
					reports: response.data,
					loading: false
				});
			}
		);
	}

	render() {
		const { loading, reports } = this.state;
		return (
			loading ?
				<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
					<CircularProgress color="inherit" />
				</div>
				:
				<ListReports reports={reports} />
		);
	}
}

export default Reports;