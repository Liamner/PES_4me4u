import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import APIService from "../services/API";
import ListCategories from "../components/listCategories";
import AddCategory from "../components/addCategory"

class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			categories: []
		};
	}

	componentDidMount() {
		APIService.get('/category/').then(
			response => {
				this.setState({
					categories: response.data,
					loading: false
				});
			}
		);
	}

	componentDidUpdate() {
		
	}

	render() {
		const { loading, categories } = this.state;
		return (
			loading ?
				<div className="circularProgress">
					<CircularProgress color="inherit" />
				</div>
				:
				<div className="row">
					<ListCategories categories={categories} />
				</div>
		);
	}
}

export default Categories;