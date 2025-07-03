import React, {Component} from 'react'
import '../styles/condition.css'
export default class Condition extends React.Component{
    
    constructor(props){
        super(props);

        Condition.propTypes={
            newCondition:()=>{},
            saveCondition:()=>{},
            indicators:[/*{
                indicator : {
                    name:'',
                    activationStates:[]
                }
            }*/],
            setIndex:Number,
            sequenceIndex:Number,
            
        }
        this.state={
            activeStates:[],
            indicator:'',
            interval:'',
            state:'',
        }
        let activeStates=new Array();
        //this.newCondition = this.newCondition.bind(this);
        this.onIndicatorChange = this.onIndicatorChange.bind(this);
        this.onIntervalChange = this.onIntervalChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }
    
    onIndicatorChange(){
        
       // console.log("current indicators: "+JSON.stringify(this.props.indicators));

        let i = document.getElementById("indicator");
        
        this.props.indicators.map(value => {
            
            if(value.name === i.value){ 
               
                this.setState({
                    activeStates:value.activationStates,//activationStates,
                    indicator: i.value,
                });
                return;
            }
        });
        
    }
    onIntervalChange(){
        let interval = document.getElementById("interval");
        this.state.interval = interval.value;
        
    }
    onStateChange(){
        let state = document.getElementById("state");
        this.state.state = state.value;
    }
    render(){
        const indicatorList =  Object.entries(this.props.indicators).map(
            ([key,value])=> <option key={key} value={value.name}>{value.name}</option>
        )
        const states = Object.entries(this.state.activeStates).map(([key,value])=><option key={key} value={value}>{value}</option>)
        return(
            <section  className="condition"> 
           
          
            <select  name="Interval" id="interval" required onChange={this.onIntervalChange}>
                <option disabled value="" selected> Interval </option>
                <option value="one_min">1 Minute</option>
                <option value="five_min">5 Minutes</option>
                <option value="fifteen_min">15 Minutes</option>
                <option value="sixty_min">1 Hour</option>
                <option value="4h">4 Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
        
           <select name="indicator" id="indicator" required onChange={this.onIndicatorChange} >
                <option disabled value="" selected>Indicator </option>
                {indicatorList}
            </select>
            
           
             
           <select name="State" id ="state" required onChange={this.onStateChange}>
                <option disabled value="" selected > Activation State </option>
                {states}
                
            </select>
            <button onClick=
                    {()=>{this.props.saveCondition(this.props.setIndex,this.props.sequenceIndex,this.state.indicator,this.state.interval,this.state.state)}}
                    >Save Condition</button>
            
    </section>

        )
    }
}