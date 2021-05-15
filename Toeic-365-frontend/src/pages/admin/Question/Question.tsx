import React, {useState, useEffect, useRef} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {FileUpload} from "primereact/fileupload";
import {RadioButton} from "primereact/radiobutton";
import {InputNumber} from "primereact/inputnumber";
import {Checkbox} from "primereact/checkbox";
import classNames from "classnames";

import * as PartApi from "../../../apis/PartApi";
import * as GroupQuestionApi from "../../../apis/GroupQuestionApi";
import * as QuestionApi from "../../../apis/QuestionApi";
import * as FileApi from "../../../apis/FileApi";


function Question() {

    const toast = useRef(null);
    const data = useRef(null);

    const initialQuestion = {
        id: null,
        title: '',
        questionNumber: 0,
        questionContent: '',
        questionImg: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
    }

    let initNumberPartItem = {
        numberPart: "",
    };

    const [question, setQuestion]: any = useState(initialQuestion);
    const [questionDialog, setQuestionDialog] = useState(false);
    const [deleteQuestionDialog, setDeleteQuestionDialog] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [questions, setQuestions]: any = useState(null);
    const [numberPartItem, setNumberPartItem]: any = useState(initNumberPartItem);
    const [numberPartItems, setNumberPartItems]: any = useState(null);
    const [titleItems, setTitleItems]: any = useState(null);
    const [titleItem, setTitleItem]: any = useState(null);
    const [type, setType] = useState('create');
    const [isCheckedImage, setIsCheckedImage] = useState(false);
    const [isChooseImage, setIsChooseImage] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const getAllQuestions = async () => {
            try {
                const response = await QuestionApi.getAllQuestions();

                setQuestions(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getAllQuestions();
    }, []);

    const openNew = () => {
        setQuestion(initialQuestion);
        setQuestionDialog(true);
        setNumberPartItem(null);
        setTitleItem(null);
        setType('create');
        setIsCheckedImage(false);
        setIsChooseImage(false);
        setSubmitted(false);
        setIsUpdate(false);
    };

    const hideDialog = () => {
        setQuestionDialog(false);
        setQuestion(initialQuestion);
        setNumberPartItem(null);
        setTitleItem(null);
        setSubmitted(false);
        setIsUpdate(false);
    };

    const SaveQuestion = (e: any) => {
        e.preventDefault();
        setSubmitted(true);

        if (question.title.trim() && question.questionNumber && question.questionContent.trim()) {
            let _questions = [...questions];
            let _question = {...question};

            if (question.id) {
                const index = findIndexById(question.id);
                _questions[index] = _question;

                QuestionApi
                    .updateQuestion(_question)
                    .then(() => {
                        // @ts-ignore
                        toast.current.show({
                            severity: "success",
                            summary: "Successful",
                            detail: "Question Update",
                            life: 3000
                        });
                    }).catch((error) => {
                    console.log(error.message);
                })
            } else {
                QuestionApi.createQuestion(question).then(() => {
                    // @ts-ignore
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "Question Created",
                        life: 3000
                    });
                }).catch((error) => {
                    console.log(error.message);
                });
                _questions.push(_question);
            }

            setQuestionDialog(false);
            setQuestions(_questions);
            setQuestion(initialQuestion);
        }
    }

    const findIndexById = (id: any) => {
        let index = -1;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const updateQuestion = (question: any) => {
        setQuestion({...question});
        setQuestionDialog(true);
        setNumberPartItem(null);
        setIsUpdate(true);
        setType('update');
    };

    const confirmDeleteQuestion = (question: any) => {
        setQuestion(question);
        setDeleteQuestionDialog(true);
    };

    const hideDeleteQuestionDialog = () => {
        setDeleteQuestionDialog(false);
    };

    const deleteQuestion = () => {
        let _questions = questions.filter((value: any) => value.id !== question.id);
        const id = question.id;

        QuestionApi
            .deleteQuestion({id})
            .then(() => {
                // @ts-ignore
                toast.current.show({severity: "success", summary: "Successful", detail: "Product Deleted", life: 3000});
            })
            .catch((error) => {
                console.log(error.message);
            });

        setDeleteQuestionDialog(false);
        setQuestions(_questions);
        setQuestion(initialQuestion);
    };

    const onInputNumberChange = (e: any, name: any) => {
        setQuestion({...question, [`${name}`]: e.value || 0});
    };

    const handleInputChange = (e: any, name: any) => {
        setQuestion({...question, [`${name}`]: e.target.value || ''});
    };

    const handleRadioChange = (e: any) => {
        setQuestion({...question, ['correctAnswer']: e.value});
    }

    useEffect(() => {
        PartApi.getAllNumberPart().then((res) => {
            setNumberPartItems(res.data);
        });
    }, []);

    const handleNumberPartChange = (e: any) => {
        setSubmitted(false);
        setNumberPartItem((e.target.value) || '');

        const numberPart = e.target.value.numberPart;
        GroupQuestionApi.getAllTitleByNumberPart({numberPart}).then((res) => {
            setTitleItems(res.data);
        }).catch();
    }

    const handleTitleChange = (e: any, name: any) => {
        setQuestion({...question, [`${name}`]: e.value.title});
        setTitleItem(e.value);
    }

    const handleUploadFile = (e: any, name: string) => {
        const currentFile = e.files[0];
        FileApi.uploadFile(currentFile).then((res) => {
            setQuestion({...question, [`${name}`]: res.data.name});
        })
        // @ts-ignore
        toast.current.show({severity: "success", summary: "Successful", detail: "File Uploaded", life: 3000});
    }

    const handleChooseImage = (e: any) => {
        if (e.checked) {
            setIsCheckedImage(true);
            setIsChooseImage(true);
        } else {
            setIsCheckedImage(false);
            setIsChooseImage(false);
        }
    }

    const questionDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={SaveQuestion}/>
        </>
    );

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
                        onClick={() => updateQuestion(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => confirmDeleteQuestion(rowData)}/>
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Questions</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
        </div>
    );

    const deleteQuestionDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteQuestionDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteQuestion}/>
        </>
    );


    const answerListBody = (rowData: any) => {
        return (
            <>
                <div>{`A. ${rowData.option1}`}</div>
                <div>{`B. ${rowData.option2}`}</div>
                <div>{`C. ${rowData.option3}`}</div>
                <div>{`D. ${rowData.option4}`}</div>
            </>
        );
    };

    const numberPartBody = (rowData: any) => {
        return (
            <>
                {rowData.numberPart}
            </>
        );
    };

    const titleBody = (rowData: any) => {
        return (
            <>
                {rowData.title}
            </>
        );
    };

    const questionNumberBody = (rowData: any) => {
        return (
            <>
                {rowData.questionNumber}
            </>
        );
    };

    const questionContentBody = (rowData: any) => {
        return (
            <>
                {rowData.questionContent}
            </>
        );
    };

    const imageBody = (rowData: any) => {
        return (
            <>
                {rowData.questionImg}
            </>
        );
    };

    const correctAnswerBody = (rowData: any) => {
        return (
            <>
                {rowData.correctAnswer}
            </>
        );
    };

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}/>

                    <DataTable
                        ref={data}
                        value={questions}
                        selection={selectedQuestions}
                        onSelectionChange={(e) => setSelectedQuestions(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} questions"
                        globalFilter={globalFilter}
                        emptyMessage="No questions found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{width: "3rem"}}/>
                        <Column field="numberPart" header="Number Part" body={numberPartBody}/>
                        <Column field="title" header="Title" body={titleBody} sortable/>
                        <Column field="question-number" header="Question Number" body={questionNumberBody}/>
                        <Column field="question-content" header="Question Content" body={questionContentBody}/>
                        <Column field="image" header="Image" body={imageBody}/>
                        <Column field="answer-list" header="Answer List" body={answerListBody}/>
                        <Column field="correct answer" header="Correct Answer" body={correctAnswerBody}/>
                        <Column field="action" header="Action" body={actionBodyTemplate}/>
                    </DataTable>

                    <Dialog visible={questionDialog} style={{width: "450px"}} header="Question Details" modal
                            className="p-fluid" footer={questionDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="numberPart">Number Part</label>
                            <Dropdown id="numberPart" disabled={type === 'update'} value={numberPartItem}
                                      onChange={(e) => handleNumberPartChange(e)} options={numberPartItems}
                                      optionLabel="numberPart"
                                      placeholder={isUpdate ? question.numberPart : "Select One"}/>
                        </div>
                        {numberPartItem ?
                            <div className="p-field">
                                <label htmlFor="title">Group Question Title</label>
                                <Dropdown id="title" value={titleItem}
                                          onChange={(e: any) => handleTitleChange(e, 'title')} options={titleItems}
                                          optionLabel="title" placeholder="Select One"
                                          className={classNames({"p-invalid": submitted && !question.title})}/>
                                {submitted && !question.title &&
                                <small className="p-invalid">group question title is required.</small>}
                            </div>
                            : <></>
                        }
                        <div className="p-field">
                            <label htmlFor="groupQuestionMedia">Question Media</label> <br/>
                            <Checkbox checked={isCheckedImage} onChange={e => handleChooseImage(e)}/> Image <br/>
                        </div>
                        {isChooseImage ? <div className="p-field">
                            <label htmlFor="questionImg">Images</label>
                            <FileUpload name="questionImg" accept="image/*" maxFileSize={250000000} customUpload
                                        uploadHandler={(e: any) => handleUploadFile(e, "questionImg")}/>
                        </div> : <></>}
                        <div className="p-field">
                            <label htmlFor="questionNumber">Question Number</label>
                            <InputNumber id="questionNumber" value={question.questionNumber}
                                         onValueChange={(e: any) => onInputNumberChange(e, "questionNumber")}
                                         className={classNames({"p-invalid": submitted && !question.questionNumber})}/>
                            {submitted && !question.questionNumber &&
                            <small className="p-invalid">question number is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="questionContent">Question Content</label>
                            <InputText id="questionContent" value={question.questionContent}
                                       onChange={(e) => handleInputChange(e, "questionContent")}
                                       className={classNames({"p-invalid": submitted && !question.questionContent})}/>
                            {submitted && !question.questionContent &&
                            <small className="p-invalid">content is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="image">Answer List </label><br/>
                            <small>choose the correct answer</small>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <RadioButton inputId="option1" name="option" value="A" onChange={handleRadioChange}
                                                 checked={question.correctAnswer === "A"}/>
                                </span>
                                <InputText placeholder="option 1" value={question.option1}
                                           onChange={(e: any) => handleInputChange(e, 'option1')}/>
                            </div>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <RadioButton inputId="option2" name="option" value="B" onChange={handleRadioChange}
                                                 checked={question.correctAnswer === "B"}/>
                                </span>
                                <InputText placeholder="option 2" value={question.option2}
                                           onChange={(e: any) => handleInputChange(e, 'option2')}/>
                            </div>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <RadioButton inputId="option3" name="option" value="C" onChange={handleRadioChange}
                                                 checked={question.correctAnswer === "C"}/>
                                </span>
                                <InputText placeholder="option 3" value={question.option3}
                                           onChange={(e: any) => handleInputChange(e, 'option3')}/>
                            </div>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <RadioButton inputId="option4" name="option" value="D" onChange={handleRadioChange}
                                                 checked={question.correctAnswer === "D"}/>
                                </span>
                                <InputText placeholder="option 4" value={question.option4}
                                           onChange={(e: any) => handleInputChange(e, 'option4')}/>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteQuestionDialog} style={{width: "450px"}} header="Confirm" modal
                            footer={deleteQuestionDialogFooter} onHide={hideDeleteQuestionDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: "2rem"}}/>
                            {question && (
                                <span>
                                    Are you sure you want to delete <b>{question.questionNumber}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}

export default Question;