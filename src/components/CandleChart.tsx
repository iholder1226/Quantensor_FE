

import React, { Component, type ChangeEvent, type KeyboardEvent } from 'react';
import '../styles/chart.css'
import CandleComponent from './CandleComponent'
/*type CandleChartProps = {
    chartHeight: number,
    chartWidth: number
}*/
type CandleChartState ={
            dataBounds : {
                maxHigh:1,
                minLow:1000000,   
            },
            dataRange: {
                rangeHigh:number,
                rangeLow:number,
                range:number
            },
            chartDimensions : {
                chartWidth:number,//his.props.chartWidth,
                chartHeight:number,//this.props.chartHeight,
            },
            candles:Candle[],
            set:CandleComponent[],
            isLoaded:boolean,
            selectedCandle:Candle, 
            ticker:string,
            interval:string,
            alphaUri :"",
            localUri :"",
}
 type Candle = {
    open:number,
    close:number,
    high:number,
    low:number,
    volume:number,
    date:string,
 }
 //function CandleChart(){
class CandleChart extends React.Component<any,CandleChartState> {
    
   constructor(props:any){
        super(props);
        
       
        this.mouseOver = this.mouseOver.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.drawIndicator = this.drawIndicator.bind(this);
       
        let c:Candle={
            open:0,
            close:0,
            high:0,
            low:0,
            volume:0,
            date:"",
        };
        this.state = {
            dataBounds : {
                maxHigh:1,
                minLow:1000000,   
            },
            dataRange: {
                rangeHigh:0,
                rangeLow:0,
                range:0
            },
            chartDimensions : {
                chartWidth:0,//this.props.chartWidth,
                chartHeight:0//this.props.chartHeight,
            },
            candles:[],
            set:[],
            isLoaded:false,
            selectedCandle:c,//null,//new Candle() , 
            ticker:'SPY',
            interval:'sixty_min',
            alphaUri :"",
            localUri :"",
        }
      
    }  

    
fetchAPIData = async(uri:string)=>{
    
        this.setState({
            candles:new Array<Candle>(),
            
        })
        
        const responseAvailable = false;
        let candleSet: Candle[] = new Array();
        let alphaResponse = []
        let high = 1;
        let low = 100000000;
        
            
        console.log("fetch uri:"+uri);     
        fetch(uri, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => { 
            if(response.ok){
                candleSet = new Array();

                return response.json()    
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(data => {
        
            
            //alphaResponse = data["Time Series (60min)"]; 
            //console.log("Data:"+ alphaResponse);
            //const map = new Map(Object.entries(alphaResponse));
           
            const map = new Map<string,any>(Object.entries(data));
            for (let [key, value] of map) {
                let candle = {
                    "open" :parseFloat(value["open"]),
                    "close":parseFloat(value["close"]),
                    "high":parseFloat(value["high"]),
                    "low":parseFloat(value["low"]),
                    "volume":parseFloat(value["volume"]),
                    "date":value["date"]
                } 
               /* if(candle.high>high){
                        high = candle.high;
                }if(candle.low<low){
                    low = candle.low;
                } */
                if(candle.open>high){
                        high = candle.open;
                }if(candle.close>high){
                        high = candle.close;
                }if(candle.open<low){
                    low = candle.open;
                }if(candle.close<low){
                        low = candle.low;
                } 
                candleSet.push(candle);            
            }
            let chart:HTMLDivElement = document.getElementById('candleChart') as HTMLDivElement;
            let dpr = window.devicePixelRatio;
            let width:number = chart.offsetWidth;//*dpr;
            let height:number = chart.offsetHeight;//*dpr; 
            console.log("chart height:"+{height});
            console.log("chart width:"+{width});
            let r = high - low;
            if(chart !=null){
                this.setState({
                        dataRange:{
                            rangeHigh: high,
                            rangeLow : low,
                            range:r
                        },
                        chartDimensions:{
                            chartHeight :height,//this.props.chartHeight,//height,
                            chartWidth:width,//this.props.chartWidth//chart.offsetWidth//chart.width
                        },
                        
                        candles:candleSet,
                        isLoaded:true      
                })
            }
            
        })
        .catch(err => {
            console.log(err);
        });                        
    }

    keyHandler(event:KeyboardEvent){
        
        if(event.key === "Enter"){
            let t:HTMLInputElement = document.getElementById('tickerInput') as HTMLInputElement;
            let i:HTMLSelectElement = document.getElementById('intervalSelector') as HTMLSelectElement;
            this.setState({
                ticker: t.value ,
                interval: i.value,
            } );
            let uri = "http://localhost:8081/series/"+t.value+"/timeseries/"+i.value;
            this.fetchAPIData(uri);
        }        
    }

    selectHandler(event:ChangeEvent<HTMLSelectElement>){
        let t:HTMLInputElement = document.getElementById('tickerInput') as HTMLInputElement;
        let i:HTMLSelectElement = document.getElementById('intervalSelector') as HTMLSelectElement;
        this.setState({
            ticker: t.value ,
            interval: event.target.value
        } );
        
        let uri = "http://localhost:8081/series/"+t.value+"/timeseries/"+i.value;
        this.fetchAPIData(uri);
    } 

    mouseOver = (o:number,c:number,h:number,l:number,v:number,d:string):void => {
            this.setState({
                selectedCandle:{
                    open: o,
                    close: c,
                    high: h,
                    low: l,
                    volume:v,
                    date:d
            } 
        })
        
    }
    
    resize(){
        alert("Resized");
        let t:HTMLInputElement = document.getElementById('tickerInput') as HTMLInputElement;
        let i:HTMLSelectElement = document.getElementById('intervalSelector') as HTMLSelectElement;
        let uri = "http://localhost:8081/series/"+t.value+"/timeseries/"+i.value;
        this.fetchAPIData(uri);
    }
        
    componentDidMount(){
       
        

         let c:Candle={
            open:0,
            close:0,
            high:0,
            low:0,
            volume:0,
            date:"",
        };
        this.setState ( {
            dataBounds : {
                maxHigh:1,
                minLow:1000000,   
            },
            dataRange: {
                rangeHigh:0,
                rangeLow:0,
                range:0
            },
            chartDimensions : {
                chartWidth:0,//this.props.chartWidth,
                chartHeight:0//this.props.chartHeight,
            },
            candles:[],
            set:[],
            isLoaded:false,
            selectedCandle:c,//null,//new Candle() , 
            ticker:'SPY',
            interval:'sixty_min',
            alphaUri :"",
            localUri :"",
        })
        let uri = "http://localhost:8081/series/"+this.state.ticker+"/timeseries/"+this.state.interval;
        this.fetchAPIData(uri);
       // this.drawIndicator();
                    
    }
    drawIndicator(){
        let dpr = window.devicePixelRatio;
        let canvas:HTMLCanvasElement = document.getElementById('indicator') as HTMLCanvasElement;
        if(canvas != null){
            //let ctx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
            let ctx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.strokeStyle = "#fffff0";
            
            // Start a new Path
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(300, 150);
            ctx.lineWidth = .1*dpr;
            // Draw the Path
            ctx.stroke();
        }
         //ctx.fill();
    }
    render() {
        
        const set = Object.entries(this.state.candles).map(
            ([key,candle])=>
            
            <CandleComponent  key={key}id={candle.date} o={candle.open} c={candle.close} h={candle.high} l={candle.low} 
            v = {candle.volume} d={candle.date} range={this.state.dataRange.range} rangeHigh={this.state.dataRange.rangeHigh} 
            rangeLow={this.state.dataRange.rangeLow }chartHeight={this.state.chartDimensions.chartHeight}
            chartWidth= {this.state.chartDimensions.chartWidth}
            onMouseOver={this.mouseOver}
            onResize = {this.resize}
            
            ></CandleComponent>
            
        );
        
        return (
        <>   
        <div className="chartController">
            <label>Ticker: </label><input id="tickerInput" type="text" defaultValue="SPY" onKeyDown={this.keyHandler} />
            
            <select id="intervalSelector" name="Interval" onChange={this.selectHandler} required >
                <option disabled  > Select a Time Interval </option>
                <option value="one_min">1 Minute</option>
                <option value="five_min">5 Minutes</option>
                <option value="fifteen_min">15 Minutes</option>
                <option value="sixty_min" selected>1 Hour</option>
                <option value="4h">4 Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <ul>
                <li>O: {this.state.selectedCandle.open}</li>
                <li>C: {this.state.selectedCandle.close}</li>
                <li>H: {this.state.selectedCandle.high}</li>
                <li>L: {this.state.selectedCandle.low}</li>
                <li>V: {this.state.selectedCandle.volume}</li>
                <li>D: {this.state.selectedCandle.date}</li>
            </ul>
        
        </div>
        
         <div id="candleChart" >
            
            {set}  
         </div>
        
              
        </>   
            
        );
    }
}
export default CandleChart
     
    
   
