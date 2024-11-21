import React, { useState, useEffect } from "react";
import "./Playvideo.css";
import moment from "moment";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
// import user_profile from "../../assets/user_profile.jpg";
import PropTypes from "prop-types";
import { API_KEY, value_converter } from "../../data";

const Playvideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([])


    const fetchVideoData = async () => {
        try {
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(videoDetailsUrl);
            const data = await response.json();

            if (response.ok) {
                setApiData(data.items?.[0] || null);
            } else {
                console.error("Error fetching video details:", data);
            }
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    const fetchChannelData = async () => {
        if (!apiData?.snippet?.channelId) return;

        try {
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const response = await fetch(channelDataUrl);
            const data = await response.json();

            if (response.ok) {
                setChannelData(data.items?.[0] || null);
            } else {
                console.error("Error fetching channel data:", data);
            }
        } catch (error) {
            console.error("Error fetching channel data:", error);
        }


        // fetching comment data 
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) fetchChannelData();
    }, [apiData]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="YouTube Video"
            ></iframe>

            <h3>{apiData?.snippet?.title || "Title Here"}</h3>

            <div className="play-video-info">
                <p>
                    {value_converter(apiData?.statistics?.viewCount) || "16k"} &bull;
                    {apiData?.snippet?.publishedAt
                        ? moment(apiData.snippet.publishedAt).fromNow()
                        : "Unknown date"}
                </p>

                <div>
                    <span>
                        <img src={like} alt="Like" />
                        {value_converter(apiData?.statistics?.likeCount) || "16k"}
                    </span>
                    <span>
                        <img src={dislike} alt="Dislike" />
                    </span>
                    <span>
                        <img src={share} alt="Share" /> Share
                    </span>
                    <span>
                        <img src={save} alt="Save" /> Save
                    </span>
                </div>
            </div>

            <hr />

            <div className="publisher">
                <img
                    src={channelData?.snippet?.thumbnails?.default?.url || ""}
                    alt="Channel Logo"
                />
                <div>
                    <p>{channelData?.snippet?.title || "Channel Name"}</p>
                    <span>
                        {value_converter(channelData?.statistics?.subscriberCount) || "1M"} subscribers
                    </span>
                </div>
                <button>Subscribe</button>
            </div>

            <div className="vid-description">
                <p>
                    {apiData?.snippet?.description?.slice(0, 250) || "Description here"}...
                </p>

                <hr />

                <h4>{value_converter(apiData?.statistics?.commentCount) || 102} Comments</h4>
                {commentData.map((item, index) => {
                    return (
                        <>
                            <div key={index} className="comment">
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User" />
                                <div>
                                    <h3>
                                        {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                                    </h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="Like" />
                                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                        <img src={dislike} alt="Dislike" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}


            </div>
        </div>
    );
};

Playvideo.propTypes = {
    videoId: PropTypes.string.isRequired,
};

export default Playvideo;
