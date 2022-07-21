import * as ut from './utilities.js';
import * as md from './moreDetails.js';

window.addEventListener('load', () => {
    ut.onLoad();
});


const addTeam = document.querySelector('#addTeam');
addTeam.addEventListener('click', (e) => {
    let teamName = document.querySelector('#team');
    let teamSize = document.querySelector('#ts');


    let ls = ut.allStorage();
    for (let i = 0; i < ls.length; i++) {
        let existingName = localStorage.key(i);

        if (teamName.value.toLowerCase() === existingName.toLowerCase()) {
            teamName.className = 'invalid';
        }
    }


    if (teamName.value == "" || teamName.className == 'invalid') {
        teamName.className = 'invalid';
    } else if (teamSize.value == "" || teamSize.value < 3 | teamSize.value > 5) {
        teamSize.className = 'invalid';
    } else {
        ut.showPeople();
        teamName.className = 'valid';
        teamSize.className = 'valid';
        ut.resetTeamMembers();
        md.resetMoreInfo();
    }

    ut.resetTeamNames();
    ut.getTeamNames();
});

