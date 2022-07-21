import Hikes from './hikes.js';
import * as ls from  './ls.js';
import * as util from "./utilites.js"
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
let commentList = [];
let commentingOn = "all";
let type = "hikes";

window.addEventListener('load', () => {
  ls.onLoad(type);
  myHikes.showHikeList();
  util.displayCurrent();

});





export function getCommentList(){
  return commentList;
}
export function setCommentList(comments){
  commentList = comments;
  ls.saveComments(type, commentList);
}
export function getCommentingOn(){
  return commentingOn;
}
export function setCommentingOn(which){
  commentingOn = which;
  
}


function allStorage() {

  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
  }

  return values;
}

let allLocalStorage = document.getElementById('all-storage');
allLocalStorage.addEventListener('click', () => {
  console.log(allStorage());
});
