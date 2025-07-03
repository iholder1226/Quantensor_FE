import React from "react"
import type {Order} from "../TypeDefinitions/TypeDefinitions"
import '../styles/OrderForm.css'
type editorProps = {
    saveOrder:(order:Order)=>void
}
type editorState = {
    orderAction:string,
    orderRisk:string,
    tradeVehicle:string,
    optionStrategy:string,
}

class OrderEditor extends React.Component<editorProps,editorState>{
    tradeVehicles = ['EQUITY',
			'EQUITY_OPTION',
			'ETF',
			'ETF_OPTION',
			'INDEX_OPTION']

            riskProfile = ['MAX_RISK',
	    	'MID_RISK',
	    	'MIN_RISK']

            availableActions = ['BUY','SELL']
            optionStrategies = [
            'LONG_CALL',
            'LONG_PUT',
            'BEAR_CALL_SPREAD',
            'BULL_CALL_SPREAD',
            'BEAR_PUT_SPREAD',
            'BULL_PUT_SPREAD',
            'BUTTERFLY',
            'BROKEN_WING',
            'RATIO_SPREAD',
            'CALENDAR',
            'STRANGLE',
            'STRADDLE',
            'CONDOR',
            'IRON_CONDOR',
            'IRON_BUTTERFLY'
            ]
    constructor(props:editorProps){
        super(props);
        this.updateState  = this.updateState.bind(this);
    }

    componentDidMount(): void {
        
    }

    updateState(){
        let action:HTMLSelectElement = document.getElementById("action") as HTMLSelectElement;
        let risk:HTMLSelectElement = document.getElementById("risk") as HTMLSelectElement;
        let vehicle:HTMLSelectElement = document.getElementById("vehicle") as HTMLSelectElement;
        let strategy:HTMLSelectElement = document.getElementById("strategy") as HTMLSelectElement;
        //alert("State Change:"+action+" "+risk+" ");


        this.setState({
            orderAction:action.value,
            orderRisk:risk.value,
            optionStrategy:strategy.value,
            tradeVehicle:vehicle.value,
        })
    }

    render(){
        
        let optionStrategies = Object.entries(this.optionStrategies).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        let tradeVehicles = Object.entries(this.tradeVehicles).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        let riskProfile = Object.entries(this.riskProfile).map(([key,value])=>
            <option key = {key} value={value}>{value}</option>
        )
        return(
        <>

            <div id="componentWrapper">
                <span >Order Form </span>
                <label>Select Trade Vehicle</label>
                <select name="vehicle" id="vehicle" required onChange={this.updateState}>
                    <option disabled value="" selected> Select Action</option>
                    {tradeVehicles}
                </select>
                <div >
                <label>Select Option Strategy</label>
                <select name="strategy" id="strategy"  required onChange={this.updateState}>
                    <option disabled value="" selected> Select Strategy</option>
                    {optionStrategies}
                </select>
                </div>
            
             <label>Select Order Action</label>
                <select name="action" id="action" required onChange={this.updateState}>
                    <option disabled value="" selected> Select Action</option>
                    <option>BUY</option>
                    <option>SELL</option>
                </select>
            
             <label>Select Risk Allocation Profile</label>
                <select name="risk" id ="risk"  required onChange={this.updateState}>
                    <option disabled value="" selected> Select Action</option>
                    {riskProfile}
                </select>
                <button onClick={()=>this.props.saveOrder(this.state)}>Save</button>
       
    </div>



        </>)
    }
}export default OrderEditor