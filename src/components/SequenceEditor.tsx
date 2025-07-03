import React from "react";
import ConditionSetEditor from "./ConditionSetEditor";
import '../styles/sequenceEditor.css'
import type {Condition,ConditionSet} from '../TypeDefinitions/TypeDefinitions'


type sequenceState ={
    sequence:Array<ConditionSet>
}
type sequenceProps ={
    sequence:Array<ConditionSet>
    newCondition:(sequenceIndex:number,setIndex:number)=>void,
    deleteCondition:()=>void,
    deleteConditionSet:(sequenceIndex:number,setIndex:number)=>void,
    sequenceIndex:number
    //saveCondition:()=>void,
}
class SequenceEditor extends React.Component<sequenceProps,sequenceState>{
    constructor(props:sequenceProps){
        super(props);
        this.state={
            sequence:this.props.sequence, //new Array<ConditionSet>(...this.props.sequence)//new Array<ConditionSet>()
        }
        
    } 
    componentDidMount(): void {
        this.setState({
            sequence:new Array<ConditionSet>(...this.props.sequence)//this.props.sequence
        })
       
        console.log("States Seq length: "+this.state.sequence.length);
        console.log("Props Seq length: "+this.props.sequence.length);
    }
    render(): React.ReactNode {
        
        const conditionSets = (this.props.sequence).map(
                (key,index)=> <ConditionSetEditor 
                                    key={index} 
                                    conditionSet={this.props.sequence[index]}
                                    newCondition={this.props.newCondition}
                                    deleteCondition={this.props.deleteCondition}
                                    deleteSet={this.props.deleteConditionSet}
                                  //  saveCondition={this.props.saveCondition}
                                    setIndex ={index}
                                    sequenceIndex = {this.props.sequenceIndex} 
                                />
                                    
            );
        return(
            <>
                <div className="sequenceEditor">
                    
                    {conditionSets}
        
                </div>
            </>
        );
    }
}

export default SequenceEditor;