
const listMoreDetails = document.getElementById('more-details');

export function resetMoreInfo() {
    listMoreDetails.innerHTML = "";
}

export function renderMoreInfo(personDetails) {
    console.log(personDetails);
    let ul = document.createElement('ul');
    let hd4 = document.createElement('h4');

    if(personDetails['name']){
        hd4.textContent = "Homeworld Details:";
        listMoreDetails.appendChild(hd4);
        hd4.after(ul);
    
        for (let key in personDetails) {
            let li = document.createElement('li');
            let spField = document.createElement('span');
            let spValue = document.createElement('span');
            
            spField.setAttribute("class", "personFieldName");

            if(!(key === 'created' || key === 'edited' || key === 'residents' || key === 'url' || key === 'films')){
                spField.textContent = toTitleCase(key) + ": ";
                spValue.textContent = personDetails[key];
            }
            li.appendChild(spField);
            spField.after(spValue);
            ul.appendChild(li);
        }
    } else {
        hd4.textContent = "Film Details:";
        listMoreDetails.appendChild(hd4);
        hd4.after(ul);

        for (let key in personDetails) {
            let li = document.createElement('li');
            let spField = document.createElement('span');
            let spValue = document.createElement('span');
            
            spField.setAttribute("class", "personFieldName");

            if(key === 'title' || key === 'episode_id' || key === 'opening_crawl' || key === 'director'){
                if(key === 'episode_id'){
                    spField.textContent = "Episode: ";
                } else if(key ==='opening_crawl'){
                    spField.textContent = "Opening: ";
                } else {
                    spField.textContent = toTitleCase(key) + ": ";
                }
                spValue.textContent = personDetails[key];
            }
            li.appendChild(spField);
            spField.after(spValue);
            ul.appendChild(li);
        }
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

