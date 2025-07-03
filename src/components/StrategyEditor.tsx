import React, {useState} from "react";
import ConditionSetEditor from "./ConditionSetEditor.tsx";
import SequenceEditor from "./SequenceEditor.tsx"
import ConditionEditor from "./ConditionEditor.tsx"
import OrderEditor from "./OrderEditor.tsx"
import '../styles/strategyBuilder.css'
import type {Strategy,Condition,ConditionSet,Indicator,Order}from '../TypeDefinitions/TypeDefinitions.ts'

type EditorProps = {
    strategy:Strategy
}
type EditorState = {
    strategy:Strategy,
    sequenceIndex:number,
    setIndex:number,
    showOrderForm:boolean,
    showConditionForm:boolean,
    indicatorSet:Array<Indicator>
}


class StrategyEditor extends React.Component<any,EditorState>{
   
    constructor(props:any){
         
        super(props);
      /*  this.setState({
            name:props.strategy.name,
            entryOrder:props.strategy.entryOrder,
            entrySequence:props.strategy.entrySequence,
            exitSequence:props.strategy.exitSequence,
            targetSequence:props.strategy.targetSequence

        });*/
        this.state={
            strategy:{
                name:'',
                assetSet:new Array<string>,
                entrySequence:new Array<ConditionSet>(),
                targetSequence:new Array<ConditionSet>(),
                exitSequence: new Array<ConditionSet>(),
                entryOrder:{
                    tradeVehicle:"",
                    optionStrategy:"",
                    orderAction:"",
                    orderRisk:""
                },
            },
            indicatorSet:new Array<Indicator>(),
            sequenceIndex:0,
            setIndex:0,
            showOrderForm:false,
            showConditionForm:false
            

        }
        this.onNewConditionSet = this.onNewConditionSet.bind(this);
        this.onDeleteConditionSet = this.onDeleteConditionSet.bind(this);  
        this.onNewCondition = this.onNewCondition.bind(this);  
        this.onSaveCondition = this.onSaveCondition.bind(this); 
        this.onDeleteCondition = this.onDeleteCondition.bind(this);   
        this.onPostStrategy = this.onPostStrategy.bind(this);
        this.onSaveOrder = this.onSaveOrder.bind(this);
        this.onShowOrderForm = this.onShowOrderForm.bind(this); 
        
        
    } 
    /******************************Life Cycle  *********************************************** */
    componentDidMount(){
        //const [strategy,setStrategy] = useState<Strategy>(this.state.strategy);
        this.setState({
            strategy:{
                name:"",
                assetSet:[...this.state.strategy.assetSet],
                entrySequence:new Array<ConditionSet>(),
                targetSequence:new Array<ConditionSet>(),
                exitSequence: new Array<ConditionSet>(),
                entryOrder:{
                    tradeVehicle:"",
                    optionStrategy:"",
                    orderAction:"",
                    orderRisk:""
                },
            }
        });
        this.fetchIndicators();
        
        console.log("Components Mounted");
    }

    /*****************************END Life Cycle ************************************ */








    /**************EVENT HANDLERS********************* ********************************/
    setStrategy(){

    }
    onNewCondition(seqIndex:number,setIndex:number):void{
            this.setState({
                sequenceIndex:seqIndex,
                setIndex:setIndex,
            })
            //alert("New Condition Event has reached the strategy editor");
            this.setState({
                showConditionForm:true
            })
           
        }
    onSaveCondition(sequenceIndex:number,setIndex:number,indicator:string,interval:string,activationState:string):void{
        alert("Saving Condition, Sequence Index:"+sequenceIndex+" set Index:"+setIndex);  
        this.setState({
                showConditionForm:false
            })  
        //let activeIndex:number = 0;
            let newSequenceArray:Array<ConditionSet> = new Array<ConditionSet>();
            let targetConditionSet:Array<Condition> = new Array<Condition>();
            //Update the react state with new main array
            switch(sequenceIndex){
                case 0:
                     //Create a copy of the main array
                    newSequenceArray = [...this.state.strategy.entrySequence];
                    console.log("Sequene Array: "+ JSON.stringify(newSequenceArray));
                    //Create a copy of the target object
                    targetConditionSet = [...newSequenceArray[setIndex].conditionSet]
                    console.log("Target Conditions Array: "+ JSON.stringify(targetConditionSet));
                    //Incase this is the first condition in the set
                    if(targetConditionSet === null|| targetConditionSet === undefined){
                        targetConditionSet = new Array<Condition>();
                    }
                    //Add new element to target object
                    targetConditionSet = [...targetConditionSet,
                        {
                            indicator:indicator,
                            interval:interval,
                            activationState:activationState
                        }]
                    //Place modified target object back in main array copy
                    newSequenceArray[setIndex].conditionSet = targetConditionSet;
                    console.log(newSequenceArray[setIndex]);

                    this.setState({
                        strategy:{
                            entrySequence: newSequenceArray,
                            name:this.state.strategy.name,
                            assetSet:[...this.state.strategy.assetSet],
                            entryOrder:this.state.strategy.entryOrder,
                            exitSequence:[...this.state.strategy.exitSequence],
                            targetSequence:[...this.state.strategy.targetSequence]
                        
                        }
                    })
                    break;
                case 1:
                     //Create a copy of the main array
                    newSequenceArray = [...this.state.strategy.targetSequence];
                    //Create a copy of the target object
                    targetConditionSet = [...newSequenceArray[setIndex].conditionSet]
                    //Incase this is the first condition in the set
                    if(targetConditionSet === null|| targetConditionSet === undefined){
                        targetConditionSet = new Array<Condition>();
                    }
                    //Add new element to target object
                    targetConditionSet = [...targetConditionSet,
                        {
                            indicator:indicator,
                            interval:interval,
                            activationState:activationState
                        }]
                    //Place modified target object back in main array copy
                    newSequenceArray[setIndex].conditionSet = targetConditionSet;
                    console.log(newSequenceArray[setIndex]);
                    this.setState({
                        strategy:{
                            entrySequence: [...this.state.strategy.entrySequence],
                            name:this.state.strategy.name,
                            assetSet:[...this.state.strategy.assetSet],
                            entryOrder:this.state.strategy.entryOrder,
                            exitSequence:[...this.state.strategy.exitSequence],
                            targetSequence:newSequenceArray//[...this.state.strategy.targetSequence]
                        
                        }
                    })
                    break;
                case 2:
                     //Create a copy of the main array
                    newSequenceArray = [...this.state.strategy.exitSequence];
                    //Create a copy of the target object
                    targetConditionSet = [...newSequenceArray[setIndex].conditionSet]
                    //Incase this is the first condition in the set
                    if(targetConditionSet === null|| targetConditionSet === undefined){
                        targetConditionSet = new Array<Condition>();
                    }
                    //Add new element to target object
                    targetConditionSet = [...targetConditionSet,
                        {
                            indicator:indicator,
                            interval:interval,
                            activationState:activationState
                        }]
                    //Place modified target object back in main array copy
                    newSequenceArray[setIndex].conditionSet = targetConditionSet;
                    console.log(newSequenceArray[setIndex]);
                    this.setState({
                        strategy:{
                            entrySequence: [...this.state.strategy.entrySequence],
                            name:this.state.strategy.name,
                            assetSet:[...this.state.strategy.assetSet],
                            entryOrder:this.state.strategy.entryOrder,
                            exitSequence:newSequenceArray,//[...this.state.strategy.exitSequence],
                            targetSequence:[...this.state.strategy.targetSequence]
                        
                        }
                    })
                    break;
                default:break;

            }
            
    
    }
    onDeleteCondition():void{

    }
    onNewConditionSet = (sequenceIndex:number):void => {
       
        let temp:ConditionSet = {
            conditionSet:new Array<Condition>()
        }
        

        switch(sequenceIndex){
            case 0:
                this.setState({
                    strategy:{
                        entrySequence: [...this.state.strategy.entrySequence,temp],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    }
                })
                break;
            case 1:
                this.setState({
                    strategy:{
                        entrySequence: [...this.state.strategy.entrySequence],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence,temp]
                       
                    }
                })
                break;
            case 2:
                this.setState({
                    strategy:{
                        entrySequence: [...this.state.strategy.entrySequence],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence,temp],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    }
                })
                break;
        }
        console.log(this.state.strategy);
    }
    onDeleteConditionSet(sequenceIndex:number,setIndex:number):void{
        let tempSeq:Array<ConditionSet> = new Array<ConditionSet>();
        switch(sequenceIndex){
            case 0:
                tempSeq= this.state.strategy.entrySequence;
               
                this.setState({
                    strategy:{
                        entrySequence: tempSeq.filter((_,index) => index != setIndex), //[...this.state.strategy.entrySequence,temp],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    }
                })
                break;
            case 1:
                tempSeq = this.state.strategy.targetSequence;
               
                this.setState({
                    strategy:{
                        entrySequence: [...this.state.strategy.entrySequence],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:tempSeq.filter((_,index) => index != setIndex), //[...this.state.strategy.targetSequence]
                       
                    }
                })
                break;
            case 2:
                tempSeq = this.state.strategy.exitSequence;
               
                this.setState({
                    strategy:{
                        entrySequence:[...this.state.strategy.entrySequence],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:tempSeq.filter((_,index) => index != setIndex),//[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    }
                })
                break;

        }
       
    }
    onSaveStrategy():void{

    }
    onShowOrderForm():void{
        this.setState({
            showOrderForm:true
        });
    }
    onShowConditionForm():void{

    }
    onPostStrategy():void{
        alert("Strategy Posted To Server Check Consol");
           
    /*obj: {"name":"CHEES","assetSet":[],"entrySequence":[{"conditionSet":[{"asset":"","interval":"sixty_min","indicator":"","state":""}],"index":0,"setSequence":"entry"}],"entryOrder":{"orderAction":"BUY","orderRisk":"MAX_RISK","tradeVehicle":"EQUITY_OPTION","optionStrategy":"LONG_CALL"},"exitSequence":[{"conditionSet":[{"asset":"","interval":"monthly","indicator":"","state":""}],"index":0,"setSequence":"stop"}],"targetSequence":[{"conditionSet":[{"asset":"","interval":"monthly","indicator":"","state":""}],"index":0,"setSequence":"target"}],"exitOrder":null}*/
   // this.state.strategy.entrySequence = entryConditionSets;
    //strategy.exitSequence = exitConditionSets.value;
    //strategy.targetSequence =  targetConditionSets.value;//targetSequence.value;
    //console.log(JSON.stringify(this.state.strategy.entryConditionSets._rawValue)); 
     //send json version of strategy object to the server
  /*  let n:HTMLInputElement = document.getElementById("strName") as HTMLInputElement;
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
    let temp:HTMLInputElement = document.getElementById("strName") as HTMLInputElement;
    this.setState({
                    strategy:{
                        entrySequence:[...this.state.strategy.entrySequence],
                        name:temp.value,//this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    }
                },()=> {
                console.log("Strat Value: "+JSON.stringify(this.state.strategy));
         
                fetch("http://localhost:8081/createNew", {
                    method: "POST",
                    body: JSON.stringify(this.state.strategy),//JSON.stringify(this.state.strategy),
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
                            //entryConditionSets : new Array(),
                            exitSequence :new Array, 
                        // exitConditionSets :new Array(),
                            targetSequence : new Array(),
                            entryOrder : {
                                tradeVehicle:"",
                                optionStrategy:"",
                                orderAction:"",
                                orderRisk:""
                            }
                        }
                    });
                });
                
    }
    onSaveOrder(order:Order):void{
        alert("Saving Order: "+ JSON.stringify(order));
        this.setState({
            strategy:{
                        entrySequence:[...this.state.strategy.entrySequence],
                        name:this.state.strategy.name,
                        assetSet:[...this.state.strategy.assetSet],
                        entryOrder:order,//this.state.strategy.entryOrder,
                        exitSequence:[...this.state.strategy.exitSequence],
                        targetSequence:[...this.state.strategy.targetSequence]
                       
                    },
            showOrderForm:false
        })
        console.log("Current Strategy State: "+JSON.stringify(this.state.strategy));
    }
    
    /********************************END EVENT HANDLERS */


    /******************************** API Resource Injection ****************************************** */


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

   /************************************* END API Resource Injection */




    render()/*: React.ReactNode */{
/*
            const entryConditionSets:Array<ReactElement> = (this.state.strategy.entrySequence).map(
                (key,index)=> <ConditionSetEditor 
                                    key={index} 
                                    conditionSet={this.state.strategy.entrySequence[index]}
                                    newCondition={this.onNewCondition}
                                    deleteCondition={this.onDeletCondition}
                                    saveCondition={this.onSaveCondition}
                                    setIndex ={index}
                                    sequenceIndex = {0}
                                />
                                    
            );

            const targetConditionSets = (this.state.strategy.targetSequence).map(
                (key,index)=> <ConditionSetEditor 
                                    key={index} 
                                    conditionSet={this.state.strategy.targetSequence[index]}
                                    deleteCondition={this.onDeletCondition}
                                    newCondition={this.onNewCondition}
                                    saveCondition={this.onSaveCondition}
                                    setIndex ={index}
                                    sequenceIndex = {1}
                                />
                                    
            );

            const exitConditionSets = (this.state.strategy.exitSequence).map(
                (key,index)=> <ConditionSetEditor 
                                    key={index} 
                                    conditionSet={this.state.strategy.exitSequence[index]}
                                    newCondition={this.onNewCondition}
                                    deleteCondition={this.onDeletCondition}
                                    saveCondition={this.onSaveCondition}
                                    setIndex ={index}
                                    sequenceIndex = {2}
                                />
                                    
            );

        */

        return (
            <>
                     <div className="strategyBuilder">
                                   {(this.state.showConditionForm)?(<ConditionEditor setIndex={this.state.setIndex}
                                   // newCondition={this.newCondition}
                                    saveCondition={this.onSaveCondition} 
                                    indicators={this.state.indicatorSet}
                                    sequenceIndex={this.state.sequenceIndex}/>):(null)}

                                    {(this.state.showOrderForm)?(<OrderEditor saveOrder={this.onSaveOrder}/>):(null)}
                                    <div>
                                        <label>Strategy Name:</label>
                                        <input id="strName" type="text" required />
                                    </div>
                                    <div className="conditionSets">
                                        Entry Condition Sets
                                        <SequenceEditor 
                                            newCondition={this.onNewCondition}
                                            deleteCondition={this.onDeleteCondition}
                                             deleteConditionSet = {this.onDeleteConditionSet}
                                            sequenceIndex={0}
                                           // saveCondition={this.onSaveCondition}
                                            sequence = {this.state.strategy.entrySequence} />
                                        
                                    </div>
                                    <button onClick={() => this.onNewConditionSet(0)}>Add Entry Condition Set</button>
                                    <div className="conditionSets">
                                        Target condition set
                                        <SequenceEditor 
                                            newCondition={this.onNewCondition}
                                            deleteCondition={this.onDeleteCondition}
                                            deleteConditionSet = {this.onDeleteConditionSet}
                                            sequenceIndex={1}
                                            //saveCondition={this.onSaveCondition}
                                            sequence = {this.state.strategy.targetSequence}/>
                                        
                                    </div>
                                    <button onClick={()=>this.onNewConditionSet(1)}>Add Take Profit Condition Set</button>
                                   
                                    <div className="conditionSets">
                                        Exit condition set
                                        <SequenceEditor  
                                            newCondition={this.onNewCondition}
                                            deleteCondition={this.onDeleteCondition}
                                             deleteConditionSet = {this.onDeleteConditionSet}
                                            sequenceIndex={2}
                                           // saveCondition={this.onSaveCondition}
                                            sequence = {this.state.strategy.exitSequence}/>
                                    </div>
                                    <button onClick={()=>this.onNewConditionSet(2)}>Add Stop Loss Condition Set</button>
                                    <button onClick={this.onShowOrderForm}>Entry Order Form</button>
                                    <button onClick={this.onPostStrategy}>Save Strategy</button>
                            
                            </div>


               
            </>
        )
    }
}
export default StrategyEditor;