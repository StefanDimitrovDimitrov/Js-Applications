import * as api from './api.js';
const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// // Implement application-specific requests

// GET ALL
// export async function getAllData(){
//     return await api.get(host + '');}
//}

// // GET BY ID
// export async function getItemById(id){
//     return await api.get(host + '/data/_______/' + id);
// }

//// GET MY
// export async function getMyData(userId){
//     return await api.get(host + ``)
// }

//// CREATE
// export async function createRecord(data){
//     return await api.post(host + '/data/memes', data);
// }

//// EDIT
// export async function editRecord(id, data){
//     return await api.put(host + '/data/memes/' + id, data);
// }

//// DELETE
// export async function deleteRecord(id){
//     return await api.del(host + '/data/memes/' + id);
// }



////GET Pagination

// export async function getCollectionSize(){
//     return await api.get(host + '/data/cars?count')
// }


////GET Search
// export async function search(query){
//     return await api.get(host + `/data/cars?where=year%3D${query}`);
// }



////GET Pagination

// export async function getCollectionSize(){
//     return await api.get(host + '/data/cars?count')
// }

// export async function getAllSearchItems(page=1){
//     return await api.get(host + '/data/cars?sortBy=_createdOn%20desc&offset=${(page-1) * 3}&pageSize=3');
// }
