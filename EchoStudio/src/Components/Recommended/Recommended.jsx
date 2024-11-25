import React, { useEffect, useState } from 'react';
import './Recommended.css';
import PropTypes from 'prop-types';
import { API_KEY } from '../../data';
import { Link } from 'react-router-dom';
import { value_converter } from '../../data';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}&maxResults=45`;
        await fetch(relatedVideoUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data.items));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Utility function to truncate titles
    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
    };

    return (
        <div className="recommended">
            {apiData.map((item) => (
                <div key={item.id} className="side-video-list">
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`}>
                        <img
                            src={item.snippet?.thumbnails?.medium?.url}
                            alt={item.snippet?.title}
                        />
                        <div className="vid-info">
                            {/* Truncate the title to 50 characters */}
                            <h4>{truncateTitle(item.snippet?.title, 50)}</h4>
                            <p>{item.snippet?.channelTitle}</p>
                            <p>{value_converter(item.statistics?.viewCount)} Views</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

Recommended.propTypes = {
    categoryId: PropTypes.string.isRequired,
};

export default Recommended;



// import React, { useEffect, useState } from "react";
// import "./Recommended.css";
// import PropTypes from "prop-types";
// import { API_KEY, value_converter } from "../../data";

// const Recommended = ({ categoryId }) => {
//   const [apiData, setApiData] = useState([]);

//   // Fetching data from the YouTube API
//   const fetchData = async () => {
//     const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}&maxResults=45`;
//     try {
//       const response = await fetch(relatedVideoUrl);
//       const data = await response.json();
//       setApiData(data.items || []); // Handle cases where `items` may be undefined
//     } catch (error) {
//       console.error("Error fetching YouTube API data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Re-fetch videos when `categoryId` changes

//   return (
//     <div className="recommended">
//       {apiData.map((item) => {
//         const { id, snippet, statistics } = item;
//         const { title, channelTitle, thumbnails } = snippet;
//         return (
//           <div key={id} className="side-video-list">
//             <img
//               src={thumbnails?.medium?.url || thumbnails?.default?.url}
//               alt={title}
//             />
//             <div className="vid-info">
//               <h4>{title}</h4>
//               <p>{channelTitle}</p>
//               <p>{value_converter(statistics?.viewCount)} Views</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// Recommended.propTypes = {
//   categoryId: PropTypes.string.isRequired,
// };

// export default Recommended;

