import React, {Component} from 'react';
// import {getJSON} from 'jquery';

import Record from '../Record/Record';
import Loading from '../Loading/Loading';
import Wrong from '../Wrong/Wrong';
import RecordForm from '../RecordForm/RecordForm';
import AmountBox from '../AmountBox/AmountBox';

import * as RecordsAPI from '../../utils/RecordsAPI'

class Records extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: null,
			isLoaded: false,
			records: [
				// {'id': 1, "date": "2019-01-24", 'title': '收入', 'amount': 20},
				// {'id': 2, "date": "2019/01/23", 'title': '買飲料', 'amount': 60},
				// {'id': 3, "date": "2019/01/23", 'title': '買麵包', 'amount': 145},
				// {'id': 4, "date": "2019/01/21", 'title': '買漫畫', 'amount': 100},
			]
		};
	}

	// 組件掛載完之後，發起請求去得到數據
	componentDidMount() {
		// 使用jquery的方法發請求
		// getJSON('https://5c4b3505aa8ee500142b489f.mockapi.io/api/v1/records')
		// 	.then(
		// 		response => this.setState({
		// 			records: response,
		// 			isLoaded: true,
		// 		}),
		// 		err => this.setState({
		// 			err,    // err: errisLoaded: true,
		//
		// 		}),
		// 	)

		RecordsAPI.getAll().then(
			// response => console.log(response)   data: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
			response => this.setState({
				records: response.data,
				isLoaded: true,
			}))
			.catch(
				err => this.setState({
					err,    // err: errisLoaded: true,
					isLoaded: true,
				}),
			);
	}

	addRecord = (record) => {
		this.setState({
			err: null,
			isLoaded: true,
			records: [
				...this.state.records,
				record
			]
		});
	};

	updateRecord = (record, data) => {
		// indexOf() 方法可返回 某個指定字符串的值 在字符串中首次出現的位置。
		// recordIndex：record在records的索引位置
		const recordIndex = this.state.records.indexOf(record);
		// map(currentValue當前元素的值, index當前元素的索引值) 方法
		// 返回一個新數組，數組中的元素為原始數組元素調用函數處理後的值。
		const newRecords = this.state.records.map((item, index) => {
			if (index !== recordIndex) {
				return item;
			}
			return {
				...item,    // 原本的值
				...data,    // 新的值
				// 兩個混在一起，成為新的數組 newRecords，代替舊的數組this.state.records
			}
		});
		this.setState({
			records: newRecords
		});
	};

	deleteRecord = (record) => {
		const recordIndex = this.state.records.indexOf(record);
		// filter(currentValue當前元素的值, index當前元素的索引值)
		// 方法創建一個新的數組，新數組中的元素是通過檢查指定數組中符合條件的所有元素。
		// 如果 index !== recordIndex，要的就是index不等於recordIndex的所有紀錄
		const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
		this.setState({
			records: newRecords
		});
	};

	credits() {
		let credits = this.state.records.filter(record => record.amount >= 0);
		return credits.reduce((prev, curr) => prev + Number.parseInt(curr.amount, 0), 0);
	}

	debits() {
		let debits = this.state.records.filter(record => record.amount < 0);
		return debits.reduce((prev, curr) => prev + Number.parseInt(curr.amount, 0), 0);

	}

	balance() {
		return this.credits() + this.debits();
	}

	render() {
		// 取出 state 裡面的值
		const {err, isLoaded, records} = this.state;
		// const err = this.state.err;
		// const isLoaded = this.state.isLoaded;
		// const records = this.state.records;

		let recordsComponents;

		if (err) {
			recordsComponents = <div><Wrong/></div>
		} else if (!isLoaded) {
			recordsComponents = <div><Loading/></div>
		} else {
			recordsComponents = (

				<table className="table table-bordered m-2">
					<thead>
					<tr>
						<th>Date</th>
						<th>Title</th>
						<th>Amount</th>
						<th>Edit</th>
					</tr>
					</thead>
					<tbody>
					{/* 把state中的records數據，傳到 <Record />裡面  --> <Record record={record}/> */}
					{/*{this.state.records.map((record, index) => <Record record={record} key={record.id}/>)}*/}
					{records.map((record) => (
						<Record record={record}
						        key={record.id}
						        handleEditRecord={this.updateRecord}
						        handleDeleteRecord={this.deleteRecord}
						/>
					))}

					</tbody>
				</table>

			);
		}

		return (
			<div>
				<h2 className="m-2">Records</h2>
				<div className="m-2">
					<div className="row mb-3">
						<AmountBox text="Credit" type='success' amount={this.credits()} />
						<AmountBox text="Debit" type='danger' amount={this.debits()} />
						<AmountBox text="Balance" type='info' amount={this.balance()} />
					</div>
				</div>

				{/* 傳入addRecord，就可以使用handleNewRecord */}
				<RecordForm handleNewRecord={this.addRecord}/>
				{recordsComponents}
			</div>
		);
	}
}

export default Records;
