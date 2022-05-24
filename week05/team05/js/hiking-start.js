import * as hikes from "./hikes.js";

const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
    showHikeList();
});

export function showHikeList() {
    const hikeListElement = document.getElementById("hikes");
    hikeListElement.innerHTML = "";
    renderHikeList(hikes.getHikes(), hikeListElement);
}

// function renderHikeList(hikes, parent) {
//     hikes.forEach(hike => {
//         parent.appendChild(renderOneHike(hike));
//     });
// }

export function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      let liItem = renderOneHike(hike);
      parent.appendChild(liItem);
      liItem.addEventListener('click', function() {
         parent.innerHTML = "";
         let resetButton = document.createElement('button');
         resetButton.setAttribute('id', "reset");
         resetButton.innerHTML = "View Full List";
        resetButton.addEventListener('click', console.log("working"), false);
         parent.appendChild(liItem);
         parent.appendChild(resetButton);
      })
      
    });
  }

export function renderOneHike(hike) {
    const item = document.createElement("li");

    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div class="description">
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;
    item.setAttribute('id', hike.name);

    return item;
}
