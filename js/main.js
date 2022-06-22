
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
    },
    {
        label: "Week 6 notes",
        url: "week06/index.html"
    },
    {
        label: "Week 7 notes",
        url: "week07/index.html"
    },
    {
        label: "Week 8 notes",
        url: "week08/index.html"
    }
]

function weeks(){
    let content = "";
    for (let i = 0; i < links.length; i++){
        content += "<li><a href='" + links[i].url +"'>" + links[i].label +"</a></li>"
    }
    document.getElementById("url").innerHTML = content;
}




