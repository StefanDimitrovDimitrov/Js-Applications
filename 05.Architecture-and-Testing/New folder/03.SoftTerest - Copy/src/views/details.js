import {getIdeaById, deleteIdeaById} from '../api/data.js'
import {e} from '../dom.js'

function createIdeaCard(idea, isOwner,goTo){
    const result = document.createDocumentFragment()
    result.appendChild(e('img',{className:'det-img', src:idea.img}));
    result.appendChild(e('div',{className: 'desc'},
        e('h2', {className:'disolay-5'}, idea.title),
        e('p',{className: 'infoType'}, 'Discription'),
        e('p',{className: 'idea-description'}, idea.description)));
    if(isOwner){
        result.appendChild(e('div', {className: 'text-center'}, e('a', {className: 'btn detb', href: '', onClick: onDelete }, 'Delete')));
    }

    return result

    async function onDelete(ev){
        ev.preventDefault();
        const confirmed = confirm('Are you sure you want to delete the idea?')
        if (confirmed){
            await deleteIdeaById(idea._id);
            goTo('dashboard');
        }
    }
}


export function setupDetails(section, navigation){
    return showDetails;

    async function showDetails(id){
        section.innerHTML = '';
        
        const idea = await getIdeaById(id);
        const userId = sessionStorage.getItem('userId');

        
        const card = createIdeaCard(idea, userId == idea._ownerId,navigation.goTo);
        section.appendChild(card);
    
        return section;
    }

}