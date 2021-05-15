import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import * as AccountApi from "../../../apis/AccountApi";
import {Password} from "primereact/password";
import * as AuthApi from "../../../apis/AuthApi";
import classNames from "classnames";
import * as PartApi from "../../../apis/PartApi";

export const Account = () => {

    let initialAccount = {
        id: null,
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [accounts, setAccounts]: any = useState(null);
    const [account, setAccount]: any = useState(initialAccount);
    const [AccountDialog, setAccountDialog] = useState(false);
    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [type, setType] = useState('create');
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const data = useRef(null);

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await AccountApi.getAllUser();

                setAccounts(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllUser();
    }, []);

    const openNew = () => {
        setSubmitted(false);
        setAccount(initialAccount);
        setAccountDialog(true);
        setType('create');
    };

    const hideDialog = () => {
        setAccountDialog(false);
        setSubmitted(false);
    };

    const hideDeleteAccountDialog = () => {
        setDeleteAccountDialog(false);
    };

    const {fullName, email, password, confirmPassword} = account;

    const saveAccount = (e: any) => {
        e.preventDefault();
        setSubmitted(true)

        if (fullName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                let _accounts = [...accounts];
                let _account = { ...account };
                if (account.id) {
                    const index = findIndexById(account.id);
                    _accounts[index] = _account;

                    AccountApi
                        .updateUser(_account)
                        .then(() => {
                            // @ts-ignore
                            toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                } else {
                    AuthApi
                        .Register(_account)
                        .then(() => {
                            // @ts-ignore
                            toast.current.show({ severity: "success", summary: "Successful", detail: "User Created", life: 3000 });
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                    _accounts.push(_account);
                }

                setAccounts(_accounts);
                setAccountDialog(false);
                setAccount(initialAccount);
            } else {
                // @ts-ignore
                toast.current.show({ severity: 'info', summary: 'Info', detail: 'Password No Match'});
            }

            setAccountDialog(false);
            setAccount(initialAccount);
        }
    };

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const updateAccount = (product: any) => {
        setAccount({ ...product });
        setAccountDialog(true);
        setType('update');
    };

    const confirmDeleteAccount = (product: any) => {
        setAccount(product);
        setDeleteAccountDialog(true);
    };

    const deleteAccount = () => {
        setDeleteAccountDialog(false);
        setAccount(initialAccount);
        // @ts-ignore
        toast.current.show({ severity: "success", summary: "Successful", detail: "Product Deleted", life: 3000 });
    };

    const onInputChange = (e: any, name: string) => {
        setAccount({...account, [`${name}`]: e.target.value});
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => updateAccount(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteAccount(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Accounts</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const accountDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAccount} />
        </>
    );

    const deleteAccountDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAccountDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAccount} />
        </>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate} />

                    <DataTable
                        ref={data}
                        value={accounts}
                        selection={selectedAccounts}
                        onSelectionChange={(e) => setSelectedAccounts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} account"
                        globalFilter={globalFilter}
                        emptyMessage="No account found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                        <Column field="fullName" header="Full Name" />
                        <Column field="email" header="Email" />
                        <Column field="roles" header="Roles" />
                        <Column body={actionBodyTemplate} />
                    </DataTable>

                    <Dialog visible={AccountDialog} style={{ width: "450px" }} header="Account Details" modal className="p-fluid" footer={accountDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="fullName">Full Name</label>
                            <InputText id="fullName" value={account.fullName} placeholder="Full Name" onChange={(e) => onInputChange(e, "fullName")} required autoFocus className={classNames({"p-invalid": submitted && !account.fullName})} />
                            {submitted && !account.fullName && <small className="p-invalid">full name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText type="email" id="email" value={account.email} placeholder={"Email"} disabled={type === 'update'} onChange={(e) => onInputChange(e, "email")} className={classNames({"p-invalid": submitted && !account.email})} />
                            {submitted && !account.email && <small className="p-invalid">email is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Password</label>
                            <Password placeholder={"Password"} value={account.password} onChange={(e) => onInputChange(e, "password")} toggleMask className={classNames({"p-invalid": submitted && !account.password})} />
                            {submitted && !account.password && <small className="p-invalid">password is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Password placeholder={"Confirm Password"} value={account.confirmPassword} onChange={(e) => onInputChange(e, "confirmPassword")} toggleMask className={classNames({"p-invalid": submitted && !account.confirmPassword})} />
                            {submitted && !account.confirmPassword && <small className="p-invalid">confirm password is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAccountDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteAccountDialogFooter} onHide={hideDeleteAccountDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {account && (
                                <span>
                                    Are you sure you want to delete <b>{account.fullName}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};
