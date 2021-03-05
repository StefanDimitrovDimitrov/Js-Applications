function lockedProfile() {

    function addEventListener() {
        document.getElementById('main').addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                const profile = e.target.parentNode;
                const isLocked = profile.querySelector('input[type=radio]:checked').value === 'lock'

                if (isLocked) {
                    return;
                }

                let div = profile.querySelector('div');
                let isVisible = div.style.display === 'block';
                div.style.display = isVisible ? 'none' : 'block';
                console.log(e.target)
                e.target.textContent = !isVisible ? 'Hide it' : 'Show more'
            }
        })
    }
    async function getProfile() {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles'
        const response = await fetch(url);
        const data = await response.json();

        let num = 1
        Object.values(data).forEach(e => {
            createProfile(e.username, e.email, e.age, num)
            num++
        })


    }
    getProfile()
    function createProfile(username, email, age, num) {

        const divElement = newE('div', { className: 'profile' },
            newE('img', { src: "./iconProfile2.png", className: 'userIcon' }),
            newE('labal', {}, 'Lock'),
            newE('input', { type: 'radio', name: `user${num}Locked`, value: 'lock', checked: true }),
            newE('label', {}, 'Unlock'),
            newE('input', { type: 'radio', name: `user${num}Locked`, value: 'unlock' }), newE("br"), newE("hr"),
            newE('label', {}, "Username"),
            newE('input', { type: 'text', name: `user${num}Username`, value: username, disabled: true, readonly: true }),
            newE('div', { id: `user${num}HiddenFields` },
                newE('hr'),
                newE('label', {}, 'Email:'),
                newE('input', { type: 'email', name: `user${num}Email`, value: email, disabled: true, readonly: true }),
                newE('label', {}, 'Age:'),
                newE('input', { type: 'email', name: `user${num}Age`, value: age, disabled: true, readonly: true })),
            newE('button', {}, 'Show more'))

        main.appendChild(divElement)
        addEventListener()
    }


}

function newE(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        result[attr] = value;
    }
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;

}