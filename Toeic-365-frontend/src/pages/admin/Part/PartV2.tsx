import React from "react";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import * as partApi from "../../../apis/PartApi";

// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// @ts-ignore
import {CKEditor} from "@ckeditor/ckeditor5-react";

export default class PartV2 extends React.Component<any, any> {
    private toast: any = null;
    private selectedParts: any = null;
    private globalFilter: any = null;
    private setGlobalFilter: any = null;
    private part: any = {
        numberPart: "",
        name: "",
        groupQuestionDesc: "",
    };
    private setPart: any = null;
    private setParts: Array<any> = [];
    private dt: any = null;
    private setSubmitted = false;
    private setPartDialog = false;
    private setDeleteProductsDialog = false;
    private partDialog = false;
    constructor(props: any) {
        super(props);
        this.state = {
            parts: [],
        }
    }

    componentWillMount() {
        partApi.getAllParts().then((res) => {
            this.setState({
                parts: res.data
            });
        });
    }

    private hideDialog = () => {
        this.setSubmitted = false;
        this.setPartDialog = false;
    };

    private header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Parts</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e: any) => {
                    this.setGlobalFilter = e.value
                }} placeholder="Search..."/>
            </span>
        </div>
    );
    private savePart = (e: any) => {
        e.preventDefault();

        const partRequest = this.part;

        partApi
            .createPart(partRequest)
            .then(() => {
                // @ts-ignore
                toast.current.show({severity: "success", summary: "Successful", detail: "Part Created", life: 3000});
            })
            .catch();

        this.setPartDialog = false;
        this.setPart = {
            numberPart: "",
            name: "",
            groupQuestionDesc: "",
        };
    };

    private openNew = () => {
        this.setSubmitted = false;
        this.setPartDialog = true;
    };

    private confirmDeleteSelected= () => {
        this.setDeleteProductsDialog = true;
    };



    private leftToolbarTemplate= () => {
        const _this = this;
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger"
                        onClick={_this.confirmDeleteSelected}/>
            </React.Fragment>
        );
    };

    private nameBodyTemplate = (rowData: any) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                <b>{rowData.name}</b>
            </>
        );
    };

    private actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"/>
            </div>
        );
    };

    private onInputChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || "";
        let _part = {...this.part};
        // @ts-ignore
        _part[`${name}`] = val;

        this.setPart = _part;
    };

    private handleChangeDescription = (e: any, editor: any, name: any) =>  {
        const val = editor.getData() || "";
        let _part = {...this.part};
        // @ts-ignore
        _part[`${name}`] = val;
        this.setPart = _part;

        console.log(val);
    };

    private handle = () => {
    }

    private formatDescription = (rowData: any) => {
        return <div dangerouslySetInnerHTML={{__html: rowData.description}} />;
    }

    private partDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.savePart}/>
        </>
    );
    render= () => {
        return (
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <div className="card">
                        <Toast ref={this.toast}/>
                        <Toolbar className="p-mb-4" left={this.leftToolbarTemplate}></Toolbar>

                        <DataTable
                            ref={this.dt}
                            value={this.state.parts}
                            selection={this.selectedParts}
                            onSelectionChange={(e) => {
                                this.selectedParts = e.value
                            }}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            globalFilter={this.globalFilter}
                            emptyMessage="No parts found."
                            header={this.header}
                        >
                            <Column selectionMode="multiple" headerStyle={{width: "3rem"}}></Column>
                            <Column field="numberPart" header="numberPart" sortable></Column>
                            <Column field="name" header="Name" sortable body={this.nameBodyTemplate}></Column>
                            <Column field="description" header="Description" body={this.formatDescription} sortable></Column>
                            <Column body={this.actionBodyTemplate}></Column>
                        </DataTable>

                        <Dialog visible={this.partDialog} style={{width: "450px"}} header="Part Details" modal
                                className="p-fluid" footer={this.partDialogFooter} onHide={this.hideDialog}>
                            <div className="p-field">
                                <label htmlFor="numberPart">Number Part</label>
                                <InputText id="numberPart" onChange={(e) => this.onInputChange(e, "numberPart")}
                                           required
                                           autoFocus/>
                            </div>
                            <div className="p-field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" onChange={(e) => this.onInputChange(e, "name")}/>
                            </div>
                            <CKEditor editor={ClassicEditor} id="description" name="description"
                                      onChange={(e: any, editor: any) => this.handleChangeDescription(e, editor, "description")}/>
                        </Dialog>

                        <Dialog style={{width: "450px"}} header="Confirm" modal onHide={this.handle}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: "2rem"}}/>
                                {<span>Are you sure you want to delete <b>{}</b>?</span>}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}