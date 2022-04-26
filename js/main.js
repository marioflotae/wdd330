
const links = [
    {
        label: "Week 1 notes",
        url: "week1/index.html"
    }
]

function weeks(){
    let content = "";
    for (let i = 0; i < links.length; i++){
        content += "<li><a href='" + links[i].url +"'>" + links[i].label +"</a></li>"
    }
    document.getElementById("url").innerHTML = content;
}
