import React, {useState, useEffect, useRef} from "react";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {TimePicker} from "antd";
import moment from 'moment';
import 'antd/dist/antd.css';
import classNames from "classnames";

import * as PartApi from "../../../apis/PartApi";
import * as ExamApi from "../../../apis/ExamApi";

export const Exam = () => {

    let initialExam = {
        id: null,
        examName: '',
        totalTime: null,
        numberPartOne: '',
        numberPartTwo: '',
        numberPartThree: '',
        numberPartFour: '',
        numberPartFive: '',
        numberPartSix: '',
        numberPartSeven: ''
    };

    const toast = useRef(null);
    const data = useRef(null);

    const [exam, setExam] = useState(initialExam);
    const [exams, setExams]: any = useState(null);
    const [examDialog, setExamDialog] = useState(false);
    const [deleteExamDialog, setDeleteExamDialog] = useState(false);
    const [selectedExams, setSelectedExams]: any = useState(null);
    const [globalFilter, setGlobalFilter]: any = useState(null);

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const getAllExams = async () => {
            try {
                const response = await ExamApi.getAllExams();
                setExams(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllExams();
    }, []);

    let initNumberPart = {
        id: null,
        numberPart: '',
        partDesc: ''
    }

    const [numberPartOnes, setNumberPartOnes]: any = useState(null);
    const [numberPartOne, setNumberPartOne] = useState(initNumberPart);
    const [numberPartTwos, setNumberPartTwos]: any = useState(null);
    const [numberPartTwo, setNumberPartTwo] = useState(null);
    const [numberPartThrees, setNumberPartThrees]: any = useState(null);
    const [numberPartThree, setNumberPartThree] = useState(null);
    const [numberPartFours, setNumberPartFours]: any = useState(null);
    const [numberPartFour, setNumberPartFour] = useState(null);
    const [numberPartFives, setNumberPartFives]: any = useState(null);
    const [numberPartFive, setNumberPartFive] = useState(null);
    const [numberPartSixs, setNumberPartSixs]: any = useState(null);
    const [numberPartSix, setNumberPartSix] = useState(null);
    const [numberPartSevens, setNumberPartSevens]: any = useState(null);
    const [numberPartSeven, setNumberPartSeven] = useState(null);

    useEffect(() => {
        const getAllNumberPart = async () => {
            try {
                const resOne = await PartApi.getAllNumberPartOne();
                const resTwo = await PartApi.getAllNumberPartTwo();
                const resThree = await PartApi.getAllNumberPartThree();
                const resFour = await PartApi.getAllNumberPartFour();
                const resFive = await PartApi.getAllNumberPartFive();
                const resSix = await PartApi.getAllNumberPartSix();
                const resSeven = await PartApi.getAllNumberPartSeven();
                setNumberPartOnes(resOne.data);
                setNumberPartTwos(resTwo.data);
                setNumberPartThrees(resThree.data);
                setNumberPartFours(resFour.data);
                setNumberPartFives(resFive.data);
                setNumberPartSixs(resSix.data);
                setNumberPartSevens(resSeven.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllNumberPart();
    }, []);

    const onNumberPartOneChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartOne(e.value);
    }

    const onNumberPartTwoChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartTwo(e.value);
    }

    const onNumberPartThreeChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartThree(e.value);
    }

    const onNumberPartFourChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartFour(e.value);
    }

    const onNumberPartFiveChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartFive(e.value);
    }

    const onNumberPartSixChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartSix(e.value);
    }

    const onNumberPartSevenChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.value.numberPart || ''});
        setNumberPartSeven(e.value);
    }

    const saveExam = (e: any) => {
        e.preventDefault();

        setSubmitted(true);

        if (exam.examName.trim() && exam.numberPartOne && exam.numberPartTwo && exam.numberPartFour && exam.numberPartFive && exam.numberPartThree && exam.numberPartSix && exam.numberPartSeven && exam.totalTime) {
            let _exams = [...exams];
            let _exam = { ...exam };
            if (exam.id) {
                const index = findIndexById(exam.id);
                _exams[index] = _exam;

                ExamApi
                    .updateExam(_exam)
                    .then(() => {
                        // @ts-ignore
                        toast.current.show({ severity: "success", summary: "Successful", detail: "Exam Updated", life: 3000 });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
            } else {
                ExamApi
                    .createExam(_exam)
                    .then(() => {
                        // @ts-ignore
                        toast.current.show({ severity: "success", summary: "Successful", detail: "Exam Created", life: 3000 });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                _exams.push(_exam);
            }

            setExams(_exams);
            setExamDialog(false)
            setExam(initialExam);
        }
    };

    const findIndexById = (id: any) => {
        let index = -1;
        for (let i = 0; i < exams.length; i++) {
            if (exams[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onChangeTime = (time: any, name: string) => {
        setExam({...exam, [`${name}`]: time})
    };

    const onInputChange = (e: any, name: any) => {
        setExam({...exam, [`${name}`]: e.target.value});
    };

    const openNew = () => {
        setSubmitted(false);
        setExam(initialExam);
        setExamDialog(true);
        setNumberPartOne(initNumberPart);
        setNumberPartTwo(null);
        setNumberPartThree(null);
        setNumberPartFour(null);
        setNumberPartFive(null);
        setNumberPartSix(null);
        setNumberPartSeven(null);
    };

    const hideDialog = () => {
        setExam({...exam});
        setExamDialog(false);
        setNumberPartOne(initNumberPart);
        setNumberPartTwo(null);
        setNumberPartThree(null);
        setNumberPartFour(null);
        setNumberPartFive(null);
        setNumberPartSix(null);
        setNumberPartSeven(null);
        setSubmitted(false);
    };

    const hideDeleteExamDialog = () => {
        setDeleteExamDialog(false);
    };

    const confirmDeleteExam = (exam: any) => {
        setExam(exam);
        setDeleteExamDialog(true);
    };

    const updateExam = (exam: any) => {
        setSubmitted(false);
        setExam({...exam});
        setExamDialog(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew}/>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => updateExam(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteExam(rowData)}/>
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Exams</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
        </div>
    );

    const examDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveExam}/>
        </>
    );

    const deleteExam = () => {
        const id = exam.id;
        let _exams = exams.filter((value: any) => value.id !== exam.id);

        ExamApi
            .deleteExam({ id })
            .then(() => {
                // @ts-ignore
                toast.current.show({ severity: "success", summary: "Successful", detail: "Exam Deleted", life: 3000 });
            })
            .catch((error) => {
                console.log(error.message);
            });

        setDeleteExamDialog(false);
        setExams(_exams);
        setExam(initialExam);
    };
    const deleteExamDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteExamDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteExam} />
        </>
    );


    const totalTimeBody = (rowData: any) => {
        return (
            <>
                <div>{moment(rowData.totalTime).format('HH:mm:ss')}</div>
            </>
        )
    };

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate} />

                    <DataTable
                        ref={data}
                        value={exams}
                        selection={selectedExams}
                        onSelectionChange={(e) => setSelectedExams(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} exams"
                        globalFilter={globalFilter}
                        emptyMessage="No exams found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{width: "3rem"}}/>
                        <Column field="examName" header="Name" />
                        <Column field="totalTime" body={totalTimeBody} header="Total Time"/>
                        <Column field="action" header="Action" body={actionBodyTemplate}/>
                    </DataTable>

                    <Dialog visible={examDialog} style={{width: "450px"}} header="Exam Details" modal
                            className="p-fluid" footer={examDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="examName">Name</label>
                            <InputText id="examName" value={exam.examName}
                                       onChange={(e) => onInputChange(e, "examName")} required autoFocus
                                       className={classNames({"p-invalid": submitted && !exam.examName})}/>
                            {submitted && !exam.examName && <small className="p-invalid">name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="totalTime">Total Time</label><br/>
                            <TimePicker  onChange={e => onChangeTime(e, 'totalTime')} /> <br/>
                            {submitted && !exam.totalTime && <small className="p-invalid">totalTime is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartOne">Part I</label>
                            <Dropdown id="numberPartOne"
                                      value={numberPartOne}
                                      onChange={(e) => onNumberPartOneChange(e, "numberPartOne")}
                                      options={numberPartOnes} optionLabel="numberPart"
                                      placeholder={"Select One"}
                                      className={classNames({"p-invalid": submitted && !exam.numberPartOne})}
                            />
                            {submitted && !exam.numberPartOne && <small className="p-invalid">number part one is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartTwo">Part II</label>
                            <Dropdown id="numberPartTwo" value={numberPartTwo}
                                      onChange={(e) => onNumberPartTwoChange(e, "numberPartTwo")}
                                      options={numberPartTwos} optionLabel="numberPart"
                                      placeholder={"Select One"}
                                      className={classNames({"p-invalid": submitted && !exam.numberPartTwo})}
                            />
                            {submitted && !exam.numberPartTwo && <small className="p-invalid">number part two is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartThree">Part III</label>
                            <Dropdown value={numberPartThree}
                                      onChange={(e) => onNumberPartThreeChange(e, "numberPartThree")}
                                      options={numberPartThrees} optionLabel="numberPart"
                                      placeholder="Select One"
                                      className={classNames({"p-invalid": submitted && !exam.numberPartThree})}
                            />
                            {submitted && !exam.numberPartThree && <small className="p-invalid">number part three is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartFour">Part IV</label>
                            <Dropdown value={numberPartFour}
                                      onChange={(e) => onNumberPartFourChange(e, "numberPartFour")}
                                      options={numberPartFours} optionLabel="numberPart" placeholder="Select One"
                                      className={classNames({"p-invalid": submitted && !exam.numberPartFour})}
                            />
                            {submitted && !exam.numberPartThree && <small className="p-invalid">number part four is required.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="numberPartFive">Part V</label>
                            <Dropdown value={numberPartFive}
                                      onChange={(e) => onNumberPartFiveChange(e, "numberPartFive")}
                                      options={numberPartFives} optionLabel="numberPart" placeholder="Select One"
                                      className={classNames({"p-invalid": submitted && !exam.numberPartFive})}
                            />
                            {submitted && !exam.numberPartThree && <small className="p-invalid">number part five is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartSix">Part VI</label>
                            <Dropdown value={numberPartSix} onChange={(e) => onNumberPartSixChange(e, "numberPartSix")}
                                      options={numberPartSixs} optionLabel="numberPart" placeholder="Select One"
                                      className={classNames({"p-invalid": submitted && !exam.numberPartSix})}
                            />
                            {submitted && !exam.numberPartThree && <small className="p-invalid">number part six is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="numberPartSeven">Part VII</label>
                            <Dropdown value={numberPartSeven}
                                      onChange={(e) => onNumberPartSevenChange(e, "numberPartSeven")}
                                      options={numberPartSevens} optionLabel="numberPart" placeholder="Select One"
                                      className={classNames({"p-invalid": submitted && !exam.numberPartSeven})}
                            />
                            {submitted && !exam.numberPartSeven && <small className="p-invalid">number part seven is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteExamDialog} style={{width: "450px"}} header="Confirm" modal
                            footer={deleteExamDialogFooter} onHide={hideDeleteExamDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: "2rem"}}/>
                            {exam && (
                                <span>
                                    Are you sure you want to delete <b>{exam.examName}</b> ?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

