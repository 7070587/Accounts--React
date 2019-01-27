import React, {Component} from 'react';

import * as RecordsAPI from '../../utils/RecordsAPI'


export default class RecordForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			date: '',
			title: '',
			amount: '',
		};
	}

	handleChange = e => {
		let name, obj;
		name = e.target.name;   // 取出下面表格中對應的name值
		this.setState((
			obj = {},
				obj['' + name] = e.target.value,
				// '' + name --> 使name變為字符串； e.target.value --> input框中輸入的值
				obj
		));
	};

	handleSubmit = e => {
		const {date, title, amount} = this.state;
		e.preventDefault();
		RecordsAPI.create({date, title, amount: Number.parseInt(amount, 0)})
			.then(
				res => {
					this.props.handleNewRecord(res.data);
					this.setState({     // 按下create後清空數據
						date: '',
						title: '',
						amount: '',
					});
				})
			.catch(
				err => console.log(err.message)
			);
	};

	valid() {
		return this.state.date && this.state.title && this.state.amount
	}

	render() {
		return (
			<form className="form-inline mb-3" onSubmit={this.handleSubmit}>
				<div className="form-group mr-2 ml-2">
					<input type="text" className="form-control" placeholder="Date" name="date"
					       value={this.state.date} onChange={this.handleChange}/>
				</div>
				<div className="form-group mr-2">
					<input type="text" className="form-control" placeholder="Title" name="title"
					       value={this.state.title} onChange={this.handleChange}/>
				</div>
				<div className="form-group mr-2">
					<input type="text" className="form-control" placeholder="Amount" name="amount"
					       value={this.state.amount} onChange={this.handleChange}/>
				</div>
				<button type="submit" className="btn btn-warning"
				        disabled={!this.valid()}>Create Record
				</button>
				{/* this.valid()，valid有()，表示是要執行的方法，判斷return的值是true還是false */}
			</form>

		);
	}
}

