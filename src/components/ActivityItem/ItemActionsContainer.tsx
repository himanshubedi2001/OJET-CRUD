import { h } from "preact";
import "ojs/ojbutton";
import { useState, useEffect } from "preact/hooks";

type Props = {
    create: () => void;
    edit: () => void;
    itemSelected: Partial<Item>;
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

const ItemActionsContainer = (props: Props) => {
    const [hideActions, setHideActions] = useState<boolean>(true);

    if (props.itemSelected?.id) {
        console.log("Selected: " + JSON.stringify(props.itemSelected));
    }

    useEffect(() => {
        if (props.itemSelected?.id) {
            setHideActions(false);
        } else {
            setHideActions(true);
        }
    }, [props.itemSelected]);

    return (
        <div>
     <oj-button id="createButton" onojAction={props.create}>Create</oj-button>
     <oj-button id="updateButton" disabled={hideActions} onojAction={props.edit}>Update</oj-button>
        </div>
        
    );
};

export default ItemActionsContainer;
