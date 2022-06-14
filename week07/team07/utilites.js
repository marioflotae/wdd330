
import * as main from "./app5.js";
import * as hikes from "./hikes.js";


export function createComment() {
    console.log('inside createComment');
    let comments = main.getCommentList();
    let content = document.getElementById("commentEntry").value;

    if (content.length) {
        //create the object


        const newComment = {
            name: main.getCommentingOn(),
            comment: content,
            date: new Date()
        };
        console.log(newComment);
        comments.push(newComment);
        main.setCommentList(comments);
        displayCurrent();

    }
    document.getElementById("commentEntry").value = ""; //reset the input box


}

export function displayCurrent(){
    let current = main.getCommentingOn();
    
    if(current === "all"){
        hikes.updateComments(main.getCommentList());
    }else{
        hikes.updateComments(showCurrentHike(current));
    }

}

export function showCurrentHike(current) {
 
    let list = main.getCommentList();
    let currentList = list.filter(function (a) {
        return a.name === current;
    });
 
    
    return currentList;
}