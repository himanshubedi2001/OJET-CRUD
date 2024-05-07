import { h } from "preact";
import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as storeData from "text!./storeData.json";
import { useState } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider";

let keyAttributes: string = "id";
// REST endpoint that returns Activity data
const restServerURLActivities: string =
      "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

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

let INIT_SELECTEDACTIVITY: Item | null = null;


const ParentContainer1 = () => {

  type Activity = {
    id: number;
    name: string;
    short_desc: string;
};

// const ActivityDataProvider = new MutableArrayDataProvider<Activity["id"], Activity>(JSON.parse(storeData), {
//   keyAttributes: "id",
// });


// https://www.oracle.com/webfolder/technetwork/jet/jsdocs/RESTDataProvider.html

const activityDataProvider = new RESTDataProvider<Activity["id"], Activity>({
  keyAttributes: keyAttributes,
  url: restServerURLActivities,
  transforms: {
     fetchFirst: {
        request: async (options) => {
          console.log("options \n ", options);
           const url = new URL(options.url);
           console.log("url 1" ,url);
           const { size, offset } = options.fetchParameters;
           url.searchParams.set("limit", String(size));
           url.searchParams.set("offset", String(offset));
           console.log("url 2" ,url);
        return new Request(url.href);
        },
        response: async ({ body }) => {
           const { items, totalSize, hasMore } = body;
           console.log("result \n ", items,totalSize,hasMore);
           return { data: items, totalSize, hasMore };
        },
     },
  },
});

const [selectedActivity, setSelectedActivity] = useState(
  INIT_SELECTEDACTIVITY
);

const showActivityItems = () => {
  return selectedActivity != null ? true : false;
};

const activityChangedHandler = (value: Item) => {
  setSelectedActivity(value);
};


    return (
      <div id="parentContainer1" class="oj-flex oj-flex-init oj-panel oj-bg-warning-20">
        <ActivityContainer data={activityDataProvider} onActiivityChanged={activityChangedHandler} />

        {showActivityItems() && (
      <ParentContainer2 activity={selectedActivity} />
     )}
     
     {!showActivityItems() && (
      <h4 class="oj-typography-subheading-sm">
        Select activity to view items
      </h4>
    )}
      </div>
    );
  };
export default ParentContainer1;  