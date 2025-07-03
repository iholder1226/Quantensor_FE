export type Condition ={
    indicator:String,
    interval:String,
    activationState:String,
}
/*export type ConditionSet = {
    conditions:Array<Condition>
}*/
export type ConditionSet = {
     conditionSet:Array<Condition>
}
   
export type Order={
    tradeVehicle:String,
    optionStrategy:String,
    orderAction:String,
    orderRisk:String
}
export type Strategy = {
    name:string,
    assetSet:Array<string>,
    entrySequence:Array<ConditionSet>,
    targetSequence:Array<ConditionSet>,
    exitSequence:Array<ConditionSet>,
    entryOrder:Order
}
export type Indicator = {
            name:string,
            activationStates:Array<string>
        }