const container = document.getElementById("container");
const apiKey= "AIzaSyCcdiJNbJaXpA1KHJjIWiAP63fnbVjZem0";

const Url = "https://www.googleapis.com/youtube/v3/commenThreads";

// function loadComments(){
//     let videoId="_OP1tS88kbg";
//     const prom = fetch(`4{Url}?key=${apiKey}&videoId=${videoId}&maxResults=3&part=snippet`);


// prom.then((response) =>{
//     let p=response.json();

//     p.then((data) => {
// data.items.forEach((item) => {
//   const authorName = item.snippet.topLevelComment.snippet.authorDisplayName;
// const commenttext = item.snippet.topLevelComment.snippet.textDisplay;
// const likeCount = item.snippet.topLevelComment.snippet.likeCount;
// const repliesCount = item.snippet.totalReplyCount;
// const profileUrl = item.snippet.topLevelComment.snippet.authorProfileImageUrl;
// const publishedTime = item.snippet.topLevelComment.snippet.publishedAt;

// });  
//   });
// });
// }
// loadComments("");

async function loadComments(){
        let videoId="_OP1tS88kbg";
        let endpoint = fetch(`4{Url}?key=${apiKey}&videoId=${videoId}&maxResults=3&part=snippet`);
        const response = await fetch(endpoint);
        const result = await response.json();
        result.items.forEach((item) => {
            const repliesCount = item.snippet.totalReplyCount;

              const {
                authorDisplayName ,
             commenttext,
             likeCount ,
             authorProfileImageUrl:profileUrl,
             publishedAt,
              } = item.snippet.topLevelComment.snippet;

            });
        }
            
         loadComments();
