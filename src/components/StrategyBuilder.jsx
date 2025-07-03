import { render } from "react-dom";
import React, {Component} from 'react'
import '../styles/strategyBuilder.css'
import ConditionSet from './ConditionSet'
import Condition from './Condition'
import OrderForm from "./OrderForm";

export default class StrategyBuilder extends React.Component{
    

    
    constructor(props){
        super(props);
        
        let indicator = {
            name:'',
            states:[]
        }
        let indicatorSet = [indicator];
        this.state={
            showOrderForm :false,
            isExitCondition:false,
            isTargetCondition:false,
            strategy :{
                name:'',
                assetSet:[],
                entrySequence:[],
                entryOrder:null,
                exitSequence:[],
                targetSequence:[],
                exitOrder:null
            },      
            indicatorSet : [indicator],
            conditionSetEditors :[],
            conditionSetIndex:0,
            showOrderForm:false,
            showConditionForm:false, 
            activeSequence:0,
        }
        this.newEntryConditionSet = this.newEntryConditionSet.bind(this);  
        this.newTargetConditionSet = this.newTargetConditionSet.bind(this);  
        this.newExitConditionSet = this.newExitConditionSet.bind(this);  
        this.newConditionSet = this.newConditionSet.bind(this);
        this.newCondition = this.newCondition.bind(this);
        this.saveCondition = this.saveCondition.bind(this);
        this.showOrderForm = this.showOrderForm.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.postStrategy = this.postStrategy.bind(this);
        
    }
    
    newEntryConditionSet(condition){
        
      
        this.setState({
            strategy :{
            name:this.state.strategy.name,
            assetSet:[...this.state.strategy.assetSet],
            entryOrder:this.state.strategy.entryOrder,
            exitSequence:[...this.state.strategy.exitSequence],
            targetSequence:[...this.state.strategy.targetSequence],
            exitOrder:null,
            entrySequence:[...this.state.strategy.entrySequence,new Array()]
            },
            activeSequence:0,
        });
        console.log("Condition Sets count"+ this.state.strategy.entrySequence.length);
        console.log("current state: "+JSON.stringify(this.state.strategy));
       
    }
    newTargetConditionSet(condition){
        
            this.setState({
                strategy :{
                    name:this.state.strategy.name,
                    assetSet:[...this.state.strategy.assetSet],
                    entryOrder:this.state.strategy.entryOrder,
                    exitSequence:[...this.state.strategy.exitSequence],
                    entrySequence:[...this.state.strategy.entrySequence],
                    exitOrder:null,
                    targetSequence:[...this.state.strategy.targetSequence,new Array()]
                   },
                   activeSequence:1,
            });
       
        console.log("Condition Sets count"+ this.state.strategy.targetSequence.length);
        console.log("current state: "+JSON.stringify(this.state.strategy));
       
    }
    newExitConditionSet(condition){
       
            this.setState({
                strategy :{
                    name:this.state.strategy.name,
                    assetSet:[...this.state.strategy.assetSet],
                    entryOrder:this.state.strategy.entryOrder,
                    entrySequence:[...this.state.strategy.entrySequence],
                    targetSequence:[...this.state.strategy.targetSequence],
                    exitOrder:null,
                    exitSequence:[...this.state.strategy.exitSequence,new Array()]
                   },
                activeSequence:2,
            });
        console.log("Condition Sets count"+ this.state.strategy.entrySequence.length);
        console.log("current state: "+JSON.stringify(this.state.strategy));
       
    }
    newConditionSet(state){
        
    }
    newCondition(index,sequenceIndex){

        this.setState({
            showConditionForm:true,
            setIndex:index,
            activeSequence:sequenceIndex,
        })
        console.log("current state: "+JSON.stringify(this.state.strategy));
    }
    saveCondition(i,si,indicator,interval,state){
       //alert("Saving condition, indicator:"+indicator+" interval:"+interval + " state:"+state +" Sequence: "+si)
       let updatedSet = new Array();
        switch(si){
            case 0:
                    updatedSet = this.state.strategy.entrySequence.map((element,index)=>{
                        //alert("i:"+i+" current index: "+ index);
                        if(i===index){
                            //alert("Found element to update: "+ element.interval);
                            element = [...element,{indicator:indicator,interval:interval,activationState:state}];
                        }
                        return element;
                    })
                this.setState({
                    strategy :{
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        entrySequence:updatedSet,//[...this.state.strategy.entrySequence,updatedSet],
                        targetSequence:[...this.state.strategy.targetSequence],
                        exitOrder:null,
                        exitSequence:[...this.state.strategy.exitSequence]
                        },
                    showConditionForm:false,
                    showOrderForm:false,
                },()=>{
                    //alert("Set State Callback");
                    console.log("current state: "+JSON.stringify(this.state.strategy));
        
                })
                break;
            case 1:
                    updatedSet = this.state.strategy.targetSequence.map((element,index)=>{
                        //alert("i:"+i+" current index: "+ index);
                        if(i===index){
                            //alert("Found element to update: "+ element.interval);
                            element = [...element,{indicator:indicator,interval:interval,state:state}];
                        }
                        return element;
                    })
                this.setState({
                    strategy :{
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        entrySequence:[...this.state.strategy.entrySequence],
                        targetSequence:updatedSet,//[...this.state.strategy.targetSequence,updatedSet],
                        exitOrder:null,
                        exitSequence:[...this.state.strategy.exitSequence]
                        },
                    showConditionForm:false,
                    showOrderForm:false,
                },()=>{
                    //alert("Set State Callback");
                    console.log("current state: "+JSON.stringify(this.state.strategy));
        
                })
                break;
            case 2:
                    updatedSet = this.state.strategy.exitSequence.map((element,index)=>{
                        //alert("i:"+i+" current index: "+ index);
                        if(i===index){
                            //alert("Found element to update: "+ element.interval);
                            element = [...element,{indicator:indicator,interval:interval,state:state}];
                        }
                        return element;
                    })
                this.setState({
                    strategy :{
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        entrySequence:[...this.state.strategy.entrySequence],
                        targetSequence:[...this.state.strategy.targetSequence],
                        exitOrder:null,
                        exitSequence:updatedSet,//[...this.state.strategy.exitSequence,updatedSet]
                        },
                    showConditionForm:false,
                    showOrderForm:false,
                },()=>{
                    //alert("Set State Callback");
                    console.log("current state: "+JSON.stringify(this.state.strategy));
        
                })
                break;
        }
        
       
    }
    showOrderForm(){
    
        this.setState({
            showOrderForm:true,
        })
    }
    componentDidMount(){
        this.fetchIndicators();
    }
    saveOrder(order){
        alert("Saving order  "+JSON.stringify(order));
        this.setState({
            strategy :{
                name:this.state.strategy.name,
                assetSet:[...this.state.strategy.assetSet],
                entryOrder:order,
                entrySequence:[...this.state.strategy.entrySequence],
                targetSequence:[...this.state.strategy.targetSequence],
                exitOrder:null,
                exitSequence:[...this.state.strategy.exitSequence],
               },
               showConditionForm:false,
               showOrderForm:false,
        })

    }
    fetchIndicators(){
        const uri = 'http://localhost:8081/indicators';
        fetch(uri, {
           method: "GET",
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
              /* 'Referrer-Policy': 'same-origin',
               'Access-Control-Allow-Origin':'*'*/
               
           }
       })
       .then(response => { 
           if(response.ok){
                
                return response.json()    
           } else{
               alert("Server returned " + response.status + " : " + response.statusText);
           }                
       })
       //Time Series (5min)
       //Time Series (Daily)
       .then(data => {
           console.log("json: "+JSON.stringify( data));
           const map = new Map(Object.entries(data));
           //this.indicatorSet = map;
          //this.indicatorSet = data;
          this.setState({
              indicatorSet:data,
          })
           console.log("StateMachines"+ JSON.stringify(this.state.indicatorSet));
           /*for (let [key, value] of map) {
                 console.log("Key: "+key + "  Value: "+value);
                 indicator.name = key;
                 indicator.activationStates.value = value;
                 indicatorSet.value.push(indicator);
           }*/
       })
       .catch(err => {
           console.log(err);
       });
   }
   
   postStrategy(){
    alert("Strategy Posted To Server Check Consol");
    /*obj: {"name":"CHEES","assetSet":[],"entrySequence":[{"conditionSet":[{"asset":"","interval":"sixty_min","indicator":"","state":""}],"index":0,"setSequence":"entry"}],"entryOrder":{"orderAction":"BUY","orderRisk":"MAX_RISK","tradeVehicle":"EQUITY_OPTION","optionStrategy":"LONG_CALL"},"exitSequence":[{"conditionSet":[{"asset":"","interval":"monthly","indicator":"","state":""}],"index":0,"setSequence":"stop"}],"targetSequence":[{"conditionSet":[{"asset":"","interval":"monthly","indicator":"","state":""}],"index":0,"setSequence":"target"}],"exitOrder":null}*/
   // this.state.strategy.entrySequence = entryConditionSets;
    //strategy.exitSequence = exitConditionSets.value;
    //strategy.targetSequence =  targetConditionSets.value;//targetSequence.value;
    //console.log(JSON.stringify(this.state.strategy.entryConditionSets._rawValue)); 
     //send json version of strategy object to the server
    let n= document.getElementById("strName");
         alert("Name Change to "+n.value);
        let nVal = n.value;
    console.log("obj: "+JSON.stringify(this.state.strategy));
    let strat =  {
        name:nVal,
        assetSet:[],
        entrySequence:[],
        entryOrder:this.state.strategy.entryOrder,
        exitSequence:[],
        targetSequence:[],
        exitOrder:null
    }; 
    //strat.entrySequence = [{...this.state.strategy.entrySequence}];
    this.state.strategy.entrySequence.forEach((set) => strat.entrySequence.push({conditionSet:set}));
    this.state.strategy.targetSequence.forEach((set) => strat.targetSequence.push({conditionSet:set}));
    this.state.strategy.exitSequence.forEach((set) => strat.exitSequence.push({conditionSet:set}));

    
   /* strat.entryOrder = this.state.entryOrder;
    strat.exitOrder = this.state.exitOrder;
    strat.entrySequence.conditionSet = this.state.entrySequence;
    strat.exitSequence.conditionSet = this.state.exitSequence;
    strat.targetSequence.conditionSet = this.state.targetSequence;*/

    console.log("Strat Value: "+JSON.stringify(strat));
         
    fetch("http://localhost:8081/createNew", {
        method: "POST",
        body: JSON.stringify(strat),//JSON.stringify(this.state.strategy),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        this.setState({
            strategy:{
                name:"",
                assetSet:new Array(),
                entrySequence : new Array(),
                entryConditionSets : new Array(),
                exitSequence :new Array, 
                exitConditionSets :new Array(),
                targetSequence : new Array(),
                name : '',
            }
        });
    
    //targetConditionSets = new Array()//targetSequence.value;
    //console.log(JSON.stringify(this.state.entryConditionSets._rawValue)); 
    }
    
    render(){
       // if(this.state.strategy.entrySequence.length>0){
        
            const entryConditionSets = (this.state.strategy.entrySequence).map(
                (key,index)=> <ConditionSet 
                                    key={index} 
                                    conditionSet={this.state.strategy.entrySequence[index]}
                                    newCondition={this.newCondition}
                                    setIndex ={index}
                                    sequenceIndex = {0}
                                />
                                    
            );

            const targetConditionSets = (this.state.strategy.targetSequence).map(
                (key,index)=> <ConditionSet 
                                    key={index} 
                                    conditionSet={this.state.strategy.targetSequence[index]}
                                    newCondition={this.newCondition}
                                    setIndex ={index}
                                    sequenceIndex = {1}
                                />
                                    
            );

            const exitConditionSets = (this.state.strategy.exitSequence).map(
                (key,index)=> <ConditionSet 
                                    key={index} 
                                    conditionSet={this.state.strategy.exitSequence[index]}
                                    newCondition={this.newCondition}
                                    setIndex ={index}
                                    sequenceIndex = {2}
                                />
                                    
            );
            //let orderForm =(this.state.showOrderForm) ?<OrderForm/>:null;
                  
        

            //if(this.state.showConditionForm){
            return(
                <>
                <div className="strategyBuilder">
                        {(this.state.showConditionForm)?(<Condition setIndex={this.state.setIndex}
                                newCondition={this.newCondition}
                                saveCondition={this.saveCondition} 
                                indicators={this.state.indicatorSet}
                                sequenceIndex={this.state.activeSequence}/>):(null)}

                        {(this.state.showOrderForm)?(<OrderForm saveOrder={this.saveOrder}/>):(null)}
                        <div>
                            <label>Strategy Name:</label>
                            <input id="strName" type="text"required />
                        </div>
                        <div className="conditionSets">
                            Entry Condition Sets
                            {entryConditionSets}
                            
                        </div>
                        <button onClick={this.newEntryConditionSet}>Add Entry Condition Set</button>
                        <div className="conditionSets">
                            Target condition set
                            {targetConditionSets}
                        </div>
                        <button onClick={this.newTargetConditionSet}>Add Take Profit Condition Set</button>
                       
                        <div className="conditionSets">
                            Exit condition set
                            {exitConditionSets}
                        </div>
                        <button onClick={this.newExitConditionSet}>Add Stop Loss Condition Set</button>
                        <button onClick={this.showOrderForm}>Entry Order Form</button>
                        <button onClick={this.postStrategy}>Save Strategy</button>
                
                </div>
                </>
            );
            /*}else{
                return(
                    <div className="strategyBuilder">
                        {this.state.showOrderForm?(<OrderForm />):(null)}
                        <div>
                            <label>Strategy Name:</label>
                            <input type="text"required />
                        </div>
                        
                        <div className="conditionSets">
                            Entry Condition Sets
                            {entryConditionSets}
                                    
                        </div>
                        <button onClick={this.newEntryConditionSet}>Add Entry Condition Set</button>
                        
                        <div className="conditionSets">
                            Target condition sets
                            {targetConditionSets}
                        </div>
                        <button onClick={this.newTargetConditionSet}>Add Take Profit Condition Set</button>
                        
                        <div className="conditionSets">
                            Exit condition sets
                            {exitConditionSets}
                        </div>
                        <button onClick={this.newExitConditionSet}>Add Stop Loss Condition Set</button>
                        <button onClick={this.showOrderForm}>Entry Order Form</button>
                        
                     </div>
                );
            }*/
       
    }
}