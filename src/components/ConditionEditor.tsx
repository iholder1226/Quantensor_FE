import React from "react";
import type {Indicator}from '../TypeDefinitions/TypeDefinitions.ts'
type ConditionProps = {
        saveCondition:(sequenceIndex:number,setIndex:number,indicator:string,interval:string,activationState:string)=>void,
        indicators:Array<Indicator>,
        setIndex:number,
        sequenceIndex:number,
    }
type ConditionState={
            activeStates:Array<string>,
            indicator:string,
            interval:string,
            state:string,
        }

class ConditionEditor extends React.Component<ConditionProps,ConditionState>{
    
    constructor(props:ConditionProps){
        super(props);
        this.state = {
            activeStates:new Array<string>(),
            indicator:"",
            interval:"",
            state:""
        }
        this.onIndicatorChange = this.onIndicatorChange.bind(this);
        this.onIntervalChange = this.onIntervalChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }
    componentDidMount(): void {
        
    }
    
    
    onIndicatorChange(){
        
       // console.log("current indicators: "+JSON.stringify(this.props.indicators));

        let i:HTMLSelectElement = document.getElementById("indicator") as HTMLSelectElement;
        console.log(this.props);
        this.props.indicators.map(value => {
            
            if(value.name === i.value){ 
               // alert("Indicator Located, value: "+ value.activationStates);
                this.setState({
                    activeStates:[...value.activationStates],//activationStates,
                    indicator: i.value,
                });
                console.log(this.state);
                return;
            }
        });
        
    }
    onIntervalChange(){
        let interval:HTMLSelectElement = document.getElementById("interval") as HTMLSelectElement;
        this.setState({
            interval:interval.value
        })
        //this.state.interval = interval.value;
        
    }
    onStateChange(){
        let state:HTMLSelectElement = document.getElementById("state") as HTMLSelectElement;
        this.setState({
            state:state.value
        })
        //this.state.state = state.value;
    }

    render(): React.ReactNode {
         const indicatorList =  Object.entries(this.props.indicators).map(
            ([key,value])=> <option key={key} value={value.name}>{value.name}</option>
        )
        const states = Object.entries(this.state.activeStates).map(([key,value])=><option key={key} value={value}>{value}</option>)
        return(
            <>
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
                    {()=>{this.props.saveCondition(this.props.sequenceIndex,this.props.setIndex,this.state.indicator,this.state.interval,this.state.state)}}
                    >Save Condition</button>
            
    </section>
            </>
        );
    }

}
export default ConditionEditor;