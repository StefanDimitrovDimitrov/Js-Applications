import * as api from './api.js';
const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// // Implement application-specific requests

// //GET
export async function getMemes(){
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}
// //search

// export async function getFurniture(search){
//     if (search){
//         return await api.get(host + '/data/catalog?where=' +encodeURIComponent(`make LIKE "${search}"`));
//     }else{
//         return await api.get(host + '/data/catalog');
//     }
// }
export async function getMyMemes(userId){
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// }

export async function getItemById(id){
    return await api.get(host + '/data/memes/' + id);
}

// export async function getMy________(){
//     const userId = sessionStorage.getItem('userId')
//     return await api.get(host + `/data/_____?where=_ownerId%3D%22${userId}%22`)
// }

//POST
export async function createRecord(data){
    return await api.post(host + '/data/memes', data);
}

//PUT
export async function editRecord(id, data){
    return await api.put(host + '/data/memes/' + id, data);
}

//DELETE
export async function deleteRecord(id){
    return await api.del(host + '/data/memes/' + id);
}