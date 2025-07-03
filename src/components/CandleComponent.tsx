import React, { Component } from 'react';
import '../styles/candle.css'
    
type CandleProps = {
            id:string,
            o:number,
            c:number,
            h:number,
            l:number,
            v:number,
            d:string,
            rangeLow:number,
            rangeHigh:number,
            range:number,
            chartHeight:number,
            chartWidth:number,
            onMouseOver:(o:number,c:number,h:number,l:number,v:number,d:string)=>void,  
            onResize:()=>void
}
type CandleCompoenentState = {
    chartWidth:number,
    chartHeight:number,
}
class CandleComponent extends React.Component<CandleProps,CandleCompoenentState>{
    
    constructor(props:CandleProps){
            
        super(props);
        
        this.state = {
            
                chartWidth:0,
                chartHeight:0,
            
        }
    }
        
    componentDidMount(){
         this.setState({
            chartWidth:this.props.chartWidth,
            chartHeight:this.props.chartHeight,
        })
        let dpr = window.devicePixelRatio;
        let canvas:HTMLCanvasElement = document.getElementById(this.props.id)as HTMLCanvasElement;
        let ctx:CanvasRenderingContext2D  = canvas.getContext("2d") as CanvasRenderingContext2D ;
        let chartPadding = 50;

        //test
        let rect = canvas.getBoundingClientRect();
        canvas.width = (rect.width)*dpr;
        canvas.height = (rect.height)*dpr
        ctx.scale(dpr,dpr);
        //let chartHeight =(canvas.offsetHeight)*dpr;
        let chartHeight =(this.props.chartHeight)*dpr;
        canvas.setAttribute('height',chartHeight.toString());

        //let chartWidth =(this.props.chartWidth)*dpr;
        //canvas.setAttribute('width',chartWidth.toString());
        

        let scale = ((this.props.chartHeight-chartPadding)/(this.props.range))*dpr;
        let y = 0;
        let candleHeight = 0;

        if(this.props.c < this.props.o){
            ctx.fillStyle = "#ff0000";
            
            y = (chartHeight-chartPadding)-scale*(this.props.o-this.props.rangeLow); 
            candleHeight = scale*(this.props.o-this.props.c);
                
            ctx.fillRect(0,y,canvas.width,candleHeight);
            ctx.stroke();
            
        }else{
            
            y = chartHeight-chartPadding -scale*(this.props.c-this.props.rangeLow); 
            candleHeight = scale*(this.props.c-this.props.o);
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(0,y,canvas.width,candleHeight);
            ctx.stroke();
                
        }
        //draw wick 
        let wickWidth = 1;
        y = chartHeight-chartPadding-scale*(this.props.h-this.props.rangeLow);
        let x = scale*(this.props.h - this.props.l);
        ctx.fillRect(canvas.width/2, y,wickWidth,x);
        
      /*  this.setState({
            chartWidth:this.props.chartWidth,
            chartHeight:this.props.chartHeight,
        })
        let dpr:number = window.devicePixelRatio;
        let canvas:HTMLCanvasElement = document.getElementById(this.props.id)as HTMLCanvasElement;
        if(canvas != null){
            let ctx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
            //let chartPadding = 50;// this.state.chartHeight*.05;
            
            //let chartHeight =(canvas.offsetHeight)*dpr;
            console.log("Candle height received:"+this.props.chartHeight);
            console.log("Candle width received:"+this.props.chartWidth);
            console.log("range received:"+this.props.range);
            console.log("range low received:"+this.props.rangeLow);
            console.log("range high received:"+this.props.rangeHigh);
            let chartHeight:number = this.props.chartHeight*dpr;
           // canvas.setAttribute('height',this.props.chartHeight.toString());
           // canvas.setAttribute('width',this.props.chartWidth.toString());

            const scale:number = ((this.props.chartHeight)/(this.props.range)*dpr);
            console.log("Scale calculated:"+scale);
            let y:number = 0;
            let candleHeight:number = 0;

            if(this.props.c < this.props.o){
                ctx.fillStyle = "#ff0000";
                //y = 0;//(this.props.o-this.props.c);
                y = chartHeight - scale*(this.props.o-this.props.rangeLow); 
                candleHeight = scale*(this.props.o-this.props.c);
                console.log("y calculated:"+y);
                console.log("candleHeight:"+candleHeight);
                ctx.fillRect(0,y,canvas.width,candleHeight);
                ctx.stroke();
            
            }else{
                //y = 0;//this.props.c-this.props.o);
                y =  chartHeight-(scale*(this.props.c-this.props.rangeLow)); 
                candleHeight = scale*(this.props.c-this.props.o);
                console.log("y calculated:"+y);
                console.log("candleHeight:"+candleHeight);
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(0,y,canvas.width,(candleHeight));
                ctx.stroke();
                    
            }
            //draw wick 
            let wickWidth = 15;
            y = chartHeight-scale*(this.props.h-this.props.rangeLow);
            let x = scale*(this.props.h - this.props.l);
            ctx.fillRect(canvas.width/2, y,wickWidth,x);
        }*/
        
    }

   /* setSelectedCandle(){
        this.setSelected.selectedCandle.o =this.props.o;
        
    }*/


    render(){
      
        //let cvs = {height:100}
        return(
            <>
            <canvas className="Candle" id = {this.props.id } /*style={cvs} */ onMouseOver={() =>this.props.onMouseOver(
                this.props.o,
                this.props.c,
                this.props.h,
                this.props.l,
                this.props.v,
                this.props.d
            )}></canvas>
            </>
        );  
    }    
}
   
export default CandleComponent