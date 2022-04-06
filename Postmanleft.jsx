import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaRegFile} from 'react-icons/fa';
import { GiMeepleCircle } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { FiBox ,FiMonitor} from "react-icons/fi";
import { HiOutlineInbox} from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import './Whatsapp.css';
class Postmanleft extends Component{
    state={
        history:this.props.history,
    }
    handlehistoryclick(index){
        let s1={...this.state};
        this.props.onSend(s1.history[index]);
    }
    render(){
        let {history}=this.state;
        return(
            <div>
                <div className="myworkspace">
                    <b><FaUser/>&nbsp;&nbsp;My Workspace</b>
                    <button className="btn btn-sm">Import</button>
                    <button className="btn btn-sm">New</button>
                </div>
                <div className="leftleft">
                        <div className="leftoptions">
                            <div>
                                <FaRegFile className="lefticons"/><br/>
                                Collections
                            </div>
                            <div className="">
                                <GiMeepleCircle className="lefticons"/><br/>APIs
                            </div>
                            <div className="">
                                <FiBox className="lefticons"/><br/>Environments
                            </div>
                            <div className="">
                                <HiOutlineInbox  className="lefticons"/><br/>Mock Servers
                            </div>
                            <div className="">
                                <FiMonitor className="lefticons"/><br/>Monitors
                            </div>
                            <div className="">
                                <GrHistory className="lefticons"/><br/>History
                            </div>
                        </div>
                        <div className="historypannel">
                            <div className="p-2 row">
                                <div className="col-10">
                                    <input className="filter form-control" type="text"></input>
                                </div>
                                <div className="col-2 px-2"><BsThreeDotsVertical/></div>
                            </div>
                            <div className="leftpannel ">
                                <div className="leftscroller p-2">
                                    {history.map((d,index)=>(
                                    <div className="row">
                                        <div onClick={()=>this.handlehistoryclick(index)}>
                                            <span className="method">{d.method}</span> &nbsp;{d.url}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
            
            </div>
        )
    }
}
export default Postmanleft;