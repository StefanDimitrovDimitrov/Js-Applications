import * as api from './api.js';
const host = 'http://localhost:3030'
api.settings.host = host

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application- specific requests

export async function getTeams(){
    return await api.get(host + '/data/teams');
}

export async function getTeamById(id){
    return await api.get(host + '/data/teams/' + id);
}

export async function createTeam(team){
    return await api.post(host + '/data/teams', team);
}

export async function editTeam(id, team){
    return await api.put(host + '/data/teams/'+ id, team);
}

export async function deleteTeam(id){
    return await api.del(host + '/data/teams/'+ id);
}
// export async function listMembers(){
//     const userId = sessionStorage.getItem('userId')
//     return await api.get(host + `/data/members?where=status%3D%22member%22`)
// }
//by team

// export async function getMyTeams(){
//     const userId = sessionStorage.getItem('userId')
//     return await api.get(host + `/data/team/ + userid`)
// }

// export async function getMembersTeam(){
//     const teamId = sessionStorage.getItem('teamId')
//     return await api.get(host + `/GET /data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
// }

// export async function createRecord(data){
//     return await api.post(host + '/data/catalog', data);
// }

// export async function editRecord(id, data){
//     return await api.put(host + '/data/catalog/' + id, data);
// }

// export async function deleteRecord(id){
//     return await api.del(host + '/data/catalog/' + id);
// }
