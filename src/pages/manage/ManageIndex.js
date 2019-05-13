import React, { Component } from 'react';
import {Col, Divider, Icon, DatePicker, Row, Tooltip as TooltipAnt, Button, Radio, Table, Card} from "antd";
import {Axis, Chart, Coord, Geom, Label, Legend, Tooltip} from "bizcharts";
import DataSet from "@antv/data-set";
import moment from "moment";
import "@/css/graph/graph.less"
import golbal from "../../golbal";


class ManageIndex extends Component {
    componentDidMount() { //初始化
        const e = document.createEvent("Event");
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        this.selectDataCount(1,1);
    }
    dateChange=(date, dateString)=>{//时间回调函数
        console.log(date, dateString);
        this.setState({
            beginDate:dateString[0],
            overDate:dateString[1],
        })
    }
    handleWayChange=(e)=>{
        console.log(e)
        this.setState({
            way:e.target.value,
        },this.changeTable(e.target.value,this.state.type));
    }
    handleTypeChange=(e)=>{
        console.log(e)
        this.setState({
            type:e.target.value
        },this.changeTable(this.state.way,e.target.value));
    }
    changeTable=(way,type)=>{
        switch (way+","+type) {
            case "1,1":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"会议室",
                            dataIndex:"meetRoomName",
                            key:"meetRoomName",
                        },{
                            title:"会议时间",
                            dataIndex:"hour",
                            key:"hour",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(1,1));
            case "1,2":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"会议室",
                            dataIndex:"meetRoomName",
                            key:"meetRoomName",
                        },{
                            title:"会议次数",
                            dataIndex:"time",
                            key:"time",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(1,2));
            case "2,1":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"部门",
                            dataIndex:"departName",
                            key:"departName",
                        },{
                            title:"会议时间",
                            dataIndex:"hour",
                            key:"hour",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(2,1));
            case "2,2":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"部门",
                            dataIndex:"departName",
                            key:"departName",
                        },{
                            title:"会议次数",
                            dataIndex:"time",
                            key:"time",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(2,2));
            case "3,1":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"预定人",
                            dataIndex:"userName",
                            key:"userName",
                        },{
                            title:"会议时间",
                            dataIndex:"hour",
                            key:"hour",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(3,1));
            case "3,2":
                return this.setState({
                    columns:[
                        {
                            title:"序号",
                            key:"id",
                            render:(item,data,i)=>{
                                return(<div>{i+1}</div>)
                            }
                        },{
                            title:"预定人",
                            dataIndex:"userName",
                            key:"userName",
                        },{
                            title:"预定次数",
                            dataIndex:"time",
                            key:"time",
                        }
                    ],
                    dataSource:[]
                },this.selectDataCount(3,2));
            default:
                return null;
        }
    }
    onSearch=()=>{
        this.selectDataCount(this.state.way,this.state.type);
    }
    state = {
        autoHideXLabels: false,
        data1 : [
            {
                year: "2月1日",
                sales: 38
            },
            {
                year: "2月2日",
                sales: 52
            },
            {
                year: "2月3日",
                sales: 61
            },
            {
                year: "2月4日",
                sales: 145
            },
            {
                year: "2月5日",
                sales: 48
            },
            {
                year: "2月6日",
                sales: 38
            },
            {
                year: "2月7日",
                sales: 38
            },
            {
                year: "2月8日",
                sales: 40
            },
            {
                year: "2月9日",
                sales: 49
            },
            {
                year: "2月10日",
                sales: 38
            },
            {
                year: "2月11日",
                sales: 33
            },
            {
                year: "2月12日",
                sales: 32
            },
            {
                year: "2月13日",
                sales: 3
            },
            {
                year: "2月14日",
                sales: 2
            }
        ],
        lineData:[
            {
                country: "空闲会议室",
                population: 78
            }
        ],
        pieData:[
            {
                item: "会议室一",
                count: 40
            },
            {
                item: "会议室二",
                count: 21
            },
            {
                item: "会议室三",
                count: 17
            },
            {
                item: "会议室四",
                count: 13
            },
            {
                item: "会议室五",
                count: 9
            }
        ],
        areaData:[
            {
                year: "1991",
                value: 15468
            },
            {
                year: "1992",
                value: 16100
            },
            {
                year: "1993",
                value: 15900
            },
            {
                year: "1994",
                value: 17409
            },
            {
                year: "1995",
                value: 17000
            },
            {
                year: "1996",
                value: 31056
            },
            {
                year: "1997",
                value: 31982
            },
            {
                year: "1998",
                value: 32040
            },
            {
                year: "1999",
                value: 33233
            }
        ],
        polarData:[
            {
                item: "投影仪",
                a: 50,
            },
            {
                item: "白板",
                a: 40,
            },
            {
                item: "银幕",
                a: 60,
            },
            {
                item: "智能门锁",
                a: 70,
            },
            {
                item: "舞台",
                a: 8,
            },
            {
                item: "灯光",
                a: 30,
            },
            // {
            //     item: "Sales",
            //     a: 60,
            // },
            // {
            //     item: "UX",
            //     a: 50,
            // }
        ],
        beginDate:"2015-01-01",
        overDate:"2020-01-01",
        way:"1",
        type:"1",
        columns:[
            {
                title:"序号",
                key:"id",
                render:(item,data,i)=>{
                    return(<div>{i+1}</div>)
                }
            },{
                title:"主题",
                dataIndex:"meetRoomName",
                key:"meetRoomName",
            },{
                title:"会议时间",
                dataIndex:"hour",
                key:"hour",
            }
        ],
        dataSource:[],
        message:"",
    };
    ///////////////////////////////////////////////////////////////////////
    //selectDataCount selectDataCount读取表格
    selectDataCount = (way,type) =>{
        const url=golbal.localhostUrl+"IMeeting/meeting/selectDataCount"+
            "?begin=" +
            this.state.beginDate+
            "&over=" +
            this.state.overDate+
            "&way=" +
            way+
            "&type="+
            type
        ;
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
                message:data.message,
                dataSource:data.data,
            })
        }).catch(function (e) {
            console.log("fetch fail");
            alert('系统错误');
        });
    }
    render() {
        const { DataView } = DataSet;

        const ds = new DataSet();
        //条形图dv
        const lineDv = ds.createView().source(this.state.lineData);
        lineDv.source(this.state.lineData).transform({
            type: "sort",
            callback(a, b) {
                // 排序依据，和原生js的排序callback一致
                return a.population - b.population > 0;
            }
        });
        //饼图dv
        const dv = new DataView();
        dv.source(this.state.pieData).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        //雷达图
        const polarDv = new DataView().source(this.state.polarData);
        polarDv.transform({
            type: "fold",
            fields: ["a"],
            // 展开字段集
            key: "user",
            // key字段
            value: "score" // value字段
        });
        const mode1={//自适应大小1号
            xs:{span:24,offset:0},
            sm:{span:20,offset:2},
            md:{span:12,offset:0},
            lg:{span:8,offset:0},
            xl:{span:6,offset:0},
        }
        const mode2={//自适应大小2号
            xs:{span:24,offset:0},
            sm:{span:24,offset:0},
            md:{span:24,offset:0},
            lg:{span:16,offset:0},
            xl:{span:18,offset:0},
        }
        const mode3={//自适应大小3号
            xs:{span:24,offset:0},
            sm:{span:24,offset:0},
            md:{span:24,offset:0},
            lg:{span:24,offset:0},
            xl:{span:24,offset:0},
        }
        const cols2 = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div style={{padding:10}}>
                {/*时间与搜索框*/}
                <Row gutter={16}>
                    <Col {...mode3}>
                        <div className={'card'} style={{height:88,padding:25}}>
                            <Row>
                                <Col span={6}>
                                    <DatePicker.RangePicker
                                        defaultValue={[moment('2015/01/01', "YYYY-MM-DD"), moment('2020/01/01', "YYYY-MM-DD")]}
                                        onChange={this.dateChange}
                                    />
                                </Col>
                                <Col span={2} >
                                    <Button  type="primary" onClick={this.onSearch}><Icon type='search'/>搜索</Button>
                                </Col>


                            </Row>

                        </div>
                    </Col>
                    {/*搜索结果与筛选框*/}
                    <Col {...mode2}>
                        <div className={'card'} style={{}}>
                            <div style={{paddingTop:20}}>
                                <Row>
                                    <Col offset={12} span={6}>
                                        <Radio.Group value='large' onChange={this.handleWayChange}>
                                            <Radio.Button value="1">会议室</Radio.Button>
                                            <Radio.Button value="2">部门</Radio.Button>
                                            <Radio.Button value="3">预定人</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={6}>
                                        <Radio.Group value='large' onChange={this.handleTypeChange}>
                                            <Radio.Button value="1">时间</Radio.Button>
                                            <Radio.Button value="2">次数</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </div>
                            <Divider />
                            <div>
                                <Table rowKey={record=>record.id} className={'table'} columns={this.state.columns} dataSource={this.state.dataSource} />
                            </div>
                        </div>
                    </Col>
                    <Col {...mode1}>
                        <CardJGN
                            title={"来自人工智能的建议"}
                            center={"建议"}
                            text={"建议"}
                            chart={
                                <div style={{height:50}}>
                                    <Row>
                                        <Col span={20} offset={2} >
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            {
                                                this.state.message
                                            }
                                        </Col>
                                    </Row>

                                </div>
                            }
                        />
                    </Col>
                    {/*图表们*/}
                    <Col {...mode1} >
                        <CardJGN
                            title={"会议室热度"}
                            center={"会议室"}
                            text={"饼图"}
                            chart={
                                <Chart
                                    height={200}
                                    data={dv}
                                    scale={cols2}
                                    padding={'auto'}
                                    forceFit
                                >
                                    <Coord type="theta" radius={1} />
                                    <Axis name="percent" />
                                    {/*<Legend*/}
                                    {/*position="right"*/}
                                    {/*offsetY={-window.innerHeight / 2 + 120}*/}
                                    {/*offsetX={-100}*/}
                                    {/*/>*/}
                                    <Tooltip
                                        showTitle={false}
                                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                                    />
                                    <Geom
                                        type="intervalStack"
                                        position="percent"//有效数据
                                        color="item"//颜色分类
                                        tooltip={[
                                            "item*percent",
                                            (item, percent) => {
                                                percent = percent * 100 + "%";
                                                return {
                                                    name: item,
                                                    value: percent
                                                };
                                            }
                                        ]}
                                        style={{
                                            lineWidth: 1,//间隔
                                            stroke: "#fff",//间隔颜色
                                        }}
                                    >
                                        {/*<Label*/}
                                        {/*content="percent"*/}
                                        {/*offset={-40}*/}
                                        {/*textStyle={{*/}
                                        {/*rotate: 0,*/}
                                        {/*textAlign: "center",*/}
                                        {/*shadowBlur: 2,*/}
                                        {/*shadowColor: "rgba(0, 0, 0, .45)"*/}
                                        {/*}}*/}
                                        {/*/>*/}
                                        <Label
                                            content="item"
                                            offset={-40}
                                            textStyle={{
                                                rotate: 0,
                                                textAlign: "center",
                                                shadowBlur: 2,
                                                shadowColor: "rgba(0, 0, 0, .45)"
                                            }}
                                        />
                                    </Geom>
                                </Chart>
                            }
                        />
                    </Col>
                    {/*<Col {...mode1}>*/}
                        {/*<CardJGN*/}
                            {/*title={"会议室利用率"}*/}
                            {/*center={"14%"}*/}
                            {/*text={"效率"}*/}
                            {/*chart={*/}
                                {/*<Chart*/}
                                    {/*height={50}*/}
                                    {/*data={this.state.areaData}*/}
                                    {/*// scale={cols}*/}
                                    {/*forceFit*/}
                                    {/*padding={'auto'}*/}
                                {/*>*/}
                                    {/*/!*<Axis name="year" />*!/*/}
                                    {/*/!*<Axis*!/*/}
                                    {/*/!*name="value"*!/*/}
                                    {/*/!*label={{*!/*/}
                                    {/*/!*formatter: val => {*!/*/}
                                    {/*/!*return (val / 10000).toFixed(1) + "k";*!/*/}
                                    {/*/!*}*!/*/}
                                    {/*/!*}}*!/*/}
                                    {/*/>*/}
                                    {/*<Tooltip*/}
                                        {/*crosshairs={{*/}
                                            {/*type: "line"*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                    {/*<Geom type="area" position="year*value" color={"#8f65dd"}/>*/}
                                    {/*<Geom type="line" position="year*value" size={2} color={"#8f65dd"}/>*/}
                                {/*</Chart>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*title={"近两周的参会总人数"}*/}
                            {/*text={"数量"}*/}
                            {/*center={"528 人"}*/}
                            {/*chart={*/}
                                {/*<Chart*/}
                                    {/*height={50}*/}
                                    {/*data={this.state.data1}*/}
                                    {/*scale={{*/}
                                        {/*sales: {*/}
                                            {/*formatter: val => {*/}
                                                {/*val = val * 100 + "%";*/}
                                                {/*return val;*/}
                                            {/*}*/}
                                        {/*}*/}
                                    {/*}}*/}
                                    {/*forceFit*/}
                                    {/*padding={'auto'}*/}
                                {/*>*/}
                                    {/*/!*Axis x,y轴*!/*/}
                                    {/*/!*<Axis name="year" />*!/*/}
                                    {/*/!*<Axis name="sales" />*!/*/}
                                    {/*/!*Tooltip 数据详细*!/*/}
                                    {/*<Tooltip*/}
                                        {/*itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"*/}
                                    {/*/>*/}
                                    {/*/!**!/*/}
                                    {/*<Geom*/}
                                        {/*// type="interval"*/}
                                        {/*position="year*sales"//有效数据*/}
                                        {/*tooltip={[*/}
                                            {/*"year*sales",*/}
                                            {/*(item, percent) => {*/}
                                                {/*// percent = percent * 100 + "%";*/}
                                                {/*return {*/}
                                                    {/*name: "参会人数",*/}
                                                    {/*value: percent*/}
                                                {/*};*/}
                                            {/*}*/}
                                        {/*]}*/}
                                    {/*/>*/}
                                {/*</Chart>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*title={"当前时段空闲会议室"}*/}
                            {/*center={"78%"}*/}
                            {/*text={"实时"}*/}
                            {/*chart={*/}
                                {/*<Chart*/}
                                    {/*height={50}*/}
                                    {/*data={lineDv}*/}
                                    {/*forceFit*/}
                                    {/*padding={'auto'}*/}
                                    {/*scale={*/}
                                        {/*{*/}
                                            {/*'population':{*/}
                                                {/*type:"linear",*/}
                                                {/*min:0,*/}
                                                {/*max:100,*/}
                                            {/*}*/}
                                        {/*}*/}
                                    {/*}*/}
                                {/*>*/}
                                    {/*<Coord transpose />*/}
                                    {/*<Axis*/}
                                        {/*name="country"*/}
                                        {/*visible={false}*/}
                                    {/*/>*/}
                                    {/*<Axis name="population" visible={false} />*/}
                                    {/*<Tooltip*/}
                                        {/*showTitle={false}*/}
                                        {/*itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"*/}
                                    {/*/>*/}
                                    {/*<Geom*/}
                                        {/*type="interval"*/}
                                        {/*position="country*population"*/}
                                        {/*tooltip={[*/}
                                            {/*"country*population",*/}
                                            {/*(item, percent) => {*/}
                                                {/*percent = percent + "%";*/}
                                                {/*return {*/}
                                                    {/*name: item,*/}
                                                    {/*value: percent*/}
                                                {/*};*/}
                                            {/*}*/}
                                        {/*]}*/}
                                        {/*color={"#a5f465"}*/}
                                    {/*/>*/}
                                {/*</Chart>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*title={"会议室排名"}*/}
                            {/*center={*/}
                                {/*<div >*/}
                                    {/*1.会议室二<Icon style={{color:"red"}} type="caret-up" theme="filled" />*/}
                                {/*</div>*/}
                            {/*}*/}
                            {/*text={"数据"}*/}
                            {/*chart={*/}
                                {/*<div style={{height:"56px"}}>*/}
                                    {/*<Row>*/}
                                        {/*<Col span={24}>*/}
                                            {/*<div style={{float:"left",paddingLeft:"20px"}}>*/}
                                                {/*2.会议室一{" 88"}<Icon style={{color:"green"}} type="caret-down" theme="filled" />*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                        {/*<Col span={24}>*/}
                                            {/*<div style={{float:"left",paddingLeft:"20px"}}>*/}
                                                {/*3.会议室三{"  68"}<Icon style={{color:"red"}} type="caret-up" theme="filled" />*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                        {/*<Col span={24}>*/}
                                            {/*<div style={{float:"left",paddingLeft:"20px"}}>*/}
                                                {/*4.会议室四{"  65"}<Icon style={{color:"green"}} type="caret-down" theme="filled" />*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                {/*</div>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*title={"设备数量总览"}*/}
                            {/*center={"公司设备"}*/}
                            {/*text={"图表"}*/}
                            {/*chart={*/}
                                {/*<Chart*/}
                                    {/*style={{marginLeft:"0px"}}*/}
                                    {/*height={200}*/}
                                    {/*data={polarDv}*/}
                                    {/*padding={'auto'}*/}
                                    {/*scale={{*/}
                                        {/*score:{*/}
                                            {/*min:0,*/}
                                            {/*max:100,*/}
                                        {/*}*/}
                                    {/*}}*/}
                                    {/*forceFit*/}
                                {/*>*/}
                                    {/*<Coord type="polar" radius={0.8} />*/}
                                    {/*<Axis*/}
                                        {/*name="item"*/}
                                        {/*// label={null}*/}
                                        {/*line={null}*/}
                                        {/*tickLine={{*/}
                                            {/*lineWidth: 1*/}
                                        {/*}}*/}
                                        {/*grid={{*/}
                                            {/*lineStyle: {*/}
                                                {/*lineDash: null*/}
                                            {/*},*/}
                                            {/*hideFirstLine: false*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                    {/*<Tooltip />*/}
                                    {/*<Axis*/}
                                        {/*name="score"*/}
                                        {/*line={null}*/}
                                        {/*label={null}*/}
                                        {/*tickLine={null}*/}
                                        {/*grid={{*/}
                                            {/*type: "polygon",*/}
                                            {/*lineStyle: {*/}
                                                {/*lineDash: null*/}
                                            {/*},*/}
                                            {/*alternateColor: "rgba(0, 0, 0, 0.04)"*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                    {/*/!*<Legend name="user" marker="circle" offset={30} />*!/*/}
                                    {/*<Geom type="area" position="item*score" color="user" />*/}
                                    {/*<Geom type="line" position="item*score" color="user" size={2} />*/}
                                    {/*<Geom*/}
                                        {/*type="point"*/}
                                        {/*position="item*score"*/}
                                        {/*color="user"*/}
                                        {/*shape="circle"*/}
                                        {/*size={4}*/}
                                        {/*style={{*/}
                                            {/*stroke: "#fff",*/}
                                            {/*lineWidth: 1,*/}
                                            {/*fillOpacity: 1*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</Chart>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*text={"图表"}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*text={"图表"}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                    {/*<Col {...mode1} >*/}
                        {/*<CardJGN*/}
                            {/*text={"图表"}*/}
                        {/*/>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        );
    }
}
class CardJGN extends Component{
    render(){
        return (
            <div className={'card'}>
                <div style={{width:"100%",height:"88px"}}>
                    <Row>
                        <Col>
                            <div style={{margin:"20px"}}>
                                <div style={{float:"left"}}>
                                    {this.props.title}
                                </div>
                                <div style={{float:"right"}}>
                                    <TooltipAnt title="指标说明">
                                        <Icon type="exclamation-circle" />
                                    </TooltipAnt>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{fontSize:"30px",float:"left",marginLeft:"20px"}}>
                                {
                                    this.props.center
                                }
                            </div>
                        </Col>
                    </Row>

                </div>
                {this.props.chart}
                <Divider>{this.props.text}</Divider>
            </div>
        )
    }
}
export default ManageIndex;
