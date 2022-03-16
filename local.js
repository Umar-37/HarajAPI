import fetch from 'node-fetch';
import fs from 'fs'
import util from 'util'
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
        {
            "tag": "حراج الأجهزة", "city": "الشرقيه", "page": 1
        },
    }),
}
let pageNumber = 1;
//let city='الرياض'
const url = 'https://graphql.haraj.com.sa/'

async function fetchMovies() {
    const response = await fetch(url, omar);
    // waits until the request completes...
    let res = await response.json();
    let posts = res.data.posts.items
    //console.log(res.data.posts.items);
    //posts.forEach(item=>{console.log(item);})
    //console.log(res)
    return posts;
}
async function main() {
    let theData = await fetchMovies()
    let fakeData = { id: 3711 }
    //theData.push(fakeData)
    loadAndWrite(theData)

    //console.log(theData);
}
//console.log(theData);
async function loadAndWrite(theData) {
    const readFile = util.promisify(fs.readFile);
    let data = await readFile('thefile.json')
    //console.log(JSON.parse(data));
console.log(JSON.parse(data));
    theData.push(JSON.parse(data))
//    console.log(theData);

    //fs.writeFileSync('thefile.json',JSON.stringify(theData))
    const writeFile = util.promisify(fs.writeFile);
    writeFile('thefile.json', JSON.stringify(theData))
}

main()
