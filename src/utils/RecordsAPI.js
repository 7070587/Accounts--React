import axios from 'axios';


// 設定環境變量
const api = process.env.REACT_APP_RECORDS_API_URL || 'https://5c4b3505aa8ee500142b489f.mockapi.io';

// 獲取模擬數據
export const getAll = () => axios.get(`${api}/api/v1/records`);

// 獲取輸入的數據 body
export const create = (body) => axios.post(`${api}/api/v1/records`, body);


// 獲取輸入的更新數據，用id判斷更新哪條紀錄，body更新的內容
export const update = (id ,body) => axios.put(`${api}/api/v1/records/${id}`, body);


// 獲取刪除，用id判斷更新哪條紀錄
export const remove = (id ) => axios.delete(`${api}/api/v1/records/${id}`);




