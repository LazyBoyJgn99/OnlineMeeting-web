import React, { Component } from 'react';
import golbal from '@/golbal';
import {Button, Drawer, Icon, Modal, Table, Tooltip, Input, message} from "antd"
class TaskDrawer extends Component {
    componentDidMount(){
    }
    state={
        id:"",
        speaker:"",
        content:"",
        visible:false,
        update:false,
    }
    showAddTask=()=>{
        this.setState({
            speaker:"",
            content:"",
            visible:true,
            update:false,
        })
    }
    speakerChange=(e)=>{
        this.setState({
            speaker:e.target.value
        })
    }
    contentChange=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    onCancel=()=>{
        this.setState({
            visible:false,
        })
    }
    showUpdate=(id,speaker,content)=>{
        this.setState({
            id:id,
            speaker:speaker,
            content:content,
            visible:true,
            update:true,
        })
    }
    insertOne=()=>{
        const url=golbal.localhostUrl+"IMeeting/task/insertOne";
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                name:this.state.speaker,
                content:this.state.content,
                meetingId:this.props.meetingId,
            }),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
            console.log(data);
            if(data.status){
                message.success(data.message)
                this.props.findByMeeting("",this.props.meetingId)
                this.setState({
                    visible:false,
                })
            }else{
                message.error(data.message)
            }
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    updateOne=()=>{
        const url=golbal.localhostUrl+"IMeeting/task/updateOne";
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id:this.state.id,
                speaker:this.state.speaker,
                content:this.state.content,
                meetingId:this.props.meetingId,
            }),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
            console.log(data);
            if(data.status){
                message.success(data.message)
                this.props.findByMeeting("",this.props.meetingId)
            }else{
                message.error(data.message)
            }
            this.setState({
                visible:false,
            })
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    deleteOne=(id)=>{
        const url=golbal.localhostUrl+"IMeeting/task/deleteOne?taskId="+id;
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
            if(data.status){
                message.success(data.message)
                this.props.findByMeeting("",this.props.meetingId)
                this.setState({
                    visible:false,
                })
            }else{
                message.error(data.message)
            }
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }

    render() {
        const {
            visible, onClose
        } = this.props;
        const columns=[
            {   title:"序号",
                key:"id",
                render:(item,data,i)=>{
                    return(<div>{i+1}</div>)
                }
            },{
                title:"文件名",
                dataIndex:"fileName",
            },{
                title:"状态",
                dataIndex:"status",
                render:(item)=>{
                    switch (item) {
                        case 1:
                            return "允许下载"
                        case 2:
                            return "禁止下载"
                        default:
                            return item
                    }
                }
            },{
                title:"操作",
                render:(item)=>{
                    return(
                        <div>
                            <Tooltip title="修改">
                                <Button onClick={()=>{this.showUpdate(item.id,item.name,item.content)}}><Icon type="edit" /></Button>
                            </Tooltip>
                            <Tooltip title="删除">
                                <Button onClick={()=>{this.deleteOne(item.id)}}><Icon style={{color:"red"}}type={"delete"}></Icon></Button>
                            </Tooltip>
                        </div>
                    )
                }
            }
        ];
        return (
            <Drawer
                title={
                    <Button href="#" type={"primary"} onClick={this.showAddTask}>添加</Button>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={"60%"}
            >
                <Table
                    rowKey={record=>record.id}
                    columns={columns}
                    dataSource={this.props.fileList} />
                <Modal
                    title={"会议任务"}
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    onOk={this.state.update?this.updateOne:this.insertOne}
                >
                    任务名：<Input value={this.state.speaker} onChange={this.speakerChange}/>
                    任务要求：<Input.TextArea value={this.state.content} onChange={this.contentChange}/>
                </Modal>
            </Drawer>
        );
    }
}

export default TaskDrawer;
