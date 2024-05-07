import { h, ComponentProps } from "preact";
import "ojs/ojlabel";
import "ojs/ojselectsingle";
import { ojSelectSingle } from "ojs/ojselectsingle";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import { useState, useEffect, useRef } from "preact/hooks";
import * as storeData from "text!../storeData.json";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
type Props = {
  item?: Item | null;
};

type Item = {
  id: number;
  name: string;
  short_desc?: string;
  price?: number;
  quantity?: number;
  quantity_shipped?: number;
  quantity_instock?: number;
  activity_id?: number;
  image?: string;
};





const ItemDetailContainer = (props: Props) => {

  type Activity = {
    id: number;
    name: string;
  }
  const activityDataProvider = new MutableArrayDataProvider<Activity["id"], Activity>(
    JSON.parse(storeData),
    {
      keyAttributes: "id"
    }
  );
  type ChartProps = ComponentProps<"oj-chart">;
  type ListViewProps = ComponentProps<"oj-list-view">;
  const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };

  // const [selectedChartType, setSelectedChartType] = useState("bar" as ChartProps["type"]);

  type ChartItem = {
    id: number;
    series: string;
    group: string;
    value: number;
  };

 


  // const valChangeHandler = (e: ojSelectSingle.valueChanged<chartType["value"], chartType>) => {
  //   setSelectedChartType(e.detail.value as ChartProps["type"]);
  // }

  const chartTypesDPData = [
    { value: 'pie', label: 'Pie Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area', label: 'Area Chart' }
    // Add more options as needed
  ];
  const dataProvider = new MutableArrayDataProvider(chartTypesDPData, {
    keyAttributes: "value"
  });
  const chartTypesDP = new MutableArrayDataProvider(chartTypesDPData, { keyAttributes: "value" });

  const chartData = [
    { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
    { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
    { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
    { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
    { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
    { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
    { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
    { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
  ]
  const chartDataProvider = new MutableArrayDataProvider(chartData, { keyAttributes: "value" });



  const chartItem = (
    item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>
  ) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[0]}
        seriesId={item.data.series}
      ></oj-chart-item>
    );
  };

  const pieDataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem> = new MutableArrayDataProvider(
    [
      { series: "Quantity in Stock", value: props.item?.quantity_instock },
      { series: "Quantity shipped", value: props.item?.quantity_shipped },
    ],
    { keyAttributes: "id" }
  );
  
  console.log("props\n", props);

  return (
    <div id="itemDetailsContainer"
      class="oj-flex-item oj-bg-neutral-30 oj-sm-padding-4x-start oj-md-6 oj-sm-12">

      <h3>Item Details</h3>
      {/* <oj-label for="basicSelect">Select Chart:</oj-label>
    <oj-select-single
      id="basicSelect"
      class="selectSingleStyle"
      data={chartTypesDP}
      value={selectedChartType}
      onvalueChanged={valChangeHandler}
    ></oj-select-single> */}
  

      <hr class="hr-margin" />
      <oj-avatar role="img" size="lg" aria-label={"product image for" + props.item?.name}
        src={props.item?.image?.replace("css", "styles")} class="float-right"></oj-avatar>
      <div id="itemName" class="data-name">{props.item?.name}</div>
      <div id="itemDesc" class="data-desc">{props.item?.short_desc}</div>
      <div id="itemPrice">{"Price: " + props.item?.price + " each"}</div>
      <div id="itemId">{"Item Id: " + props.item?.id}</div>

      {/* <oj-chart
        id="barChart"
        type={selectedChartType}
        data={chartDataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        class="chartStyle"
      ><template slot="itemTemplate" render={chartItem}></template></oj-chart> */}

<div>
  <oj-chart id="pieChart" type="pie" data={pieDataProvider} animationOnDisplay="auto"
            animationOnDataChange="auto" hoverBehavior="dim" class="chartStyle">
    <template slot="itemTemplate" render={chartItem}></template>
    </oj-chart>
   </div>

      
    </div>
  );
};

export default ItemDetailContainer;
