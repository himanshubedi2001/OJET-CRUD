import { h, ComponentProps } from "preact";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { useMemo } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider"

type Props = {
  data?: RESTDataProvider<Activity["id"], Activity>;
  // data?: MutableArrayDataProvider<Activity["id"], Activity>;
  value?: string;
  onActiivityChanged: (value: Item) => void;
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


type Activity = {
  id: number;
  name: string;
  short_desc: string;
};

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  console.log(item);
  let image = item.data.image.replace("css", "styles");
   
  console.log("image",image);
  return (
    
    <div class="oj-flex no-wrap">
     
      <span class="demo-thumbnail oj-flex-item" style={"background-image:url("  + image + ")"}></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = { fetchSize: 5 };




const ActivityContainer = (props: Props) => {

  console.log("Activity container function \n",props);
  const selectedActivityChanged = (
    event: ojListView.firstSelectedItemChanged<Item["id"], Item>
  ) => {
    props.onActiivityChanged(event.detail.value.data);
  };

  const activityValue = useMemo(() => {
    return new KeySetImpl([props.value]) as KeySet<Activity["name"]>;
  }, [props.value]);
  console.log(props.value,"Acttivity contaiber debug");
  console.log("Activity value\n",activityValue);
  
  return (
    <div id="activitiesContainer" class="oj-flex-item oj-bg-info-30 oj-sm-padding-4x-start oj-md-4 oj-sm-12">
      <h3 id="activitiesHeader">Activities</h3>
      <oj-list-view id="activitiesList" class="item-display" aria-labelledby="activitiesHeader" 
                    data={props.data} gridlines={gridlinesItemVisible} selectionMode="single" 
                    scrollPolicy="loadMoreOnScroll" scrollPolicyOptions={scrollPolicyOpts} selected ={activityValue}
                    onfirstSelectedItemChanged={selectedActivityChanged}
                    >
        <template slot="itemTemplate" render={listItemRenderer}></template>
      </oj-list-view>
    </div>
  );
};

export default ActivityContainer;