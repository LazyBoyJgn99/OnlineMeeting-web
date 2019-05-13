import React, { Component } from 'react';

import {
    // G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord, Label,
    // Label,
    // Legend,
    // View,
    // Guide,
    // Shape,
    // Facet,
    // Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {Col, Divider, Row, Icon, Tooltip as TooltipAnt, Collapse, message} from "antd";
import moment from 'moment';
import "@/css/graph/graph.less"
import golbal from '@/golbal';


// mock data
const visitData = [];

const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i],
    });
}
class BizDemo extends Component {
    componentWillReceiveProps(e){
        console.log("propsChange",e)
        if(e.loginFlag!==this.props.loginFlag){
            this.indexData();
        }
    }
    componentDidMount() { //初始化
        const e = document.createEvent("Event");
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        this.indexData();
    }
    state = {
        meetingList:[],
        autoHideXLabels: false,
        roomPercent:"14%",
        meetCount:0,
        data1 : [
            {
                year: "2月1日",
                sales: 5
            },
            {
                year: "2月2日",
                sales: 2
            },
            {
                year: "2月3日",
                sales: 6
            },
            {
                year: "2月4日",
                sales: 1
            },
            {
                year: "2月5日",
                sales: 8
            },
            {
                year: "2月6日",
                sales: 3
            },
            {
                year: "2月7日",
                sales: 2
            },
            {
                year: "2月8日",
                sales: 4
            },
            {
                year: "2月9日",
                sales: 9
            },
            {
                year: "2月10日",
                sales: 2
            },
            {
                year: "2月11日",
                sales: 6
            },
            {
                year: "2月12日",
                sales: 5
            },
            {
                year: "2月13日",
                sales: 3
            },
            {
                year: "2月14日",
                sales: 8
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
        free:100

    };
    ////////////////////////////////////////////////
    indexData=()=>{
        let data1 = [
            {
                year: "2月1日",
                sales: 5
            }
        ]
        let lineData=[
            {
                country: "空闲会议室",
                population: 78
            }
        ]
        let pieData=[
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
        ]
        let areaData=[
            {
                year: "1991",
                value: 15468
            }
        ]
        let roomPercent="14%"
        let meetCount=0
        let meetingList=[]
        const url=golbal.localhostUrl+"IMeeting/meeting/indexData";
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
            if(data.status===true){
                lineData=[
                    {
                        country: "空闲会议室",
                        population: data.data[1],
                    }
                ];
                data1=[]
                data.data[3].map((item,i)=>{
                    meetCount=meetCount+item
                    data1.push({
                        year: moment().add(-13+i,'days').format('MM月DD日'),
                        sales: item,
                    })
                });

                pieData=[]
                data.data[6].map(item=>{
                    pieData.push({
                        item: item[0],
                        count: item[1]
                    })
                })

                meetingList=data.data[0]
                data.data[4].map(item=>{
                    return meetingList.push(item)
                })

                this.setState({
                    meetingList:data.data[0],
                    lineData:lineData,
                    pieData:pieData,
                    data1:data1,
                    free:data.data[1],
                    meetCount:meetCount,
                },()=>{
                    const e = document.createEvent("Event");
                    e.initEvent('resize', true, true);
                    window.dispatchEvent(e);
                })
            }
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

        const mode1={//自适应大小1号
            xs:{span:24,offset:0},
            sm:{span:20,offset:2},
            md:{span:12,offset:0},
            lg:{span:8,offset:0},
            xl:{span:6,offset:0},
        }
        const mode2={//自适应大小1号
            xs:{span:24,offset:0},
            sm:{span:24,offset:0},
            md:{span:24,offset:0},
            lg:{span:16,offset:0},
            xl:{span:18,offset:0},
        }

        const cols2 = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };
        const text = `
          风湿病是一组侵犯关节、骨骼、肌肉、血管及有关软组织或结缔组织为主的疾病，其中多数为自身免疫性疾病。发病多较隐蔽而缓慢，病程较长，且大多具有遗传倾向。 诊断及治疗均有一定难度；血液中多可检查出不同的自身抗体，可能与不同HLA亚型有关；对非甾类抗炎药(NSAID)，糖皮质激素和免疫抑制剂有较好的短期或长期的缓解性反应。
         `;
        return (
            <div style={{padding:10}}>
                <Row gutter={16}>
                    <Col {...mode1}>
                        <CardJGN
                            title={"会议室利用率"}
                            center={this.state.roomPercent}
                            text={"效率"}
                            chart={
                                <Chart
                                    height={50}
                                    data={this.state.areaData}
                                    // scale={cols}
                                    forceFit
                                    padding={'auto'}
                                >
                                    {/*<Axis name="year" />*/}
                                    {/*<Axis*/}
                                        {/*name="value"*/}
                                        {/*label={{*/}
                                            {/*formatter: val => {*/}
                                                {/*return (val / 10000).toFixed(1) + "k";*/}
                                            {/*}*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                    <Tooltip
                                        crosshairs={{
                                            type: "line"
                                        }}
                                    />
                                    <Geom type="area" position="year*value" color={"#8f65dd"}/>
                                    <Geom type="line" position="year*value" size={2} color={"#8f65dd"}/>
                                </Chart>
                            }
                        />
                    </Col>
                    <Col {...mode1} >
                        <CardJGN
                            title={"近两周的开会总次数"}
                            text={"数量"}
                            center={this.state.meetCount}
                            chart={
                                <Chart
                                    height={50}
                                    data={this.state.data1}
                                    scale={{
                                        sales: {
                                            formatter: val => {
                                                val = val * 100 + "%";
                                                return val;
                                            }
                                        }
                                    }}
                                    forceFit
                                    padding={'auto'}
                                >
                                    {/*Axis x,y轴*/}
                                    {/*<Axis name="year" />*/}
                                    {/*<Axis name="sales" />*/}
                                    {/*Tooltip 数据详细*/}
                                    <Tooltip
                                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                                    />
                                    {/**/}
                                    <Geom
                                        // type="interval"
                                        position="year*sales"//有效数据
                                        tooltip={[
                                            "year*sales",
                                            (item, percent) => {
                                                // percent = percent * 100 + "%";
                                                return {
                                                    name: "会议次数",
                                                    value: percent
                                                };
                                            }
                                        ]}
                                    />
                                </Chart>
                            }
                        />
                    </Col>
                    <Col {...mode1} >
                        <CardJGN
                            title={"当前时段空闲会议室"}
                            center={this.state.free+"%"}
                            text={"实时"}
                            chart={
                                <Chart
                                    height={50}
                                    data={lineDv}
                                    forceFit
                                    padding={'auto'}
                                    scale={
                                        {
                                            'population':{
                                                type:"linear",
                                                min:0,
                                                max:100,
                                            }
                                        }
                                    }
                                >
                                    <Coord transpose />
                                    <Axis
                                        name="country"
                                        visible={false}
                                    />
                                    <Axis name="population" visible={false} />
                                    <Tooltip
                                        showTitle={false}
                                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                                    />
                                    <Geom
                                        type="interval"
                                        position="country*population"
                                        tooltip={[
                                            "country*population",
                                            (item, percent) => {
                                                percent = percent + "%";
                                                return {
                                                    name: item,
                                                    value: percent
                                                };
                                            }
                                        ]}
                                        color={"#a5f465"}
                                    />
                                </Chart>
                            }
                        />
                    </Col>

                    <Col {...mode1} >
                        <CardJGN
                            title={"会议室排名"}
                            center={
                                <div >
                                    1.会议室二<Icon style={{color:"red"}} type="caret-up" theme="filled" />
                                </div>
                            }
                            text={"数据"}
                            chart={
                                <div style={{height:"56px"}}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{float:"left",paddingLeft:"20px"}}>
                                                2.会议室一{" 88"}<Icon style={{color:"green"}} type="caret-down" theme="filled" />
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div style={{float:"left",paddingLeft:"20px"}}>
                                                3.会议室三{"  68"}<Icon style={{color:"red"}} type="caret-up" theme="filled" />
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div style={{float:"left",paddingLeft:"20px"}}>
                                                4.会议室四{"  65"}<Icon style={{color:"green"}} type="caret-down" theme="filled" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        />
                    </Col>
                    <Col {...mode2} >
                        <CardJGN
                            title={"最近两周受邀请的会议和发起的会议"}
                            center={"我的会议"}
                            text={"数据"}
                            chart={
                                <div style={{margin:"20px"}}>
                                    <Collapse
                                        // defaultActiveKey={['0']}
                                        onChange={()=>{}}
                                    >
                                        {
                                            this.state.meetingList.map((item,i)=>{
                                                return (
                                                    <Collapse.Panel
                                                        header={item.topic + " " + item.meetDate.split("-")[1] + "月" + item.meetDate.split("-")[2] + "日 " + item.begin.split(" ")[1]+"-"+item.over.split(" ")[1]+" "+item.meetroom.name+" 发起人："+item.userinfo.name}
                                                        key={i}
                                                    >
                                                        <p>{item.content}</p>
                                                    </Collapse.Panel>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>
                            }
                        />
                    </Col>
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

export default BizDemo;
