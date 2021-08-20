//steps:
//1.Import untill in the  file
// 2.create function loader in separate file see the example below:

        // export const loaderTemplate = () => html`<p>Loading&hellip;<p>`;

//03. in the main file for example details create async function populate Template(teamId)... just see the example below:

// export async function detailsPage(ctx){
//     const teamId = ctx.params.id;

//     ctx.render(until(populateTemplate(teamId), loaderTemplate()))
// }

// async function populateTemplate(teamId){
//     const team = await getTeamById(teamId);
//     return detailsTemplate(team);
// }