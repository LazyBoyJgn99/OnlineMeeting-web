import React, { Component } from 'react';
import {message,Input,Icon,Button,Form} from "antd";

class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            resume:"",
            positionName:"",
            phone:"",
            name:"",
            workNum:"",
            departName:"",
            password:"",
        }
    }
    //Input内容改变
    nameChange=(e)=>{
        this.setState({ name : e.target.value })
    }
    departNameChange=(e)=>{
        this.setState({ departName : e.target.value })
    }
    positionNameChange=(e)=>{
        this.setState({ positionName : e.target.value })
    }
    workNumChange=(e)=>{
        this.setState({ workNum : e.target.value })
    }
    phoneChange=(e)=>{
        this.setState({ phone : e.target.value })
    }
    resumeChange=(e)=>{
        this.setState({ resume : e.target.value })
    }

    //get用户信息
    getUserInfo=()=>{
        const url1="http://39.106.56.132:8080/IMeeting/showUserinfo";
        fetch(url1, {
            method: "POST",
            //type:"post",
            //url:"http://39.106.56.132:8080/userinfo/tologin",
            mode: "cors",//支持跨域
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({}),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
             console.log(data);

        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });

    }

    render() {

        return (
            <div >
                <Button onClick={this.getUserInfo}>get</Button>
                <h2>个人资料</h2>
                <Input placeholder='姓名' value={this.state.name} onChange={this.nameChange} disabled />
                <Input placeholder='部门' value={this.state.departName} onChange={this.departNameChange} disabled/>
                <Input placeholder='职位' value={this.state.positionName} onChange={this.positionNameChange} disabled/>
                <Input placeholder='工号' value={this.state.workNum} onChange={this.workNumChange} disabled/>
                <Input placeholder='手机号'value={this.state.phone} onChange={this.phoneChange} disabled/>
                <Input.TextArea rows={4}  placeholder='简介' value={this.state.resume} onChange={this.resumeChange}/>
            </div>
        );
    }
}


export default UserInfo;
