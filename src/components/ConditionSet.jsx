import '../styles/conditionSet.css'
import React, {Component} from 'react'
import Condition from './Condition'
export default class ConditionSet extends React.Component{
    constructor(props){
        super(props);
        
        ConditionSet.propTypes = {
            setIndex:Number,
            sequenceIndex:Number,
            key:Number,
            conditionSet:[/*{
                indicator:'',
                interval:'',
                state:'',
            }*/],
            newConditionSet:()=>{},
            newCondition:()=>{}, 
            
            
        } 
    }
    render(){
        
        
        
        console.log("current set conditions: "+JSON.stringify(this.props.conditionSet));
        const index = this.props.setIndex;
        //alert(JSON.stringify(this.props.conditionSet));
        
        const set = Object.entries(this.props.conditionSet).map(
            ([key,set])=> {
                //alert("Set:"+JSON.stringify(set));
                return(
                <ul key={key}>
                    <li>{set.indicator}</li>
                    <li> {set.interval}</li>
                    <li> {set.state}</li>
                    <li><button>X</button></li>
               </ul> 
               
                )
               // console.log("Set Value: "+{set});
            });
        return(
            <div className="conditionSet">
                {set}
                
                <button onClick={()=>{this.props.newCondition(this.props.setIndex,this.props.sequenceIndex)}}>Add Condition</button>
            </div>
            
        )
    }
}