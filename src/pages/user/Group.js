import React, { Component } from 'react';
import {Button, Card, Col, Row, Icon, Drawer, Input, Tree} from "antd";


class Group extends Component {
    componentDidMount(){
        this.showUser();
    }
    state = {
        visible: false,
        childrenDrawer: false,
        display_showUser:'none',
        groupList:[],
        userList: [],
        groupUsers:[],
        treeData: [],
        expandedKeys: ["1"],
        searchValue: '',
        groupName:'',
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
        const url="http://localhost:8080/IMeeting/group/showUser";
        // const url="http://39.106.56.132:8080/IMeeting/group/showUser";
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
    //查看用户及其部门
    saveGroup = () =>{
        let name=this.state.groupName;
        let idList=[];
        this.state.groupUsers.map((item)=>{
            idList.push(item[1].id);
            return null;
        })
        idList="["+idList+"]";
        const url="http://localhost:8080/IMeeting/group/saveGroup?name="+name+"?group="+idList;

        // const url="http://39.106.56.132:8080/IMeesting/group/showUser";
        fetch(url, {
            method: "POST",
            //type:"post",
            //url:"http://39.106.56.132:8080/userinfo/tologin",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({data:{name:name,group:idList}}),
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


    /////////////////////////////////////////////////获取树内的信息/////////////////////////////////////////////////
    //输出选中
    loadTree = (e) =>{
        console.log(e);
        console.log(this.state.treeData);

    }
    //选中
    onCheck =(checked,info)=>{
        let checkedKey=[...checked,...info.halfCheckedKeys];
        this.setState({
            treeData:checkedKey
        },function () {
            const groupUsers=[];
            this.state.treeData.map((item)=>{
                let n=item.substr(2,1);
                let m=item.substr(4,1);
                console.log(n+" "+m);
                if(n!==""&&m!==""){
                    groupUsers.push([this.state.groupList[n],this.state.userList[n][m]])
                }
                return null;
            });
            console.log(groupUsers);
            this.setState({
                groupUsers:groupUsers
            })
        })

    }
    //查找
    onSearch=(e)=>{
        console.log(e)
        const value = e;
        const expandedKeys=["1"];
        this.state.groupList.map((item, i)=>{
            if (item.name.indexOf(value) > -1) {
                expandedKeys.push(1+"-"+i);
            }
            this.state.userList[i].map((item2)=>{
                if (item2.name.indexOf(value) > -1) {
                    expandedKeys.push(1+"-"+i);
                    // expandedKeys.push(1+"-"+i+"-"+j);
                }
                return null;
            })
            return null;
        });
        console.log(expandedKeys)
        this.setState({
            expandedKeys:expandedKeys,
            searchValue: value,
        });
    }
    //展开树
    onExpand = (expandedKeys) => {
        console.log(expandedKeys);
        this.setState({
            expandedKeys:expandedKeys,
        });
    }
    /////////////////////////////////////////////////创建群组/////////////////////////////////////////////////
    changeGroupName =(e)=>{
        this.setState({
            groupName:e.target.value,
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
                    title={<div><Button href="#" type={"primary"} onClick={this.saveGroup}>创建群组</Button></div>}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={"60%"}
                >
                    <h2>群组名称</h2>
                    <Input
                        placeholder="input search text"
                        value={this.state.groupName}
                        onChange={this.changeGroupName}
                        style={{  }}
                    />
                    <p></p>
                    <h2>成员<div style={{color:"#666666"}}>{this.state.groupUsers.length+" "} <Icon type="user"/></div></h2>
                    <Button
                        onClick={this.showChildrenDrawer}
                        style={{ width:"100%",height:36,color:'#ff5500'}}
                        type="dashed"
                    >修改成员</Button>
                    {/*//////////////////此处存放成员列表//////////////////此处存放成员列表//////////////////此处存放成员列表//////////////////此处存放成员列表*/}
                    {
                        this.state.groupUsers.map((item,i)=>{
                            return(
                                <Button
                                    style={{ width:"100%",height:36}}
                                    type="default"
                                    key={i}
                                ><h4>{item[0].name+"---"+item[1].name}</h4></Button>
                            )
                        })
                    }


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
                        onSearch={this.onSearch}
                        style={{display:this.display_showUser}}

                    />
                    <p></p>
                    <p> 群组成员</p>
                    <Tree
                        checkable
                        defaultExpandAll
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        // loadData={this.loadTree}
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                    >

                        <Tree.TreeNode title="所有部门" key={1}>
                        {
                            this.state.groupList.map((item, i)=>{
                                const index = item.name.indexOf(this.state.searchValue);
                                const beforeStr = item.name.substr(0, index);
                                const afterStr = item.name.substr(index + this.state.searchValue.length);
                                const title = index > -1 ? (
                                    <span>
                                        {beforeStr}
                                        <span style={{ color: '#ff5500' }}>{this.state.searchValue}</span>
                                        {afterStr}
                                     </span>
                                ) : <span>{item.name}</span>;
                                return(
                                    <Tree.TreeNode
                                        title={title}
                                        key={1+"-"+i}
                                    >{
                                        this.state.userList[i].map((item2, j)=>{
                                            const index = item2.name.indexOf(this.state.searchValue);
                                            const beforeStr = item2.name.substr(0, index);
                                            const afterStr = item2.name.substr(index + this.state.searchValue.length);
                                            const title = index > -1 ? (
                                                <span>
                                                    {beforeStr}
                                                    <span style={{ color: '#ff5500' }}>{this.state.searchValue}</span>
                                                    {afterStr}
                                                </span>
                                            ) : <span>{item2.name}</span>;
                                            return(
                                                <Tree.TreeNode
                                                    title={title}
                                                    key={1+"-"+i+"-"+j}
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

                    <Button onClick={this.loadTree}></Button>
                </Drawer>
            </div>
        );
    }
}

export default Group;
