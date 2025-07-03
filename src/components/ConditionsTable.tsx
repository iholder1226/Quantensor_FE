"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import { colorSchemeDark } from "ag-grid-community";
import type {Strategy, Condition,ConditionSet,Indicator}from '../TypeDefinitions/TypeDefinitions.ts';
import CustomAGHeader from './CustomAGHeader'; 
import {
  ClientSideRowModelModule,
  type ColDef,
  type ColGroupDef,
  type GetRowIdFunc,
  type GetRowIdParams,
  type GridApi,
  type GridOptions,
  ModuleRegistry,
  type RowSelectedEvent,
  RowSelectionModule,
  type RowSelectionOptions,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
  ValidationModule,
  type ValueFormatterParams,
} from "ag-grid-community";
ModuleRegistry.registerModules([
  RowSelectionModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);


type tblProps={
    conditions:ConditionSet,
    onNewCondition:()=>void,
    onDeleteSet:(sequenceIndex:number,setIndex:number)=>void,
    sequenceIndex:number,
    setIndex:number,
}

  const ConditionsTable = (props:tblProps) => {
  console.log("Condition Table Props: "+ props.conditions);
  const gridRef = useRef<AgGridReact<Condition>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  console.log(props.conditions);
  const [rowData, setRowData] = useState<Condition[]>(props.conditions.conditionSet/*[
    { Indicator: "MACD", Interval: "Daily", ActivationState: "BULLISH CROSSING" },
    {Indicator: "RSI", Interval: "Daily", ActivationState: "OVER BOUGHT"  },
    { Indicator: "BOLLINGER", Interval: "Daily", ActivationState: "BREAKOUT" },
     { Indicator: "CANDLE PATTERN", Interval: "Daily", ActivationState: "EVENING STAR" },
  ]*/);
  const newCondition= ()=>{
    alert("Handler Called");
    props.onNewCondition();
  }
  const newConditionBtn =() =>{
    return <button onClick={()=>{props.onNewCondition()}}>+</button>;
  }
  const deleteSetBtn = () =>{
    return <button onClick={()=>{props.onDeleteSet(props.sequenceIndex,props.setIndex)}}>X</button>
  }
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Indicator", field: "indicator" },
    { headerName: "Interval", field: "interval" },
    {headerName: "Activation State", field: "activationState"},
  /*  {field:"button",cellRenderer:newConditionBtn,flex:1}*/
   /* {headerName: "Action",
      field: "action",
      headerComponentParams: {
      template:'<button onClick={()=>{props.onNewCondition()}}>Add Condition</button>'//'<button onclick={newCondition}>+</button>'
    }},
     { 
      field: 'make', 
      headerName: 'Make', 
      headerComponent: CustomAGHeader // Use your custom header here
    },*/
    {field:'Add condition',
     headerComponent:newConditionBtn,
    },
    {field:'Delete Sets',
     headerComponent:deleteSetBtn,
    }
  ]);

  
 /* const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
    };
  }, []);*/
  
  const context = useMemo(() => {
    return {
     
    } 
  }, []);
 /* const getRowId = useCallback((params: GetRowIdParams<Condition>) => {
    // params.data : ICar
    return params.data.indicator, params.data.interval,params.data.activation_state;
  }, []);*/

  const onRowSelected = useCallback(
    (event: RowSelectedEvent<Condition, null>) => {
      // event.data: ICar | undefined
    /*  if (event.data && event.node.isSelected()) {
        const price = event.data.price;
        // event.context: IContext
        const discountRate = event.context.discount;
        console.log("Price with 10% discount:", price * discountRate);
      }*/
    },
    [],
  );

  const onShowSelection = useCallback(() => {
    // api.getSelectedRows() : ICar[]
    const conditions: Condition[] = gridRef.current!.api.getSelectedRows();
    console.log(
      "Selected cars are",
      conditions.map((c) => `${c.indicator} ${c.interval}`),
    );
  }, []);

  return (
   
    
        

        <div style={gridStyle} >
          <AgGridReact<Condition>
            ref={gridRef}
            rowData={props.conditions.conditionSet}//{rowData}
            columnDefs={columnDefs}
           // rowSelection={rowSelection}
            context={context}
          //  getRowId={getRowId}
            //onRowSelected={onRowSelected}
            theme={themeQuartz.withPart(colorSchemeDark)}
          />
         
        </div>
     
   
  );
};export default ConditionsTable;
/*
const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GridExample />
  </StrictMode>,
);*/