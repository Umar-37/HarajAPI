//import fetch from 'node-fetch';
//import { Grid } from "./node_modules/gridjs/dist/gridjs.mjs";
//import "gridjs/dist/theme/mermaid.css";
//import "./node_modules/gridjs/dist/theme/mermaid.css"
const omar = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `query($tag:String,$city:String,$page:Int) { posts( tag:$tag, city:$city, page:$page) {\n\t\titems {\n\t\t\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId\n\t\t}\n\t\tpageInfo {\n\t\t\thasNextPage\n\t\t}\n\t\t} }`,
        variables: 
        { "tag": "حراج الأجهزة", "city": "الشرقيه", "page":1 
         },
    }),
}
let pageNumber=1;
//let city='الرياض'
//const url = 'https://graphql.haraj.com.sa/?queryName=initialPosts&token=&clientId=OzSuJomt-2WRC-oLq7-an4k-lgahehAcpMuev3&version=8.2.1%20,%2011%2024%20-%202%20-%2022/'
const url = 'https://graphql.haraj.com.sa/'

async function fetchMovies() {
    const response = await fetch(url, omar);
    // waits until the request completes...
    let res = await response.json();
    let posts=res.data.posts.items
    console.log(res.data.posts.items);
    //posts.forEach(item=>{console.log(item);})
    console.log(res)
    return posts;
}
fetchMovies()
//let posts=await fetchMovies()
//let grid=createData()
//grid.render(document.getElementById("wrapper"));

///////////
document.getElementById('pageNumber').addEventListener('change',e=>{
    //
    pageNumber=document.getElementById('pageNumber').valueAsNumber
    ///
    let sad=createData(pageNumber,'')
    sad.render(document.getElementById("wrapper"));
 })
////////////////////////////////////////////
let theCity=document.getElementById('city')
theCity.addEventListener('change',e=>{
    let sad;
    if(e.target.value==2){
    sad=createData(pageNumber,'الرياض')
    }else if(e.target.value==3){
     sad=createData(pageNumber,'الشرقيه')
    }else{

     sad=createData(pageNumber,'')
    }
sad.render(document.getElementById("wrapper"));
console.log(e.target.value)
})
/////////////////////////////////////////////
function createData(number,city){
let body=document.querySelector('body')
    let newDiv=document.createElement('div')
    newDiv.setAttribute('id','wrapper')
    body.replaceChild(newDiv,document.getElementById('wrapper'))
let grid=new gridjs.Grid({
    search:true,
      pagination: {
    enabled: true,
    limit: 20,
    summary: true
  },
  columns: ["ID", "authorUserName","title", "city"],
  server:{
    url:url,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `query($tag:String,$city:String,$page:Int) { posts( tag:$tag, city:$city, page:$page) {\n\t\titems {\n\t\t\tid status authorUsername title city postDate updateDate hasImage thumbURL authorId\n\t\t}\n\t\tpageInfo {\n\t\t\thasNextPage\n\t\t}\n\t\t} }`,
        variables: 
            { "tag": "حراج الأجهزة","city":city, "page":number
         },
    }),
    then:data=>data.data.posts.items.map(post=>{
        //post.id=`<a href='https://google.com'>${post.id}</a>`
        return [post.id,post.authorUsername,post.title,post.city]
    })
    //then:data=>console.log(data.data.posts.items)
  },
})
return grid;
}