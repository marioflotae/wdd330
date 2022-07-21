import * as md from './moreDetails.js';

//////////////////////////////////////////////////
export function onLoad() {

    if (localStorage.key(0)) {
        getTeamNames();
    }
}
//////////////////////////////////////////////////

function getTeamNameFromInput() {
    return document.querySelector('#team').value;
}

export function getTeamSizeFromInput() {
    return document.querySelector('#ts').value;
}



let eraseInput = document.querySelector('#team');
eraseInput.addEventListener('click', () => {
    eraseInput.setAttribute('class', '');
    eraseInput.value = '';
});

var sizeOfTeam = [];
let type = "sw";

function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPeople(url) {
    return getJSON(url);
}



function renderPeopleList(peoples, peopleListElement) {
    // I decided to use a table to display my list of ships. The shipList Element is that table and it has 2 children: thead and tbody...we need to put our ships into tbody...so I reference the second child.
    const list = peopleListElement.children[1];
    list.innerHTML = "";
    //loop through the ships
    peoples.forEach(function (people) {
        // console.log(people);
        //create elements for list...tr
        let listItem = document.createElement("tr");
        listItem.innerHTML = `
          <td><a href="${people.url}">${people.name}</a></td>
          <td>${people.gender}</td>
          <td>${people.height}</td>
          `;


        listItem.addEventListener("click", function (event) {
            //when clicked the default link behavior should be stopped, and the 
            //ship details function should be called...passing the value of the href attribute in
            event.preventDefault();

            getPersonDetails(people.url);
        });

        //add the list item to the list
        list.appendChild(listItem);
    });
}

export function showPeople(url = "https://swapi.dev/api/people") {
    getPeople(url).then(function (data) {
        const results = data.results;
        console.log(results);
        formatPageNav(data.previous, data.next);

        const peopleListElement = document.getElementById("peoplelist");
        renderPeopleList(results, peopleListElement);

        // enable the next and prev buttons.
        if (data.next) {
            const next = document.getElementById("next");
            // normally we would prefer the addEventListener method of adding a listener. Using something like 'element.onEvent = event_function' has the limitation of only being able to hold one listener of the type we choose. In this case that is a good thing however. Because we are not re-creating the buttons each time we load a new batch of data we could end up with several listeners attached to each button by the last page. We won't have that issue here.
            next.onclick = () => {
                // notice to show the next page we just re-call the showShips function with a new URL
                event.preventDefault();
                showPeople(data.next);
            };
        }
        if (data.previous) {
            const prev = document.getElementById("prev");

            prev.onclick = () => {
                event.preventDefault();
                showPeople(data.previous);
            };
        }
    });
}

// Additional Codes for stretch challenge
const listPersonDiv = document.getElementById('personDetails');

function formatPageNav(prev, next) {
    let prevButton = document.getElementById("prevB");
    let nextButton = document.getElementById("nextB");

    (!prev) ? prevButton.classList.add("hidden") : prevButton.classList.remove("hidden");
    (!next) ? nextButton.classList.add("hidden") : nextButton.classList.remove("hidden");
    resetPersonDetails();
    md.resetMoreInfo();
}



function getPersonDetails(url) {
    //call getJSON functions for the provided url
    getPeople(url).then(function (data) {
        resetPersonDetails();
        renderPersonDetails(data);
        let team = getTeamNameFromInput();
        addTeamMember(team, data);
    });
}

function resetPersonDetails() {
    listPersonDiv.innerHTML = "";
}

let teamMembers = getTeamSizeFromInput();

function renderPersonDetails(personData) {
    let ul = document.createElement('ul');
    let hd4 = document.createElement('h4');
    let counter = document.createElement('h4');
    let br = document.createElement('br');
    let btnAdd = document.createElement('button');
    let idButton = "#" + personData["name"];
    btnAdd.setAttribute("id", idButton);
    if (teamMembers <= 0) {
        btnAdd.setAttribute("class", "disabled");
        btnAdd.disabled = true;
    } else {
        btnAdd.setAttribute("class", "add");

    }

    if (teamMembers > 1) {
        counter.textContent = "Team Members left: " + teamMembers;
    } else if (teamMembers <= 0) {
        counter.textContent = "Your team is full!";
    } else {
        counter.textContent = "Pick your last choice";
    }


    hd4.textContent = personData["name"] + "'s Info:";
    btnAdd.textContent = "Add To Team";
    listPersonDiv.appendChild(hd4);
    hd4.after(ul);


    for (let key in personData) {
        let li = document.createElement('li');
        let spField = document.createElement('span');
        let spValue = document.createElement('span');



        switch (key) {
            case "homeworld":
                spField.textContent = toTitleCase(key) + ": ";
                let aHomeWorld = document.createElement('a');
                aHomeWorld.setAttribute('href', '#');
                aHomeWorld.setAttribute('id', personData[key]);
                aHomeWorld.textContent = 'See Details...'
                spValue.appendChild(aHomeWorld);
                break;

            case "films":
                spField.textContent = toTitleCase(key) + ": ";
                //spValue.setAttribute('id', personData[key]);

                let filmsArray = personData[key];
                for (let i = 0; i < filmsArray.length; i++) {
                    let aFilms = document.createElement('a');
                    aFilms.setAttribute('href', '#');
                    aFilms.setAttribute('id', filmsArray[i]);
                    if (i == (filmsArray.length - 1)) {
                        aFilms.textContent = "Film: " + (i + 1);
                    } else {
                        aFilms.textContent = "Film: " + (i + 1) + " | ";
                    }

                    spValue.appendChild(aFilms);
                }
                //spValue.textContent = 'See Details...'
                break;

            case "species":

                break;

            case "starships":

                break;

            case "vehicles":

                break;

            default:
                spField.textContent = toTitleCase(key) + ": ";
                spValue.textContent = personData[key];
                break;
        }



        spField.setAttribute("class", "personFieldName");

        li.appendChild(spField);
        spField.after(spValue);
        ul.appendChild(li);


    }

    ul.after(btnAdd);
    btnAdd.after(br);
    br.after(counter);

    let homeWorld = document.getElementById(personData['homeworld']);
    homeWorld.addEventListener('click', (e) => {
        e.preventDefault();
        let additionalInfo = e.target.id;
        getMoreInfo(additionalInfo);
    });

    let idFilmsArray = personData['films'];
    for (let j = 0; j < idFilmsArray.length; j++) {
        let films = document.getElementById(idFilmsArray[j]);
        films.addEventListener('click', (e) => {
            e.preventDefault();
            let additionalInfo = e.target.id;
            getMoreInfo(additionalInfo);

        });
    }

}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
/////////////////////////////////////////////////////////////////////////
//Get More info
function getMoreInfo(url) {
    //call getJSON functions for the provided url
    getPeople(url).then(function (data) {
        md.resetMoreInfo();
        md.renderMoreInfo(data);
        //let team = getTeamNameFromInput();
        //addTeamMember(team, data);
    });
}

export function getMorePersonDetails(urlDetails) {
    let moreInfo = document.getElementById(urlDetails);
    console.log(moreInfo);
    moreInfo.addEventListener('click', (e) => {
        console.log(e.target.id);
        let additionalInfo = e.target.id;
        getMoreInfo(additionalInfo);
    });
}


function homePlanetName(url) {
    //call getJSON functions for the provided url
    getPeople(url).then(function (data) {
        let planetName = getHomeWorld(data);
        return planetName;
    });
}

function getHomeWorld(data) {
    let planetName = "";
    for (let key in data) {
        if (key === "name") {
            planetName = data[key];
        }
    }
    console.log(planetName);
    return planetName;
}
/////////////////////////////////////////////////////////////////////////

function addTeamMember(teamName, characterData) {
    let btnAddTeam = document.getElementById("#" + characterData["name"]);
    btnAddTeam.addEventListener('click', (e) => {
        let tempCharacter = { "character": characterData["name"], "url": characterData["url"] };
        sizeOfTeam.push(tempCharacter);
        teamMembers -= 1;
        btnAddTeam.disabled = true;
        btnAddTeam.setAttribute("class", "disabled");
        renderTeamMembers(sizeOfTeam);
        //console.log(sizeOfTeam);
        saveTeamLS(teamName, sizeOfTeam);
        resetTeamNames();
        getTeamNames();
    });
}

/////////////////////////////////////////////////////////////////////////
//Save in local storage
function saveTeamLS(type, teamMembers) {
    localStorage.setItem(type, JSON.stringify(teamMembers));
}

/////////////////////////////////////////////////////////////////////////
const currentTeams = document.getElementById('current-teams');
//Get all from local storage
export function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
}

export function getTeamNames() {
    let teams = allStorage();
    let teamGroup = [];
    for (let key in teams) {
        teamGroup.push(localStorage.key(key));
    }
    renderExistingTeams(teamGroup);
}

export function resetTeamNames() {
    currentTeams.innerHTML = "";
}

function renderExistingTeams(teams) {
    let h4 = document.createElement('h4');
    let ol = document.createElement('ol');
    h4.textContent = "Current Teams";
    currentTeams.appendChild(h4);
    h4.after(ol);
    for (let key in teams) {
        let li = document.createElement('li');
        let spTeam = document.createElement('span');
        spTeam.setAttribute('id', "t-" + teams[key]);
        let img = document.createElement('img');
        img.setAttribute("src", "images/delete.png");
        img.setAttribute("alt", "delete team");
        img.setAttribute('id', teams[key]);
        spTeam.textContent = teams[key].toUpperCase();
        li.appendChild(spTeam);
        li.appendChild(img);
        ol.appendChild(li);

        let delTeam = document.getElementById(teams[key]);
        delTeam.addEventListener('click', (event) => {
            //event.preventDefault();
            localStorage.removeItem(event.target.id);

            resetTeamNames();
            getTeamNames();
            resetTeamMembers();
        });

        let showTeam = document.getElementById("t-" + teams[key]);
        showTeam.addEventListener('click', (e) => {
            let idTeam = e.target.id;
            idTeam = idTeam.substring(2);
            renderTeamByTeamName(idTeam);
        });


    }

}
/////////////////////////////////////////////////////////////////////////
//Render team members by team name
function renderTeamByTeamName(teamName) {
    resetTeamMembers();
    let h4 = document.createElement('h4');
    let ol = document.createElement('ol');
    h4.textContent = teamName + " Team";
    teamList.appendChild(h4);
    h4.after(ol);

    let teamMembers = JSON.parse(localStorage.getItem(teamName));
    for (let i = 0; i < teamMembers.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('id', teamMembers[i].url);
        li.textContent = teamMembers[i].character;
        ol.appendChild(li);

        let showDetailsTeam = document.getElementById(teamMembers[i].url);
        showDetailsTeam.addEventListener('click', (e) => {
            //console.log(e.target.id);
            let charachterUrl = e.target.id;
            //let urlAll = charachterUrl.slice(0, -2);
            md.resetMoreInfo();
            //showPeople();
            getPersonDetails(charachterUrl);
        });
    }
}

/////////////////////////////////////////////////////////////////////////
const teamList = document.getElementById('your-team');

//Render Team Members
function renderTeamMembers(team) {
    resetTeamMembers();
    let h4 = document.createElement('h4');
    let ol = document.createElement('ol');
    h4.textContent = "Your Team:";
    teamList.appendChild(h4);
    h4.after(ol);


    Object.keys(team).forEach(key => {
        let li = document.createElement('li');
        li.textContent = team[key].character;
        ol.appendChild(li);
    });
}

export function resetTeamMembers() {
    teamList.innerHTML = "";
}

