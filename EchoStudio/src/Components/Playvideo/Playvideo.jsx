// import React, { useState ,useEffect} from 'react'
// import './Playvideo.css'
// // import Video1 from '../../assets/video.mp4'
// import like from '../../assets/like.png'
// import dislike from '../../assets/dislike.png'
// import share from '../../assets/share.png'
// import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
// import user_profile from '../../assets/user_profile.jpg'
// import PropTypes from 'prop-types'
// import { API_KEY } from '../../data'


// const Playvideo = ({videoId}) => {
//     const [apiData,setApiData]=useState(null)
//     const fetchVideoData=async()=>{
//         // fetching videos data
//         // const videoDetails_url=`//youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
//         const videoDetails_url=`//youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&videoCategoryId=${videoId}&key=${API_KEY}`
//         await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
//     }

//     useEffect(() => {
//       fetchVideoData()
//     }, [])
    
//   return (
//     <div className='play-video'>
//         {/* <video src={Video1} controls autoPlay muted></video> */}
//         <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//         <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        

//         <div className="play-video-info">
//             <p>{apiData?apiData.statistic.viewCount:"16k"} &bull; 2 days ago</p>
//             <div>
//                 <span><img src={like} alt="" />125</span>
//                 <span><img src={dislike} alt="" />2</span>
//                 <span><img src={share} alt="" />Share</span>
//                 <span><img src={save} alt="" />Save</span>
//             </div>
//         </div>
//         <hr />
//         <div className="publisher">
//             <img src={jack} alt="" />
//             <div>
//                 <p>Greatstack</p>
//                 <span>1M subscribers</span>
//             </div>
//             <button>Subscribe</button>
//         </div>
//         <div className="vid-description">
//             <p>channel that makes learning easy</p>
//             <p>subscribe GreatStack to watch more tutorials on web development</p>
//             <hr />
//             <h4>130 Comments</h4>
//             <div className="comment">
//                 <img src={user_profile} alt="" />
//                 <div>
//                     <h3>Jack Nicholsan <span>1 day ago</span></h3>
//                     <p>A globsl computer network providing a variety of information and connection of interconnected networks using standardized communication protocals</p>
//                     <div className="comment-action">
//                         <img src={like} alt="" />
//                         <span>244</span>
//                         <img src={dislike} alt="" />
                        
//                     </div>
//                 </div>
//             </div>
//             <div className="comment">
//                 <img src={user_profile} alt="" />
//                 <div>
//                     <h3>Jack Nicholsan <span>1 day ago</span></h3>
//                     <p>A globsl computer network providing a variety of information and connection of interconnected networks using standardized communication protocals</p>
//                     <div className="comment-action">
//                         <img src={like} alt="" />
//                         <span>244</span>
//                         <img src={dislike} alt="" />
                        
//                     </div>
//                 </div>
//             </div>
//             <div className="comment">
//                 <img src={user_profile} alt="" />
//                 <div>
//                     <h3>Jack Nicholsan <span>1 day ago</span></h3>
//                     <p>A globsl computer network providing a variety of information and connection of interconnected networks using standardized communication protocals</p>
//                     <div className="comment-action">
//                         <img src={like} alt="" />
//                         <span>244</span>
//                         <img src={dislike} alt="" />
                        
//                     </div>
//                 </div>
//             </div>
//             <div className="comment">
//                 <img src={user_profile} alt="" />
//                 <div>
//                     <h3>Jack Nicholsan <span>1 day ago</span></h3>
//                     <p>A globsl computer network providing a variety of information and connection of interconnected networks using standardized communication protocals</p>
//                     <div className="comment-action">
//                         <img src={like} alt="" />
//                         <span>244</span>
//                         <img src={dislike} alt="" />
                        
//                     </div>
//                 </div>
//             </div>
//             <div className="comment">
//                 <img src={user_profile} alt="" />
//                 <div>
//                     <h3>Jack Nicholsan <span>1 day ago</span></h3>
//                     <p>A globsl computer network providing a variety of information and connection of interconnected networks using standardized communication protocals</p>
//                     <div className="comment-action">
//                         <img src={like} alt="" />
//                         <span>244</span>
//                         <img src={dislike} alt="" />
                        
//                     </div>
//                 </div>
//             </div>
//         </div>
      
//     </div>
//   )
// }
// Playvideo.propTypes = {
//     videoId: PropTypes.string.isRequired,
// };


// export default Playvideo

import React, { useState, useEffect } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import PropTypes from "prop-types";
import { API_KEY } from "../../data";

const Playvideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetails_url);
        const data = await response.json();
        setApiData(data.items?.[0] || null);
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <h3>{apiData?.snippet?.title || "Title Here"}</h3>

            <div className="play-video-info">
                <p>{apiData?.statistics?.viewCount || "16k"} &bull; 2 days ago</p>
                <div>
                    <span>
                        <img src={like} alt="Like" />125
                    </span>
                    <span>
                        <img src={dislike} alt="Dislike" />2
                    </span>
                    <span>
                        <img src={share} alt="Share" />Share
                    </span>
                    <span>
                        <img src={save} alt="Save" />Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={jack} alt="Channel Logo" />
                <div>
                    <p>{apiData?.snippet?.channelTitle || "Channel Name"}</p>
                    <span>{apiData?.statistics?.subscriberCount || "1M"} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?.snippet?.description || "Description here"}</p>
                <hr />
                <h4>130 Comments</h4>
                <div className="comment">
                    <img src={user_profile} alt="User" />
                    <div>
                        <h3>
                            Jack Nicholsan <span>1 day ago</span>
                        </h3>
                        <p>A global computer network providing a variety of information...</p>
                        <div className="comment-action">
                            <img src={like} alt="Like" />
                            <span>244</span>
                            <img src={dislike} alt="Dislike" />
                        </div>
                    </div>
                </div>
                {/* Repeat comments as needed */}
            </div>
        </div>
    );
};

Playvideo.propTypes = {
    videoId: PropTypes.string.isRequired,
};

export default Playvideo;

