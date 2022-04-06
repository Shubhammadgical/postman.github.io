import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Whatsapp.css';
import http from "./http";
import JSONPretty from "react-json-pretty";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiMessageDetail, BiPencil } from "react-icons/bi";


class Postmanright extends Component{
    state={
        data:this.props.data,
        alldata:[],
        status:"",
        statustext:""
    }
    handlechange=(e)=>{
       let s1={...this.state};
       s1.data[e.currentTarget.name] = e.currentTarget.value;
       this.setState(s1);
       this.props.ChangeData(this.state.data)
    }
    async fetchdata(){
        let s1={...this.state}
        let response;
        if(s1.data.method==="GET"){
            try{
                response=await http.get(`${s1.data.url}`);
                console.log(response.data)
                s1.alldata=response.data;
                s1.status=response.status;
                s1.statustext=response.statusText;
            }catch{
                s1.alldata="Error in fetching Data. URL not found or check internet connection";
                s1.status="";
                s1.statustext="";
            }
        }else if(s1.data.method=="POST"){
            try{
                let post=JSON.parse(s1.data.postjson);
                console.log(post)
                response =await http.post(`${s1.data.url}`,post);
                console.log(response)
                s1.alldata=response.data;
            }catch{
                s1.alldata="Error in posting Data. URL not found or check internet connection";
                s1.status="";
                s1.statustext="";
            }
        }
        this.setState(s1)
    }
    handlesendbtn=()=>{
        let s1={...this.state};
        if(s1.data.method==""){
            s1.data.method="GET"
        }
        this.setState(s1);
        this.props.onSend(s1.data);
        this.fetchdata();
    }
    render(){
        let {url,method,postjson}=this.state.data;
        let {alldata,status,statustext}=this.state;
        return(
            <div className="fullrightpannel">
            <div className="rightpannel">
                <div className="urlsavebtndiv">
                    <div className="showurl">
                        <b>{url}</b>
                    </div>
                    <div>
                        <button className="btn btn-sm ">Save</button>
                    </div>
                    <div>
                        <button className="btn btn-sm ">/</button>
                    </div> 
                    <div style={{width:1,backgroundColor:"lightgray",marginLeft:5,marginRight:5}}></div>
                    <div className="">
                        <button className="btn btn-sm "><BiPencil className="lefticons"/><BiMessageDetail className="lefticons"/></button>
                    </div>
                </div>
                <div className="input-group p-2">
                        <select className="form-select flex-grow-0 w-auto" name="method" value={method}
                            onChange={this.handlechange}>
                            <option value="GET" >GET</option>
                            <option value="POST">POST</option>
                            
                        </select>
                        <input required className="form-control" id="url"
                        name="url"
                        value={url} onChange={this.handlechange} type="url" placeholder="http://localhost:2410/example"></input>
                        <button className="btn btn-primary" onClick={()=>this.handlesendbtn()}>Send</button>
                        
                    </div>
                <div>

                <div className="bodydata">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="query-params-tab"
                                data-bs-toggle="tab" data-bs-target="#query-params" type="button"
                                role="tab" aria-controls="query-params" aria-selected="true">Query Params</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="request-headers-tab"
                                data-bs-toggle="tab" data-bs-target="#request-headers" type="button"
                                role="tab" aria-controls="request-headers" aria-selected="false">Headers</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="json-tab"
                                data-bs-toggle="tab" data-bs-target="#json" type="button"
                                role="tab" aria-controls="json" aria-selected="false">JSON</button>
                        </li>
                        <li><span style={{paddingLeft:"710px",fontSize:"14px",color:"blue"}}><b>Cookies</b></span></li>
                    </ul>

                    <div className="tab-content p-3 border-top-0 border">
                        <div className="tab-pane fade show active" id="query-params"
                            role="tabpanel" aria-labelledby="query-params-tab">
                                <div data-query-params style={{height:165}}>
                                <button data-add-query-param-btn className="mt-2 btn btn-outline-success"
                                    type="button">Add</button>
                                </div> 
                        </div>
                        <div className="tab-pane fade " id="request-headers"
                            role="tabpanel" aria-labelledby="request-headers-tab">
                                <div data-request-headers style={{height:165}}>
                                <button data-add-request-headers-btn className="mt-2 btn btn-outline-success"
                                    type="button" >Add2</button>
                                </div> 
                        </div>
                        <div className="tab-pane " id="json"
                            role="tabpanel" aria-labelledby="json-tab">
                                <div data-json-request-body className="overflow-auto"
                                    style={{height:165}}>
                                <textarea name="postjson" value={postjson} onChange={this.handlechange}>
                                </textarea>
                                </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="responsebody p-2">
                    <div  style={{display:"inline-flex",width:"800px"}}><h3>Response</h3> 
                    <div  style={{position:"absolute",paddingLeft:"650px" ,display:"inline-flex"}}>
                        <div style={{width:"200px",color:"green",fontSize:"14px"}}>Status: {status} {statustext}</div>
                    </div>
                    </div>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="body-tab"
                                data-bs-toggle="tab" data-bs-target="#body" type="button"
                                role="tab" aria-controls="body" aria-selected="true">Body</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="response-headers-tab"
                                data-bs-toggle="tab" data-bs-target="#response-headers" type="button"
                                role="tab" aria-controls="response-headers" aria-selected="false">Headers</button>
                        </li>
                    </ul>
                    <div className="tab-content p-3 border-top-0 border">
                        <div className="tab-pane fade show active" id="body"
                            role="tabpanel" aria-labelledby="body-tab">
                                <div className="overflow-auto"
                                    style={{height:200}}>
                                        <JSONPretty data={alldata} />
                                    </div>
                        </div>
                        <div className="tab-pane fade " id="response-headers"
                            role="tabpanel" aria-labelledby="response-headers-tab">
                            <div className="overflow-auto"
                                    style={{height:200}}>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="rightoptions">
                    <div>{"</>"}</div>
                    <div> <HiOutlineLightBulb className="lefticons"/></div>
                </div>
            </div>
        )
    }
}
export default Postmanright;