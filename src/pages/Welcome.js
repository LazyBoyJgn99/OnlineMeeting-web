import React, { Component } from 'react';
// import {Layout} from "antd/lib/layout";
import { Carousel} from 'antd';
import '@/css/Welcome.css';
import Img1 from '@/img/welcome/outDoor.png';
import Img2 from '@/img/welcome/ArcSoft.png';
import Img3 from '@/img/welcome/room1.png';
import Img4 from '@/img/welcome/ArcSoft.png';
import Img5 from '@/img/welcome/room1.png';


class Welcome extends Component {

    render() {
        return (
            <div className='welPage'>
                <br/>
                <h1>Welcome</h1>
                {/*轮播图*/}
                <Carousel autoplay='true' className='welCar'>
                    <img src={Img1} className='welImg' alt={1}/>
                    <img src={Img2} className='welImg' alt={2}/>
                    <img src={Img3} className='welImg' alt={3}/>
                    <img src={Img4} className='welImg' alt={4}/>
                    <img src={Img5} className='welImg' alt={5}/>
                </Carousel>

            </div>
        );
    }
}

export default Welcome;
