import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../../utils/RecordsAPI'

export default class Record extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};
	}

	handleToggle = () => {
		this.setState({
			edit: !this.state.edit
		});
	};

	handleEdit = (e) => {
		e.preventDefault();
		// 取出ref中的值
		const record = {
			date: this.refs.date.value,
			title: this.refs.title.value,
			amount: Number.parseInt(this.refs.amount.value, 0),
		};
		RecordsAPI.update(this.props.record.id, record)
			.then(
				res => {
					this.setState({edit: false});
					this.props.handleEditRecord(this.props.record, res.data)
				}
			).catch(
				err => console.log(err.message)
		)
	};

	handleDelete = (e) => {
		e.preventDefault();

		RecordsAPI.remove(this.props.record.id)
			.then(
				this.props.handleDeleteRecord(this.props.record)
			).catch(
				err => console.log(err.message)
		)
	};

	recordRow() {
		return (
			/*
				 <tr>
				  <td>{this.props.record.date}</td>
				  <td>{this.props.record.title}</td>
				  <td>{this.props.record.amount}</td>
				</tr>
				 */

			<tr>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.title}</td>
				<td>{this.props.record.amount}</td>
				<td>
					<button className="btn btn-primary mr-2" onClick={this.handleToggle}>Edit
					</button>
					<button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		);
	}

	recordForm() {
		return (
			<tr>
				<td><input type="text" name="" id="" className='form-control'
				           defaultValue={this.props.record.date} ref='date'/></td>
				<td><input type="text" name="" id="" className='form-control'
				           defaultValue={this.props.record.title} ref='title'/></td>
				<td><input type="text" name="" id="" className='form-control'
				           defaultValue={this.props.record.amount} ref='amount'/></td>
				<td>
					<button className="btn btn-warning mr-2" onClick={this.handleEdit}>Update
					</button>
					<button className="btn btn-info" onClick={this.handleToggle}>Cancel</button>
				</td>
			</tr>
		);
	}


	render() {
		const {edit} = this.state;

		if (edit) {
			return this.recordForm();
		} else {
			return this.recordRow();
		}

	}
}


Record.propTypes = {
	id: PropTypes.string,
	date: PropTypes.string,
	title: PropTypes.string,
	amount: PropTypes.number,
};
