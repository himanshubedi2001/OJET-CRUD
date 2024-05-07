import { h } from "preact";
import "ojs/ojdialog";
import { ojDialog } from "ojs/ojdialog";
import { MutableRef, useRef, useEffect, useState } from "preact/hooks"

type Item = {
    name?: string | undefined;
    short_desc?: string;
    price?: number;
    quantity_shipped?: number;
    quantity_instock?: number;
};

type Props = {
    isOpened: boolean;
    closeDialog: (ref: MutableRef<ojDialog>, type: string) => void;
    createNewItem: (data: Partial<Item>, ref: MutableRef<ojDialog>) => void;
};


const CreateNewItemDialog = (props: Props) => {
    const createDialogRef = useRef<ojDialog>(null);
    const closeDialog = () => {
        props.closeDialog(createDialogRef as MutableRef<ojDialog>, "create");
    }

    useEffect(() => {
        props.isOpened
            ? createDialogRef.current?.open()
            : createDialogRef.current?.close();
    }, [props.isOpened]);


    const [formData, setFormData] = useState<Partial<Item>>({});

    const onChangeHandler = (event: any) => {
        setFormData({
            ...formData,
            [event.currentTarget.id]: event.detail.value,
        });
    }

    const createItem = () => {
        console.log("data: " + JSON.stringify(formData));
        props.createNewItem(formData, createDialogRef as MutableRef<ojDialog>);
     };

    return (
        <span>
            <oj-dialog id="createDialog" ref={createDialogRef} dialogTitle="Create New Item" onojClose={closeDialog} cancelBehavior="icon">
                <div slot="body">
                    <oj-form-layout>
                        <oj-input-text id="name" labelHint="Name" onvalueChanged={onChangeHandler}></oj-input-text>
                        <oj-input-text id="price" labelHint="Price" onvalueChanged={onChangeHandler}></oj-input-text>
                        <oj-input-text id="short_desc" labelHint="Description" onvalueChanged={onChangeHandler}></oj-input-text>
                        <oj-input-text id="quantity_instock" labelHint="Quantity: In-Stock" onvalueChanged={onChangeHandler}></oj-input-text>
                        <oj-input-text id="quantity_shipped" labelHint="Quantity: Shipped" onvalueChanged={onChangeHandler}></oj-input-text>
                    </oj-form-layout>
                </div>
                <div slot="footer">
                    <oj-button id="submitBtn" onojAction={createItem}>Submit</oj-button>
                </div>
            </oj-dialog>
        </span>
    );
};

export default CreateNewItemDialog;
