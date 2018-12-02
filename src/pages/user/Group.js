import React, { Component } from 'react';
import {Button, Card, Col, Row, Icon, Drawer, Input, Tree, message} from "antd";

class Group extends Component {
    componentDidMount(){
        this.showUser();
    }
    state = {
        visible: false,
        childrenDrawer: false,
        display_showUser:'none',
        groupList:[],
        userList: []
    };

    /////////////////////////////////////////////////抽屉/////////////////////////////////////////////////
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
            display_display_showUser:'block',
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };
    /////////////////////////////////////////////////请求/////////////////////////////////////////////////
    //查看用户及其部门
    showUser = () =>{
        // const url="http://localhost:8080/IMeeting/group/showUser";
        const url="http://39.106.56.132:8080/IMeeting/group/showUser";
        fetch(url, {
            method: "POST",
            //type:"post",
            //url:"http://39.106.56.132:8080/userinfo/tologin",
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
            console.log(data.data)
            console.log(data.data[0])
            console.log(data.data[1])
            console.log(data.data[0][0])
            console.log(data.data[0][1])
            console.log(data.data[0].length)
            console.log(data.data[1])
            this.setState({
                groupList:data.data[0],
                userList:data.data[1],
            })

        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });


    }

    render() {
        return (
            <div >
                <Row style={{marginTop:10,borderRadius:10}}>
                    <Col span={18} offset={3} >
                        <Card
                            title={<h1 style={{float:'left',marginBottom:-10}}>我的群组</h1>}
                            extra={<Button href="#" type={"primary"} onClick={this.showDrawer}>创建群组</Button>}
                            // style={{ width: 300 }}
                        >

                            <Card>
                                <h2>群组名</h2>
                                <h4>成员名，成员名，成员名，成员名，成员名，</h4>
                                <Button type='default'><Icon type="edit" /></Button>
                                <Button type='danger'><Icon type="delete"></Icon></Button>
                            </Card>
                        </Card>
                    </Col>
                </Row>
                <Drawer
                    title={<div><Button href="#" type={"primary"} onClick={this.showDrawer}>创建群组</Button></div>}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={"60%"}
                >
                    <h2>群组名称</h2>
                    <Input
                        placeholder="input search text"
                        style={{  }}
                    />
                    <p></p>
                    <h2>成员</h2>
                    {/*//////////////////此处存放成员列表//////////////////此处存放成员列表//////////////////此处存放成员列表//////////////////此处存放成员列表*/}

                    <Button
                        onClick={this.showChildrenDrawer}
                        style={{ width:"100%",height:36 }}
                        type="dashed"
                    />

                </Drawer>
                <Drawer
                    title="添加成员"
                    placement="right"
                    closable={false}
                    onClose={this.onChildrenDrawerClose}
                    visible={this.state.childrenDrawer}
                    width={"50%"}
                >
                    <Input.Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{display:this.display_showUser}}
                    />
                    <p></p>
                    <p> 群组成员</p>
                    <Tree
                        checkable
                        defaultExpandAll
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                    >

                        <Tree.TreeNode title="所有部门" key={1}>
                        {
                            this.state.groupList.map((item, i)=>{
                                return(
                                    <Tree.TreeNode
                                        title={item.name}
                                        key={2+"-"+i}
                                    >{
                                        this.state.userList[i].map((item2, j)=>{
                                            return(
                                                <Tree.TreeNode
                                                    title={item2.name}
                                                    key={2+"-"+i+"-"+j}
                                                >
                                                </Tree.TreeNode>
                                            )
                                        })
                                    }
                                    </Tree.TreeNode>
                                )
                            })
                        }
                        </Tree.TreeNode>

                    </Tree>

                </Drawer>
            </div>
        );
    }
}

export default Group;
