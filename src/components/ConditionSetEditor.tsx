import React, { type ReactNode } from "react";
import '../styles/conditionSet.css'
import '../styles/conditionSetController.css'
import ConditionsTable from "./ConditionsTable";
import type {Strategy,Condition,ConditionSet,Indicator}from '../TypeDefinitions/TypeDefinitions.ts'

type ConditionSetEditorProps ={
    key:number,
    conditionSet:ConditionSet,
    newCondition:(sequenceIndex:number,setIndex:number)=>void,
    deleteSet:(sequenceIndex:number,setIndex:number)=>void
    deleteCondition:()=>void,
   // saveCondition:()=>void,
    setIndex:number,
    sequenceIndex:number,
}
class ConditionSetEditor extends React.Component<ConditionSetEditorProps,Array<Condition>> {
    constructor(props:ConditionSetEditorProps){
        super(props);
        this.onNewCondition = this.onNewCondition.bind(this);
    }
    onNewCondition = () =>{
        this.props.newCondition(this.props.sequenceIndex,this.props.setIndex)
    }
    
    render():ReactNode{
        
        return(
            <>
              <div className="conditionSet">
                     <ConditionsTable conditions={this.props.conditionSet} 
                                      onNewCondition={this.onNewCondition}
                                      onDeleteSet={this.props.deleteSet}
                                      sequenceIndex ={this.props.sequenceIndex}
                                      setIndex = {this.props.setIndex}
                                      />
                   
              </div>
              
            </>
        );
    }
}
export default ConditionSetEditor;