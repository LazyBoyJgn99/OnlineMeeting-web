import React, { Component } from 'react';
//import logo from './logo.svg';
//import ReactDOM from 'react-dom';
import {Button, Icon, Input, Layout, Menu, message,Select,Card,Popover,Modal,Steps} from 'antd';
import {BrowserRouter as HashRouter, Route, Link} from 'react-router-dom';
// import Head from '@/pages/Head';
import Welcome from '@/pages/Welcome';
import B_O_Add from '@/pages/booking/BookingOfAdd';
import B_O_HY from '@/pages/booking/BookingOfHY';
import B_O_Time from '@/pages/booking/BookingOfTime';
import '@/css/Layout.css';
import '@/css/LoginCard.css';
import '@/App.css';
import logo from "@/img/logo/logo1024.png";
import FindHY from "./pages/user/FindHY";
import UserInfo from "./pages/user/UserInfo";

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            display_Head:'none',
            display_Forget:'none',
            display_Change:'none',
            display_ChangeSuccess:'none',
            display_Menu:'none',
            display_Login:'block',
            display_GLY:'none',
            display_User:'none',
            display_Visitor:'block',
            display_name: 'block', //此状态机为display的取值
            disabled_getCode:false,
            menu_mode:'inline',//vertical
            width: '200px',
            collapsed:true,
            username: "",
            password: "",
            new_password:"",
            phone:"",
            phone_code:"",
            pwd_code:"!!!",
            codeTime:0,
            visible: false,
            name:"请先登陆",
            loading: false,
        }
    }
    /////////////////////////////////////////////////Input输入的及时改变/////////////////////////////////////////////////
    //username被修改
    usernameChange=(e)=>{
        this.setState({ username : e.target.value })
    }
    //password被修改
    passwordChange=(e)=>{
        this.setState({ password : e.target.value })
    }
    //手机号被修改
    phoneChange=(e)=>{
        this.setState({ phone : e.target.value })
    }
    //验证码被修改
    phoneCodeChange=(e)=>{
        this.setState({ phone_code : e.target.value })
    }
    //newPassword被修改
    newPasswordChange=(e)=>{
        this.setState({ new_password : e.target.value })
    }
    /////////////////////////////////////////////////找回密码/////////////////////////////////////////////////
    //验证验证码
    compareCode=()=>{
        if(this.state.phone_code===this.state.pwd_code){
            message.success("验证成功！");
            this.showChangePwd();
        }else {
            message.error("验证失败！");
        }
    }
    //验证验两次密码输入
    comparePassword=()=>{
        if(this.state.password===this.state.new_password){
            this.changePwd();
        }else {
            message.error("两次密码输入不一致！");
        }
    }
    //获取验证码60s
    codeTime=()=>{
        const timer =setInterval(()=> {
            // console.log(this.state.codeTime);
                if(this.state.codeTime>0){
                    this.setState({
                        codeTime:this.state.codeTime-1
                    });
                }else{
                    this.setState({
                        disabled_getCode:false,
                    });
                    clearInterval(timer);
                }
            }, 1000);
    }
    /////////////////////////////////////////////////找回密码显示方法的小心机/////////////////////////////////////////////////
    //显示找回密码
    showForget=()=>{
        this.setState({
            display_ChangeSuccess:'none',
            display_Change:'none',
            display_Head:'none',
            display_Forget:'block',
            display_Login:'none',
        });
    }
    //更改密码页面
    showChangePwd=()=>{
        this.setState({
            display_ChangeSuccess:'none',
            display_Change:'block',
            display_Head:'none',
            display_Forget:'none',
            display_Login:'none',
        });
    }
    //修改成功页面
    showChangeSuccess=()=>{
        this.setState({
            display_ChangeSuccess:'block',
            display_Change:'none',
            display_Head:'none',
            display_Forget:'none',
            display_Login:'none',
        });
    }
    //返回登陆页面
    showLogin=()=>{
        this.setState({
            display_ChangeSuccess:'none',
            display_Change:'none',
            display_Head:'none',
            display_Forget:'none',
            display_Login:'block',
        });
    }
    /////////////////////////////////////////////////登陆/////////////////////////////////////////////////
    //登陆与加载
    enterLoading = () => {
        this.setState({ loading: true });
        this.sendAjax();
        this.overLoading();
    }
    //点击登陆后旋转2秒
    overLoading = () => {
        setInterval(() => {this.setState({ loading: false })}, 2000);
    }
    /////////////////////////////////////////////////头部栏/////////////////////////////////////////////////
    //修改用户名显示
    nameChange=(e)=>{
        this.setState({ name : e })
    }
    //退出登陆
    loginOut=()=>{
        this.setState({
            display_Head:'none',
            display_Forget:'none',
            display_Menu:'none',
            display_Login:'block',
            name:"请先登陆",
        });
    }
    /////////////////////////////////////////////////三个fetch请求/////////////////////////////////////////////////
    //发送验证码请求
    getPhoneCode = () =>{

        const phone=this.state.phone;//this.state.username;
        const url="http://39.106.56.132:8080/IMeeting/pwdCode?phone="+phone;
        if(phone===""){
            message.warning("手机号不能为空！");
        }else{
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
                 // console.log(data);
                if(data.status===true){
                    message.success("请求发送成功！");
                    this.setState({
                        pwd_code:data.data,
                        disabled_getCode:true,
                        codeTime:60,
                    },this.codeTime);

                }else if(!data.status){
                    message.error("手机号码不正确！");
                }

            }).catch(function (e) {
                console.log("fetch fail");
                alert('系统错误');
            });

        }
    }
    //修改密码
    changePwd = () =>{
        const phone=this.state.phone;//this.state.username;
        const password=this.state.password;
        const url="http://39.106.56.132:8080/IMeeting/forgetPwd?phone="+phone+"&password="+password;
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
            if(data.status===true){
                message.success("密码修改成功！");
                this.showChangeSuccess();
            }else{
                message.error("非法的密码修改！");
            }

        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });


    }
    //发送登陆请求
    sendAjax = () =>{
        //POST方式,IP为本机IP
        const username=this.state.username;//this.state.username;
        const password=this.state.password;//this.state.password;
        const url="http://39.106.56.132:8080/IMeeting/login?username="+username+"&password="+password;
        if(username===""||password===""){
            message.warning("用户名或密码不能为空！");
        }else{
            fetch(url, {

                method: "POST",
                //type:"post",
                //url:"http://39.106.56.132:8080/userinfo/tologin",
                mode: "cors",
                credentials:"include",//跨域携带cookie
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({username:username,password:password}),
            }).then(function (res) {//function (res) {} 和 res => {}效果一致
                return res.json()
            }).then(json => {
                // get result
                const data = json;
                console.log(data);
                if(data.status===true){
                    this.nameChange(data.data.name);
                    message.success("登陆成功！");
                    this.setState({
                        display_Head:'block',
                        display_Menu:'block',
                        display_Login:'none',
                    });
                }else if(data.status===false){
                    message.error("用户名或密码错误！");
                }else {
                    message.error("未知错误");
                }

            }).catch(function (e) {
                console.log("fetch fail");
                alert('系统错误');
            });

        }

    }
    /////////////////////////////////////////////////侧边栏/////////////////////////////////////////////////
    //改变模式
    changeMode=(msg)=> {
        if(msg==="管理员模式"){
            this.setState({
                display_GLY:'block',
                display_User:'none',
                display_Visitor:'none',
            });
        }else if(msg==="游客模式"){
            this.setState({
                display_GLY:'none',
                display_User:'none',
                display_Visitor:'block',
            });
        }else if(msg==="用户模式"){
            this.setState({
                display_GLY:'none',
                display_User:'block',
                display_Visitor:'none',
            });
        }else {
            console.log("错误！未监测到身份");
            this.setState({
                display_GLY:'none',
                display_User:'none',
                display_Visitor:'block',
            });
        }
    }
    //菜单显示与隐藏
    toggle=()=>{
        this.setState({
            collapsed:!this.state.collapsed
        })
    }
    /////////////////////////////////////////////////主函数/////////////////////////////////////////////////
    render() {
        return (
            <div className="App">
                <HashRouter>
                <Layout>
                    <Layout.Header className={'Head'} style={{display:this.state.display_Head}} >
                        <Head changeMode = {(msg) => this.changeMode(msg)} loginOut = {() => this.loginOut()} name={this.state.name} ></Head>
                    </Layout.Header>
                    <Layout>
                        {/*****************************************左边菜单栏*****************************************/}
                        <Layout.Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{color: '#fff',backgroundColor:'#fff',display:this.state.display_Menu}}>
                            <Menu className='leftSider' mode={this.state.menu_mode} theme='light' style={{color: '#000',backgroundColor:'#ffffff'}}>
                                {/*<Menu.Item style={{display:this.state.display_name}}>*/}
                                {/*<span ><Icon type='home'/>Home</span>*/}
                                {/*<Button className='Siderbtn' onClick={this.display_name.bind(this)} ></Button>*/}
                                {/*<Button className='Siderbtn' onClick={this.menu_mode.bind(this)} style={{display:this.state.display_name}}></Button>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item onClick={this.toggle}>
                                    <Icon type='home' />
                                    <span >菜单</span>
                                </Menu.Item>
                                {/*管理员功能模块*/}
                                <Menu.SubMenu  title={<span><Icon type='tool'/><span>用户管理</span></span>} style={{display:this.state.display_GLY}}>
                                    <Menu.Item><Link to='/book/time'>部门类型管理</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>角色类型管理</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>用户信息</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='team'/><span>会议室管理</span></span>} style={{display:this.state.display_GLY}}>
                                    <Menu.Item><Link to='/book/time'>设备信息管理</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>会议室信息</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>会议室状态</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='smile'/><span>面部信息管理</span></span>} style={{display:this.state.display_GLY}}>
                                    <Menu.Item><Link to='/book/time'>会议参数管理</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>会议信息</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>会议审核</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>进入记录</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type="appstore"/><span>其它</span></span>} style={{display:this.state.display_GLY}}>
                                    <Menu.Item><Link to='/book/HY'>日志管理</Link></Menu.Item>
                                </Menu.SubMenu>
                                {/*开会者预订端功能模块*/}
                                <Menu.SubMenu  title={<span><Icon type="tool" /><span>会议管理</span></span>} style={{display:this.state.display_User}}>
                                    <Menu.Item><Link to='/book/time'>预订会议</Link></Menu.Item>
                                    <Menu.Item><Link to='/user/findHY'>查询会议</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>我的预订</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>请假审批(可以融入我的预订)</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='team'/><span>我的会议</span></span>} style={{display:this.state.display_User}}>
                                    <Menu.Item><Link to='/book/time'>查询会议安排</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>会议请假</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type="video-camera" /><span>会议监控</span></span>} style={{display:this.state.display_User}}>
                                    <Menu.Item><Link to='/book/time'>查看到会人员名单</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>查看异常人员</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>查看到会人员信息</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='user'/><span>我的信息</span></span>} style={{display:this.state.display_User}}>
                                    <Menu.Item><Link to='/user/info'>个人资料</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>面部信息录入</Link></Menu.Item>
                                </Menu.SubMenu>
                                {/*用户预订功能模块*/}
                                <Menu.SubMenu  title={<span><Icon type='tool'/><span>会议管理</span></span>} style={{display:this.state.display_Visitor}}>
                                    <Menu.Item><Link to='/book/time'>预订会议</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/time'>查询会议</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>我的预订</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/address'>请假审批(可以融入我的预订)</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='team'/><span>我的会议</span></span>} style={{display:this.state.display_Visitor}}>
                                    <Menu.Item><Link to='/book/time'>查询会议安排</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>会议请假</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='video-camera'/><span>会议监控</span></span>} style={{display:this.state.display_Visitor}}>
                                    <Menu.Item><Link to='/book/address'>查看到会人员信息</Link></Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu  title={<span><Icon type='user'/><span>我的信息</span></span>} style={{display:this.state.display_Visitor}}>
                                    <Menu.Item><Link to='/user/info'>个人资料</Link></Menu.Item>
                                    <Menu.Item><Link to='/book/HY'>面部信息录入</Link></Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        </Layout.Sider>

                        {/*****************************************核心页面*****************************************/}
                        <Layout.Content className='contentLayout'>
                            {/*************************************登陆与找回密码**************************************/}
                            {/*登陆*/}
                            <Card title="登陆" className={"loginCard"} style={{ width: 600,display:this.state.display_Login }}>
                                <Input prefix={<Icon type='user'/>} type='' placeholder='用户名' onKeyUp={this.usernameChange}></Input>
                                <br/>
                                <br/>
                                <Input prefix={<Icon type='lock'/>} type='password' placeholder='密码' onKeyUp={this.passwordChange}></Input>
                                <Button className={'headBtn1'} type='default' onClick={this.showForget}>忘记密码</Button>
                                <Button className={'headBtn2'} type='primary' loading={this.state.loading} onClick={this.enterLoading} >登陆</Button>
                                <Button className={'headBtn3'} type='default' onClick={this.sendAjax}>还没有账号？点击注册</Button>
                            </Card>
                            {/*找回密码*/}
                            <Card title="找回密码" className={"forgetCard"} style={{ width: 600,display:this.state.display_Forget }}>
                                <Steps style={{ width: '440px'}} current={0}>
                                    <Steps.Step style={{ margin:0}} title="第一步" description="获取验证码" />
                                    <Steps.Step style={{ margin:0}} title="第二步" description="修改密码" />
                                    <Steps.Step style={{ marginLeft:30}} title="第三步" description="修改成功" />
                                </Steps>
                                <br/>
                                <Input type='' placeholder='手机号' onKeyUp={this.phoneChange}></Input>
                                <br/>
                                <Input type='' className='phoneCodeInput' placeholder='输入验证码' onKeyUp={this.phoneCodeChange}></Input>
                                <Button className='forgetBtn2' type='default' disabled={this.state.disabled_getCode} onClick={this.getPhoneCode}>{this.state.codeTime>0?"请"+this.state.codeTime+"秒后再试":"获取验证码"}</Button>
                                <Button className='forgetBtn1' type='default' onClick={this.showLogin}>返回登陆</Button>
                                <Button className='forgetBtn1' type='primary' onClick={this.compareCode}>下一步</Button>
                            </Card>
                            {/*修改密码*/}
                            <Card title="找回密码" className={"forgetCard"} style={{ width: 600,display:this.state.display_Change }}>
                                <Steps style={{ width: '440px'}} current={1}>
                                    <Steps.Step style={{ margin:0}} title="第一步" description="获取验证码" />
                                    <Steps.Step style={{ margin:0}} title="第二步" description="修改密码" />
                                    <Steps.Step style={{ marginLeft:30}} title="第三步" description="修改成功" />
                                </Steps>
                                <br/>
                                <Input type='' placeholder='输入新密码' onKeyUp={this.passwordChange}></Input>
                                <br/><br/>
                                <Input type='' placeholder='再次输入密码' onKeyUp={this.newPasswordChange}></Input>
                                <Button className='forgetBtn1' type='default' onClick={this.showLogin}>返回登陆</Button>
                                <Button className='forgetBtn1' type='primary' onClick={this.comparePassword}>修改密码</Button>
                            </Card>
                            {/*修改成功*/}
                            <Card title="找回密码" className={"forgetCard"} style={{ width: 600,display:this.state.display_ChangeSuccess }}>
                                <Steps style={{ width: '440px'}} current={2}>
                                    <Steps.Step style={{ margin:0}} title="第一步" description="获取验证码" />
                                    <Steps.Step style={{ margin:0}} title="第二步" description="修改密码" />
                                    <Steps.Step style={{ marginLeft:30}} title="第三步" description="修改成功,返回登陆" />
                                </Steps>
                                <Button className='forgetBtn1' type='primary' onClick={this.showLogin}>返回登陆</Button>
                            </Card>
                            {/*************************************页面路由**************************************/}
                            {/*登陆后内部页面链接*/}
                            <Route path={"/book/address"} component={B_O_Add} />
                            <Route path={"/book/time"} component={B_O_Time} />
                            <Route path={"/book/HY"} component={B_O_HY} />
                            <Route path={"/user/findHY"} component={FindHY} />
                            <Route path={"/user/info"} component={UserInfo} />
                            <Route path={"/welcome"} component={Welcome} />

                        </Layout.Content>

                    </Layout>
                        <Layout.Footer>
                            版权所有 @虹软-有钱没头发-2018
                        </Layout.Footer>
                </Layout>
                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}

                        {/*<Button.Group>*/}
                            {/*<Button >后退</Button>*/}
                            {/*<Button >前进</Button>*/}
                        {/*</Button.Group>*/}

                {/*</header>*/}
                </HashRouter>
            </div>
        );
    }
}

export default App;

///////////////////////////////////////////////////头部菜单栏页面/////////////////////////////////////////////////
class Head extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            visible: false,
            name:"登陆",
            loading: false,

        }
    }
    //模块选择
    handleChange = (msg) =>{
        this.props.changeMode(msg);
        console.log(`selected ${msg}`);
    }
    //登陆身份
    loginRole = (msg) => {
        this.props.changeMode(msg);

    }
    //弹出登陆框
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }
    //关闭登陆框
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    //修改用户名显示
    nameChange=(e)=>{
        this.setState({ name : e })
    }



    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.props.loginOut();
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    //发送登陆请求
    sendAjax = () =>{
        //POST方式,IP为本机IP
        const username=this.state.username;//this.state.username;
        const password=this.state.password;//this.state.password;
        if(username===""||password===""){
            message.warning("用户名或密码不能为空！");
        }else{
            fetch("http://39.106.56.132:8080/userinfo/tologin", {

                method: "POST",
                //type:"post",
                //url:"http://39.106.56.132:8080/userinfo/tologin",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({username:username,password:password}),
            }).then(function (res) {//function (res) {} 和 res => {}效果一致
                return res.json()
            }).then(json => {
                // get result
                const data = json;
                console.log(data);
                if(data.message==="登陆成功"){
                    this.nameChange(data.data.name);
                    message.success(data.message);
                    this.onClose();
                }else if(data.message==="账号密码有误"){
                    message.error("用户名或密码错误！");
                }else {
                    message.error("未知错误");
                }

            }).catch(function (e) {
                console.log("fetch fail");
                alert('系统错误');
            });

        }

    }

    //主函数
    render() {
        const loginOut=(<div onClick={this.showDrawer}>{"退出登陆"}</div>);
        return (
            <div className={'head'} style={this.props.style}>
                {/*right*/}
                {/*<div>{this.props.name}</div>*/}
                <img src={logo} className="App-logo logo" alt="logo" />
                <span className={'companyName'}><h2><Link to='/welcome'>我的主页</Link></h2></span>
                {/*left*/}
                {/*<Input className={'searchText'} suffix={(*/}
                {/*<Button className="search-btn"  type="primary">*/}
                {/*<Icon type="search" />*/}
                {/*</Button>*/}
                {/*)}*/}
                {/*/>*/}
                <Select className={'headBtn1'} defaultValue="游客模式" style={{ width: 120 }} onChange={this.handleChange}>
                    <Select.Option value="游客模式">游客模式</Select.Option>
                    <Select.Option value="管理员模式">管理员模式</Select.Option>
                    <Select.Option value="用户模式">用户模式</Select.Option>
                </Select>
                {/*退出登录*/}
                <Popover title="" content={loginOut} >
                    <Button className={'headBtn1'} type="primary" >{this.props.name}</Button>
                </Popover>,

                <Button className={'headBtn1'} type='primary' onClick={this.loginRole}><Icon type="ellipsis" /></Button>
                <Input className={'searchText'} suffix={<Icon type="search"  />} />
                {/*抽屉式登陆页面*/}
                {/*<Drawer title="用户登录" placement="right" onClose={this.onClose} visible={this.state.visible}>*/}
                    {/*<p>用户</p>*/}
                    {/*<Input type='' placeholder='用户名' onKeyUp={this.usernameChange}></Input>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<p>密码</p>*/}
                    {/*<Input type='password' placeholder='密码' onKeyUp={this.passwordChange}></Input>*/}
                    {/*<Button className={'headBtn1'} type='default' onClick={this.onClose}>忘记密码</Button>*/}
                    {/*<Button className={'headBtn2'} type='primary' loading={this.state.loading} onClick={this.enterLoading} >登陆</Button>*/}
                    {/*<Button className={'headBtn3'} type='default' onClick={this.sendAjax}>还没有账号？点击注册</Button>*/}
                {/*</Drawer>*/}
                {/*退出登陆*/}
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={"确定"}
                    cancelText={"取消"}
                >
                    <h2>您确定要退出吗？</h2>
                </Modal>

            </div>
        );
    }
}
