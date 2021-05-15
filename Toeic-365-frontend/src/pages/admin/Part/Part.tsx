import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Dropdown} from "primereact/dropdown";
import classNames from "classnames";

import * as PartApi from "../../../apis/PartApi";

export const Part = () => {

    let initialPart = {
        id: null,
        numberPart: "",
        partName: "",
        partDesc: "",
    };

    const partNameValues = [
        { partName: 'Part I: Picture Description' },
        { partName: 'Part II: Question - Response' },
        { partName: 'Part III: Short Conversations' },
        { partName: 'Part IV: Short Talks' },
        { partName: 'Part V: Incomplete Sentences' },
        { partName: 'Part VI: Incomplete Sentences' },
        { partName: 'Part VII: Reading Comprehension' },
    ];

    const toast = useRef(null);
    const data = useRef(null);

    const [part, setPart]: any = useState(initialPart);
    const [parts, setParts]: any = useState(null);
    const [partDialog, setPartDialog] = useState(false);
    const [deletePartDialog, setDeletePartDialog] = useState(false);
    const [selectedParts, setSelectedParts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [partNameValue, setPartNameValue]: any = useState(null);
    const [type, setType] = useState("create");
    const [isUpdate, setIsUpdate] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        const getAllParts = async () => {
            try {
                const response = await PartApi.getAllParts();
                setIsLoading(false);
                setParts(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllParts();
    }, []);

    const openNew = () => {
        setSubmitted(false);
        setPart(initialPart);
        setPartDialog(true);
        setPartNameValue(null);
        setType("create");
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPartDialog(false);
        setPartNameValue(null)
    };

    const savePart = (e: any) => {
        e.preventDefault();

        setSubmitted(true);

        if (part.numberPart.trim() && part.partName && part.partDesc.trim()) {
            let _parts = [...parts];
            let _part = { ...part };
            if (part.id) {
                const index = findIndexById(part.id);
                _parts[index] = _part;

                PartApi
                    .updatePart(_part)
                    .then(() => {
                        // @ts-ignore
                        toast.current.show({ severity: "success", summary: "Successful", detail: "Part Updated", life: 3000 });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
            } else {
                PartApi
                    .createPart(_part)
                    .then(() => {
                        // @ts-ignore
                        toast.current.show({ severity: "success", summary: "Successful", detail: "Part Created", life: 3000 });
                    })
                    .catch((error) => {
                        // @ts-ignore
                        toast.current.show({ severity: "error", summary: "Error", detail: "Part already exist", life: 3000 });
                        console.log(error.message);
                    })
                _parts.push(_part);
            }

            setParts(_parts);
            setPartDialog(false);
            setPart(initialPart);
        }
    };

    const findIndexById = (id: any) => {
        let index = -1;
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onInputChange = (e: any, name: any) => {
        setPart({ ...part, [`${name}`]: (e.target && e.target.value) || "" });
    };

    const handleChangeDesc = (e: any, editor: any, name: any) => {
        setPart({ ...part, [`${name}`]: editor.getData() || "" });
    };

    const handlePartNameChange = (e: any, name: string) => {
        setPart({...part, [`${name}`]: e.target.value.partName || ""});
        setPartNameValue(e.value);
    }

    const updatePart = (part: any) => {
        setPart({ ...part });
        setPartDialog(true);
        setIsUpdate(true);
        setType("update");
        setPartNameValue(null);

    };

    const confirmDeletePart = (part: any) => {
        setPart(part);
        setDeletePartDialog(true);
    };

    const hideDeletePartDialog = () => {
        setDeletePartDialog(false);
    };

    const deletePart = () => {
        const id = part.id;
        let _parts = parts.filter((value: any) => value.id !== part.id);

        PartApi
            .deletePart({ id })
            .then(() => {
                // @ts-ignore
                toast.current.show({ severity: "success", summary: "Successful", detail: "Part Deleted", life: 3000 });
            })
            .catch((error) => {
                console.log(error.message);
            });

        setDeletePartDialog(false);
        setParts(_parts);
        setPart(initialPart);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    const partDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePart} />
        </>
    );

    const deletePartDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePartDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePart} />
        </>
    );

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => updatePart(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePart(rowData)} />
            </div>
        );
    };

    const descriptionBody = (rowData: any) => {
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: rowData.partDesc }} />
            </>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Parts</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate} />

                    <DataTable
                        ref={data}
                        value={parts}
                        selection={selectedParts}
                        onSelectionChange={(e) => setSelectedParts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} parts"
                        globalFilter={globalFilter}
                        emptyMessage="No parts found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                        <Column field="numberPart" header="Number Part" />
                        <Column field="partName" header="Part Name" />
                        <Column field="partDesc" header="Part Desc" body={descriptionBody} />
                        <Column field="action" header="Action" body={actionBodyTemplate} />
                    </DataTable>

                    <Dialog visible={partDialog} style={{ width: "450px"}} header="Part Details" modal className="p-fluid" footer={partDialogFooter} onHide={hideDialog}>
                        <form>
                            <div className="p-field">
                                <label htmlFor="numberPart">Number Part</label>
                                <InputText id="numberPart" disabled={type === "update"} value={part.numberPart} onChange={(e) => onInputChange(e, "numberPart")} autoFocus={true} className={classNames({ "p-invalid": submitted && !part.numberPart })} />
                                {submitted && !part.numberPart && <small className="p-invalid" style={{color: '#f44336'}}>number part is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="partName">Name</label>
                                <Dropdown value={partNameValue} onChange={(e: any) => handlePartNameChange(e, "partName")} options={partNameValues} optionLabel="partName" placeholder={isUpdate ? part.partName : "Select One"} className={classNames({ "p-invalid": submitted && !part.partName })} />
                                {submitted && !part.partName && <small className="p-invalid" style={{color: '#f44336'}}>name is required.</small>}
                            </div>
                            <div className="p-field">
                                <label htmlFor="partDesc">Description</label>
                                <CKEditor style={{ width: "420px"}} editor={ClassicEditor} id="partDesc" data={part.partDesc} name="partDesc" onChange={(e: any, editor: any) => handleChangeDesc(e, editor, "partDesc")} className={classNames({ "p-invalid": submitted && !part.partDesc })} />
                                {submitted && !part.partDesc && <small className="p-invalid" style={{color: '#f44336'}}>description is required.</small>}
                            </div>
                        </form>
                    </Dialog>

                    <Dialog visible={deletePartDialog} style={{ width: "450px" }} header="Confirm" modal footer={deletePartDialogFooter} onHide={hideDeletePartDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {part && (
                                <span>
                                    Are you sure you want to delete <b>{part.numberPart}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
