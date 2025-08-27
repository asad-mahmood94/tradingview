// import Navbar from '../navcomponent/navbar';
// import ImageCard from './Image-card';
// import './Community.css';

// function Community() {
//     const imageData = [
//         {
//             image: '/gpic1.webp',
//             description: 'COINBASE:BTCUSD “Monster orders” are exceptionally large buy-limit orders clustered roughly 7 % beneath the current market price. Large buy-limit walls can act like a price magnet—deep liquidity attracts algos and traders hunting fills, often',
//         },
//         {
//             image: '/gpic2.webp',
//             description: 'OANDA:XAUUSD is forming a higher low above trend support, following a breakout from the consolidation zone and a bullish continuation leg. Price is currently pulling back toward the 3345–3350 region, which aligns with the previous breakout and key',
//         },
//         {
//             image: '/gpic3.webp',
//             description: 'Bitcoin is rising! Thats what everyone sees at the moment, but we dont want to get drunk and establish our profit target. Where to take profit? Because we are in the price discovery mode, there is no previous price action above the current price. At',
//         },
//         {
//             image: '/gpic4.webp',
//             description: 'The chart presented shows Bitcoin in a well-defined rising channel, highlighting a strong bullish momentum over recent trading sessions. Rising channel The price action is currently oscillating within the boundaries of this upward sloping channel,',
//         },
//     ];

//     return (
//         <>
//             <div className='whole'>
//                 <div className='nav'>
//                     <Navbar isLoginPage={true} />
//                 </div>
//                 <div className='heads'>
//                     <div>
//                     <h1>Community ideas</h1>
//                     </div>
//                     <div style={{ marginTop: "50px" , marginRight: ""}}>
//                     <button style={{ marginRight: "20px" , backgroundColor: "black" , color: "white" , borderRadius: "30px"}}>Popular</button>
//                     <button style={{borderRadius: "30px" , backgroundColor: "grey"}}>Editors picks</button>
//                     </div>
//                 </div>

//                 <div className='community-content'>
//                     <div className='image-grid'>
//                         {imageData.map((item, index) => (
//                             <ImageCard
//                                 key={index}
//                                 image={item.image}
//                                 description={item.description}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Community; 

import React, { useEffect, useState } from 'react';
import Navbar from '../navcomponent/navbar';
import ImageCard from './Image-card';
import './Community.css';
import axios from 'axios';

function Community() {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setImageData(res.data);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div className='whole'>
                <div className='nav'>
                    <Navbar isLoginPage={true} />
                </div>
                <div className='heads'>
                    <div>
                        <h1>Community ideas</h1>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <button style={{ marginRight: "20px", backgroundColor: "black", color: "white", borderRadius: "30px" }}>Popular</button>
                        <button style={{ borderRadius: "30px", backgroundColor: "grey" }}>Editors picks</button>
                    </div>
                </div>

                <div className='community-content'>
                    <div className='image-grid'>
                        {imageData.map((item, index) => (
                            <ImageCard
                                key={index}
                                image={item.image}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Community;

