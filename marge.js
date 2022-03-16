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
const url = 'https://graphql.haraj.com.sa/'

async function fetchMovies() {
    const response = await fetch(url, omar);
    // waits until the request completes...
    let res = await response.json();
    let posts=res.data.posts.items
    //console.log(res.data.posts.items);
    //posts.forEach(item=>{console.log(item);})
    console.log(posts)
    return posts;
}
let theData=await fetchMovies()
const grid =new gridjs.Grid({
  columns: ["Name", "Email", "Phone Number"],
  data:theData.map(post=>{
      return [post.id]
  }) 
})
grid.render(document.getElementById('wrapper'))
