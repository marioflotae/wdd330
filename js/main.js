
const links = [
    {
        label: "Week 1 notes",
        url: "week01/index.html"
    },
    {
        label: "Week 2 notes",
        url: "week02/index.html"
    },
    {
        label: "Week 3 notes",
        url: "week03/index.html"
    },
    {
        label: "Week 4 notes",
        url: "week04/index.html"
    },
    {
        label: "Week 5 notes",
        url: "week05/index.html"
    }
]

function weeks(){
    let content = "";
    for (let i = 0; i < links.length; i++){
        content += "<li><a href='" + links[i].url +"'>" + links[i].label +"</a></li>"
    }
    document.getElementById("url").innerHTML = content;
}




