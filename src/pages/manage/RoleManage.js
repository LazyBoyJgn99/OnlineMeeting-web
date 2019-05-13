import React, { Component } from 'react';
import {Table, Card, Col, Row, Button, Tooltip, Icon, message, Input, Drawer, Tree} from "antd";
import golbal from '@/golbal';
import Highlighter from "react-highlight-words";

class RoleManage extends Component {
    componentDidMount(){
        this.selectAll();
    }
    state={
        dataSource:[
            {
                id: 2,
                name: "管理员",
                tenantId: 1,
            }
        ],
        allMenuList:[],
        drawerVisible: false,
        roleName:"",
        menuList:[],
        addOrChange:true,
        roleId:0,
        checkedKeys:[],
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

    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };
    showDrawer=()=>{
        this.setState({
            drawerVisible: true,
        });
    }
    showAddRole=()=>{
        this.setState({
            roleName:"",
            menuList:[],
            drawerVisible: true,
            addOrChange:true,
            checkedKeys:[],
        });
    }
    roleNameChange=(e)=>{
        this.setState({
            roleName: e.target.value,
        });
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({
            checkedKeys:checkedKeys,
        })
    }
    /////////////////////////////////////////////////////////////////////
    //insertOneRole 添加一个role
    insertOneRole = () =>{
        const url=golbal.localhostUrl+"IMeeting/manager/insertOneRole";
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                roleName:this.state.roleName,
                menus:this.state.checkedKeys,
            }),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
            console.log(data);
            if(data.status){
                message.success("操作成功！")
            }
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //updateOneRole update一个role
    updateOneRole = () =>{
        const url=golbal.localhostUrl+"IMeeting/manager/updateOneRole";
        fetch(url, {
            method: "POST",
            mode: "cors",
            credentials:"include",//跨域携带cookie
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                roleId:this.state.roleId,
                roleName:this.state.roleName,
                menus:this.state.checkedKeys,
            }),
        }).then(function (res) {//function (res) {} 和 res => {}效果一致
            return res.json()
        }).then(json => {
            // get result
            const data = json;
            console.log(data);
            if(data.status){
                message.success("操作成功！")
            }
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //selectOneRole 查看某role的权限
    selectOneRole = (ev,text,name) =>{
        console.log(ev)
        console.log(text)
        const url=golbal.localhostUrl+"IMeeting/manager/selectOneRole?roleId="+text;
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
            let checkedKeys=[];
            data.data.map((item)=>{
                return checkedKeys.push(item.menuId)
            })
            this.setState({
                drawerVisible:true,
                menuList:data.data,
                roleName:name,
                roleId:text,
                addOrChange:false,
                checkedKeys:checkedKeys,
            })
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //deleteOneRole 删除某role
    deleteOneRole = (ev,text) =>{
        console.log(ev)
        console.log(text)
        const url=golbal.localhostUrl+"IMeeting/manager/deleteOneRole?roleId="+text;
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
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    //selectAll
    selectAll = () =>{
        const url=golbal.localhostUrl+"IMeeting/manager/selectAll";
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
                allMenuList:data.data[0],
                dataSource:data.data[1],
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
                    title:"名称",
                    dataIndex:"name",
                    key:"name",
                    ...this.getColumnSearchProps("name"),
                },{
                    title:"操作",
                    render:(item)=>{
                        return(
                            <div>
                                <Tooltip title="查看">
                                    <Button onClick={(ev)=>{this.selectOneRole(ev,item.id,item.name)}}><Icon type={"eye"}></Icon></Button>
                                </Tooltip>
                                <Tooltip title="删除">
                                    <Button onClick={(ev)=>{this.deleteOneRole(ev,item.id)}}><Icon style={{color:"red"}}type={"delete"}></Icon></Button>
                                </Tooltip>
                            </div>
                        )
                    }
                }
            ];
        return (
            <div >
                <Row>
                    <Col span={18} offset={3}>
                        <Card
                            title={<h2 style={{float:'left',marginBottom:-3}}>权限管理</h2>}
                            extra={
                                <div style={{width:200}} >
                                    <Row>
                                        <Col span={24}>
                                            <Button type="primary" onClick={this.showAddRole}>添加角色</Button>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        >
                            <Table rowKey={record=>record.id} className={'table'} columns={columns} dataSource={this.state.dataSource} />
                        </Card>
                    </Col>
                </Row>
                <Drawer
                    title={
                        this.state.addOrChange?
                            <Button href="#" type={"primary"} onClick={this.insertOneRole}>添加</Button>
                            :
                            <Button href="#" type={"primary"} onClick={this.updateOneRole}>保存修改</Button>
                    }
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.drawerVisible}
                    width={"60%"}
                >
                    <Card>
                        角色名：
                        <Input value={this.state.roleName} onChange={this.roleNameChange}/>
                        拥有权限：
                        <Tree
                            checkable
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            checkedKeys={this.state.checkedKeys}
                        >

                            {
                                this.state.allMenuList.map((item)=>{
                                    return(
                                        <Tree.TreeNode title={item.menuName} key={item.id}>

                                        </Tree.TreeNode>
                                    )
                                })
                            }
                        </Tree>
                        {/*{*/}
                            {/*this.state.allMenuList.map((item,i)=>{*/}
                                {/*if(this.state.menuList.find((element) => (element.menuId === item.id))){*/}
                                    {/*return(*/}
                                        {/*<Button key={item.id}>*/}
                                            {/*{item.menuName}*/}
                                        {/*</Button>*/}
                                    {/*)*/}
                                {/*}else{*/}
                                    {/*return null;*/}
                                {/*}*/}

                            {/*})*/}
                        {/*}*/}

                    </Card>
                </Drawer>
            </div>
        );
    }
}

export default RoleManage;
