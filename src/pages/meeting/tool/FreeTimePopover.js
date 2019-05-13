import React, { Component } from 'react';
import {Button,Popover} from "antd";
import golbal from '@/golbal';


class FreeTimePopover extends Component {
    componentDidMount(){
        this.findFreeTime();
    }
    state = {
        freeTimeData:[],
    }
    findFreeTime=()=>{
        const url=golbal.localhostUrl+"IMeeting/meeting/findFreeTime?meetRoomId="+this.props.meetRoomId+"&meetDate="+this.props.searchDate;
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
            }),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
            console.log(data);
            this.setState({
                freeTimeData:data.data
            })
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    render() {
        return (
            <div >
                <Popover
                    content={
                        <div>
                            空闲时间段：
                            <br/>
                            {this.state.freeTimeData.map((item,i)=>{
                                return <div key={i}>
                                    {item}
                                    <br/>
                                </div>
                            })}
                        </div>
                    }
                    title={this.props.meetRoomName}
                >
                    <Button onClick={this.findFreeTime}>
                        查看
                    </Button>
                </Popover>

            </div>
        );
    }
}

export default FreeTimePopover;
