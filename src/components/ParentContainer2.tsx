import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItem/ActivityItemContainer";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as storeData from "text!./storeData.json";
import { useState, useEffect, useCallback } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import { TextFilter } from "ojs/ojdataprovider";

type Props = {
    activity: Item | null;
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

  const baseServiceUrl =
  "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";
  
  type ActivityItem = {
    id: number;
    name: string;
    items: Array<Item>;
    short_desc: string;
    image: string;
  };
  



// const activityData = JSON.parse(storeData);
// let activityItemsArray = activityData[0].items

// const INIT_DATAPROVIDER = new MutableArrayDataProvider<ActivityItem["id"], ActivityItem>(activityItemsArray, {
//   keyAttributes: "id",
// });

// useEffect(() => {
//   let actID = (props.activity!.id) - 1;
//   let activityItemsArray = activityData[actID].items;
//   setactivityItemDP(
//     new MutableArrayDataProvider<ActivityItem["id"], ActivityItem>(activityItemsArray, {
//       keyAttributes: "id",
//     })
//   );
// }, [props.activity]);

let INIT_DATAPROVIDER = new RESTDataProvider<ActivityItem["id"], ActivityItem>({
  keyAttributes: "id",
  url: baseServiceUrl,
  transforms: {
     fetchFirst: {
        request: null!,
        response: (): any => {
        return { data: [] };
        },
     },
   },
  });


const ParentContainer2 = (props:Props) => {




const [selectedItemVal, setSelectedItemVal] = useState<Item | null>(null);
const [activityItemDP, setactivityItemDP] = useState(INIT_DATAPROVIDER);

const activityItemChangeHandler = useCallback(
  (item: Item) => {
    setSelectedItemVal(item);
  },
  []
);

useEffect(() => {
  setactivityItemDP(
     new RESTDataProvider<ActivityItem["id"], ActivityItem>({
     keyAttributes: "id",
     capabilities: {
        filter: {
           textFilter: true,
        },
     },
     url: baseServiceUrl + "/" + props.activity?.id + "/items/",
     textFilterAttributes: ["name"],
     transforms: {
        fetchFirst: {
           request: async (options) => {
           const url = new URL(options.url);
           const { size, offset } = options.fetchParameters;
           url.searchParams.set("limit", String(size));
           url.searchParams.set("offset", String(offset));
           const filterCriterion = options.fetchParameters.filterCriterion as TextFilter<Item>;
           const { textFilterAttributes } = options.fetchOptions;
           if (
              filterCriterion &&
              filterCriterion.text &&
              textFilterAttributes
           ) {
              const { text } = filterCriterion;
              textFilterAttributes.forEach((attribute) => {
                 url.searchParams.set(attribute, text);
              });
           }

           return new Request(url.href);
           },
           response: async ({ body }) => {
           const { items, totalSize, hasMore } = body;
           return { data: items, totalSize, hasMore };
           },
        },
     },
     })
  );
}, [props.activity]);        

const showItems = useCallback(() => {
  return selectedItemVal === null ? false : true;
},[selectedItemVal]);


  
    return (
        <div id="parentContainer2" class="oj-flex oj-flex-item oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12 oj-bg-success-20">
        <ActivityItemContainer selectedActivity={props.activity} data={activityItemDP} onItemChanged={activityItemChangeHandler} />
        {showItems() && (
          <ItemDetailContainer item={selectedItemVal} />
        )}
        {!showItems() && (
          <h4 class="oj-typography-subheading-sm">
            Select activity item to see details
          </h4>
        )}
      </div>
      
      
    );
  };

  export default ParentContainer2;
