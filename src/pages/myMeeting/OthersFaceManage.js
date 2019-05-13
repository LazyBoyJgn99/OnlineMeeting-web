import React, { Component } from 'react';
import {Table, Card, Col, Row, Button, Tooltip, Icon, message, Upload, Modal, Input} from "antd";
import golbal from '@/golbal';
import Highlighter from "react-highlight-words";
import face1 from "@/pages/myMeeting/tool/face1.jpg";
import face2 from "@/pages/myMeeting/tool/face2.jpg";
import face3 from "@/pages/myMeeting/tool/face3.jpg";
import face4 from "@/pages/myMeeting/tool/face4.jpg";

const props = {
// onPreview={this.fileHandlePreview}
// onChange={this.fileHandleChange}
    withCredentials:true,
    name: 'file',
    headers: {
        authorization: 'authorization-text',
        "Access-Control-Allow-Credentials" : true ,
        "Access-Control-Allow-Headers" : "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
        "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin" : "*",
    },
    // onPreview(e){this.fileHandlePreview(e)},
    // onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //         if(info.file.response.status){
    //             message.success(info.file.response.message);
    //         }else {
    //             message.warning(info.file.response.message);
    //
    //         }
    //     }
    // },
};

class OthersFaceManage extends Component {
    componentDidMount(){
        this.selectAll();
    }
    state={
        previewVisible: false,
        fileModalVisible: false,
        previewImage: '',
        fileList: [],
        worknum:"",
        dataSource:[],
        faceId:0,
        modalVisible: false,
    }
    //表格查询...this.getColumnSearchProps("name"),
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    //表格查询

    fileHandleCancel = () => this.setState({ previewVisible: false })
    modalHandleCancel = () => this.setState({ fileModalVisible: false })
    showFileModal=()=> this.setState({ fileModalVisible: true })


    fileHandlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    fileHandleChange = ( {fileList} ) => {
        console.log( "log:",fileList );
        // console.log( "log1:",fileList[0].response );
        if(fileList.length !== 0){
            if(fileList[0].response!== undefined){
                // console.log( "log2:",fileList[0].response );
                if(fileList[0].response.status){
                    message.success(fileList[0].response.message);
                }else {
                    message.warning(fileList[0].response.message);
                }
            }
        }
        this.setState({
            fileList
        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    showDelete=(ev,id)=>{
        this.setState({
            modalVisible: true,
            faceId:id,
        });
    }
    worknumChange=(e)=>{
        this.setState({
            worknum:e.target.value,
        })
    }
    /////////////////////////////////////////////////////////////////////
    //pass
    pass = (ev,id) =>{
        const url=golbal.localhostUrl+"IMeeting/face/pass?faceId="+id;
        fetch(url, {
            method: "POST",
            mode: "cors",
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
            if(data.status){
                message.success("操作成功！")
            }
            this.selectAll();
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //dispass
    dispass = (ev,id) =>{
        const url=golbal.localhostUrl+"IMeeting/face/dispass?faceId="+id;
        fetch(url, {
            method: "POST",
            mode: "cors",
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
            if(data.status){
                message.success("操作成功！")
            }
            this.selectAll();
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }

    //deleteOne
    deleteOne = () =>{
        const url=golbal.localhostUrl+"IMeeting/face/deleteOne?faceId="+this.state.faceId;
        fetch(url, {
            method: "POST",
            mode: "cors",
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
            if(data.status){
                message.success(data.message);
            }else{
                message.error(data.message);
            }
            this.selectAll();
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //selectAll
    selectAll = () =>{
        const url=golbal.localhostUrl+"IMeeting/face/selectAll";
        fetch(url, {
            method: "POST",
            mode: "cors",
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
            this.setState({
                dataSource:data.data,
                modalVisible: false,
            })
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    render() {
        const columns=[
            {
                title:"序号",
                key:"id",
                render:(item,data,i)=>{
                    return(<div>{i+1}</div>)
                }
            },{
                title:"异常人员名称",
                dataIndex:"name",
                key:"name",
                ...this.getColumnSearchProps("name"),
                render:()=>{
                    return(
                        "陌生人"
                    )
                }
            },{
                title:"检测时间",
                dataIndex:"name",
                key:"name",
                render:()=>{
                    return(
                        "2019年3月12日 09:"+parseInt(Math.random()*51+10)+":"+parseInt(Math.random()*51+10)
                    )
                }
            },{
                title:"检测地点",
                dataIndex:"name",
                key:"name",
                render:()=>{
                    return(
                        "会议室一"
                    )
                }
            },{
                title:"图片",
                dataIndex:"faceAddress",
                key:"faceAddress",
                render:(item,data,i)=>{
                    switch (i) {
                        case 0:
                            return(<img style={{ width: 111, height:111 }} src={face1} title={"图片"}/>)
                        case 1:
                            return(<img style={{ width: 111, height:111 }} src={face2} title={"图片"}/>)
                        case 2:
                            return(<img style={{ width: 111, height:111 }} src={face3} title={"图片"}/>)
                        case 3:
                            return(<img style={{ width: 111, height:111 }} src={face4} title={"图片"}/>)
                        default:
                            return(<img style={{ width: 111, height:111 }} src={item} title={"图片"}/>)

                    }
                    return(<img style={{ width: 111, height:111 }} src={face1} title={"图片"}/>)
                }
            }
            // ,{
            //     title:"操作",
            //     render:(item)=>{
            //         return(
            //             <div>
            //                 <Tooltip title="审核通过">
            //                     <Button onClick={(ev)=>{this.pass(ev,item.id)}}><Icon type="check" /></Button>
            //                 </Tooltip>
            //                 <Tooltip title="审核不通过">
            //                     <Button onClick={(ev)=>{this.dispass(ev,item.id)}}><Icon style={{color:"red"}} type="close" /></Button>
            //                 </Tooltip>
            //                 <Tooltip title="删除">
            //                     <Button onClick={(ev)=>{this.showDelete(ev,item.id)}}><Icon style={{color:"red"}}type={"delete"}></Icon></Button>
            //                 </Tooltip>
            //             </div>
            //         )
            //     }
            // }
        ];
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div >
                <Row>
                    <Col span={18} offset={3}>
                        <Card
                            title={<h2 style={{float:'left',marginBottom:-3}}>异常人员</h2>}
                            extra={
                                <div style={{width:200}}  >
                                    <Button onClick={this.showFileModal} > 一键报警 </Button>
                                </div>
                            }>
                            <Modal
                                className="clearfix"
                                visible={this.state.fileModalVisible}
                                onCancel={this.modalHandleCancel}
                                onOk={this.modalHandleCancel}
                                okText={"退出"}
                                cancelText={"返回"}
                            >
                                <Row>
                                    <Col span={16}>
                                        <Input
                                            ref={ele => this.searchInput = ele}
                                            placeholder="输入工号"
                                            value={this.state.worknum}
                                            onChange={this.worknumChange}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Upload
                                            {...props}
                                            name="file"
                                            listType="picture-card"
                                            fileList={this.state.fileList}
                                            action={golbal.localhostUrl+"IMeeting/face/insertByManager?worknum="+this.state.worknum}
                                            onPreview={this.fileHandlePreview}
                                            onChange={this.fileHandleChange}
                                        >
                                            {this.state.fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.fileHandleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                        </Modal>
                                    </Col>
                                </Row>
                            </Modal>
                            <Table rowKey={record=>record.id} className={'table'} columns={columns} dataSource={this.state.dataSource} />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.modalVisible}
                    onOk={this.deleteOne}
                    onCancel={this.handleCancel}
                    okText={"确定"}
                    cancelText={"我再想想"}
                >
                    <h3>您确定要删除此记录吗</h3>
                </Modal>
            </div>
        );
    }
}

export default OthersFaceManage;
