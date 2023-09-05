// const apiKey= "AIzaSyDiH8JeOWDMAOjehdVucoik_knNpGmLy6A";
// var api_Key= "AIzaSyD8beFUC4_HVa3B8N25cD-vDoPZnnZM5TQ";
var api_Key= "AIzaSyAJ57WerWcICAW0vt4X5WWgam33KXfSXXc";
const baseUrl = "https://www.googleapis.com/youtube/v3";

var url = "https://www.googleapis.com/youtube/v3/commentThreads";

var commentsContainer= document.getElementById('comments-container');

window.addEventListener("load", () => {
    let videoId = document.cookie.split("=")[1];
 

    // var videoId = document.cookie.split("=")[1].substring(1);

if(YT) {
    new YT.Player("video-placeholder",{
        height:360,
        width:640,
        videoId,
        
       });
       
       loadComments(videoId);
    }
});






async function loadComments(videoId){
   
    let endpoint = `${url}?key=${api_Key}&videoId=${videoId}&maxResults=10&part=snippet`;
   try{
    const response = await fetch(endpoint);
    const result = await response.json();
    // console.log(result.items)
    result.items.forEach((item) => {
        const repliesCount = item.snippet.totalReplyCount;
        const authorDisplayName = item.snippet.topLevelComment.snippet.authorDisplayName;
        const textDisplay = item.snippet.topLevelComment.snippet.textDisplay;
        const likeCount = item.snippet.topLevelComment.snippet.likeCount;
        const authorProfileImageUrl = item.snippet.topLevelComment.snippet.authorProfileImageUrl;
        const publishedAt = item.snippet.topLevelComment.snippet.publishedAt;
        console.log(repliesCount);
        //   const {
        //     authorDisplayName ,
        //  textDisplay,
        //  likeCount ,
        //  authorProfileImageUrl:profileUrl,
        //  publishedAt,
        //   } = item.snippet.topLevelComment.snippet;


          const div = document.createElement("div");
          div.className = "comment";
          div.innerHTML=`
          <img src="${authorProfileImageUrl}" class="author-profile" >
          <div class="author">
          <b>${authorDisplayName}</b>
          
          <p>${textDisplay}</p> 
          </div>`;

          commentsContainer.appendChild(div);
        });
    }
        catch(error){
            console.log("error occured");
        }
    
}
    const channelName=document.getElementById("channelname");

    async function fetchName(videoId){
    const endpoint = `${baseUrl}/videos?key=${api_Key}&id=${videoId}&part=snippet&maxResults=20`
    try{
        const response= await fetch(endpoint);
        const result = await response.json();
        console.log(result.items)
        return result.items[0].snippet ;

        const name=document.createElement("h2");
        name.className="channelName";
        name.innerHTML=`
        <h2 class="channelName">${result.items[0].snippet.channelTitle}</h2>
        `
      

     channelName.appendChild(name);


    }
    catch(error){
        console.log("Failed to load channel logo for ", channelId);

    }
  }  

    async function fetchChannelLogo(channelId){
      const endpoint = `${baseUrl}/channels?key=${apiKey}&id=${channelId}&part=snippet&maxResults=20`
      try{
          const response= await fetch(endpoint);
          const result = await response.json();
          return result.items[0].snippet.thumbnails.high.url ;
      }
      catch(error){
          console.log("Failed to load channel logo for ", channelId);
  
      }
    } 
  
     const container = document.getElementById("container");
 

    function renderVideosOntoUI(videosList){
        videosList.forEach((video) =>{
           const videoContainer=document.createElement("div");
           videoContainer.className="video";
           videoContainer.innerHTML=`
            <img 
            id="thumbnail" 
            class="thumbnail" 
            src="${video.snippet.thumbnails.high.url}" alt="thumbnail">
           </div>
           <div class="bottom-container">
           <div class="logo-container">
               <img class="logo" src="${video.channelLogo}" alt="logo">
           </div>
           <div class="title-container">
               <p class="title">
                   ${video.snippet.title}
               </p>
               <p class="grey-text">${video.snippet.channelTitle}</p>
               <p class="grey-text">${video.statistics.viewCount} . ${calculateTheTimeGap(video.snippet.publishTime)}</p>
           </div>
           `;
           
           videoContainer.addEventListener("click", () => {
            navigateToVideoDetails(video.id.videoId);
           })
      
           container.appendChild(videoContainer);
        });
       }
       renderVideosOntoUI("");