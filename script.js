const apiKey= "AIzaSyCEa6AunwjUp6g2db0thf-E0nNpELTu3r4";
// const apiKey= "AIzaSyCEa6AunwjUp6g2db0thf-E0nNpELTu3r4";

 const baseUrl = "https://www.googleapis.com/youtube/v3";

 const searchButton=document.getElementById("search-button");
 const searchInput=document.getElementById("search-input");
 const container = document.getElementById("container");

 function calculateTheTimeGap(publishTime){
    let publishDate = new Date(publishTime);
    let currentDate = new Date();

    let secondsGap=(currentDate.getTime() - publishDate.getTime()) / 1000;

  const secondsPerDay = 24 * 60 * 60;
   const secondsPerWeek = 7 * secondsPerDay;
   const secondsPermonth = 30* secondsPerDay;
   const secondsPerYear = 365 * secondsPerDay;

  if (secondsGap < secondsPerDay){
    return `${math.ceil(secondsGap /(60 * 60))}hrs ago`
  }
if(secondsGap < secondsPerWeek){
    return `${Math.ceil(secondsGap / secondsPerWeek)} weeks ago`
}
  if(secondsGap < secondsPermonth){
    return `${Math.ceil(secondsGap / secondsPermonth)} months ago`
  }
 
    return `${Math.ceil(secondsGap / secondsPerYear)} years ago`
  
 }

  function navigateToVideoDetails(videoId){
   document.cookie = `id=${videoId}; path=http://127.0.0.1:5500/videoDetails.html`;
   window.location.href = "http://127.0.0.1:5500/videoDetails.html";
  }

 async function getVideoStatistics(videoId){
  // Endpoint: /videos?part=snippet,contentDetails,statistics&id=video_id&key={apiKey}

   const endpoint = `${baseUrl}/videos?key=${apiKey}&part=statistics&maxResults=5&id=${videoId}`
   try{
    const response = await fetch(endpoint);
    const result = await response.json();
    
   return result.items[0].statistics;
   console.log(result.items[0].statistics);
   }
   catch(error){
    console.log("Failed to fetch Stastistics")
   }
 }
//  getVideoStatistics("5yl26a4gcQs");
/* <div class="video">
                    <img id="thumbnail" src="./sources/main-vid/YouTube UI Clone Design (Community) (Copy) (2)/image 1.png" alt="">
                </div>
                <div class="bottom-container">
                <div class="logo-container">
                    <img class="logo" src="./sources/left3/YouTube UI Clone Design (Community) (Copy) (2)/User-Avatar.png" alt="">
                </div>
                <div class="title-container">
                    <p class="title">
                        Lorem ipsum dolor sit amet, consecte 
                        adipiscing elit.
                    </p>
                    <p class="grey-text">James Gouse</p>
                    <p class="grey-text">15K Views .1 week ago</p>
                </div>
            </div> */
 

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

  async function fetchSearchResults(searchString){
    // https://www.googleapis.com/youtube/v3/search?key={apiKey}&part=snippet&q=js&type=video
    const endpoint = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
    try{
    const response= await fetch(endpoint);
    const result = await response.json();

    for(let i=0;i<result.items.length;i++){
   let currentVideoId = result.items[i].id.videoId;
   let channelId = result.items[i].snippet.channelId;
   const currentVideoStatistics = await getVideoStatistics(currentVideoId);
   let channelLogo = await fetchChannelLogo(channelId);
    result.items[i].statistics = currentVideoStatistics;
    result.items[i].channelLogo = channelLogo ;

    }

    renderVideosOntoUI(result.items);
    // console.log(result);
    }
    catch(error){
      console.log("Some error occured");
    } 
  }

  searchButton.addEventListener("click",() => {
    const searchValue=searchInput.value ;
    fetchSearchResults(searchValue);
  });

  
   fetchSearchResults("");
//    items
// : 
// Array(5)
// 0
// : 
// etag
// : 
// "eFVHSWYcKKtKp5-9NG6jy2HY4RQ"
// id
// : 
// kind
// : 
// "youtube#video"
// videoId
// : 
// "Za_MG36rOgk"
// [[Prototype]]
// : 
// Object
// kind
// : 
// "youtube#searchResult"
// snippet
// : 
// {publishedAt: '2023-05-13T11:00:33Z', channelId: 'UCyOUOh_JVpkYPM1JztXoleQ', title: '❌ Who is stronger than 20 or 30 years? #shorts #foryou', description: '', thumbnails: {…}, …}
// statistics
// : 
// {viewCount: '112539994', likeCount: '3587728', favoriteCount: '0', commentCount: '1900'}
// [[Prototype]]
// : 
// Object
// 1
// : 
// {kind: 'youtube#searchResult', etag: 'EJsnEBrM5WrQtO8gcTd9YV9Qg_Y', id: {…}, snippet: {…}, statistics: {…}}
// 2
// : 
// {kind: 'youtube#searchResult', etag: '__Xpnm1JUpWpVQ5GI15viFt-VmM', id: {…}, snippet: {…}, statistics: {…}}
// 3
// : 
// {kind: 'youtube#searchResult', etag: 'rHaO0kHfmm3aKWdqBre-jM0ZBN4', id: {…}, snippet: {…}, statistics: {…}}
// 4
// : 
// {kind: 'youtube#searchResult', etag: 'k-nKpb4Sx8oCL1zgh9XbLzX6jDs', id: {…}, snippet: {…}, statistics: {…}}
// length
// : 
// 5
// [[Prototype]]
// : 
// Array(0)
// kind
// : 
// "youtube#searchListResponse"
// nextPageToken
// : 
// "CAUQAA"
// pageInfo
// : 
// {totalResults: 1000000, resultsPerPage: 5}
// regionCode
// : 
// "IN"
// // 
