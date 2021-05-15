import * as BaseApi from "./BaseApi";

export const createExam = ({examName, totalTime, numberPartOne, numberPartTwo, numberPartThree, numberPartFour, numberPartFive, numberPartSix, numberPartSeven}: any): Promise<any> => {
    return BaseApi.postApi("/api/exams",
        {
            examName: examName,
            totalTime: totalTime,
            numberPartOne: numberPartOne,
            numberPartTwo: numberPartTwo,
            numberPartThree: numberPartThree,
            numberPartFour: numberPartFour,
            numberPartFive: numberPartFive,
            numberPartSix: numberPartSix,
            numberPartSeven: numberPartSeven
        });
}

export const updateExam = ({id, examName, totalTime, numberPartOne, numberPartTwo, numberPartThree, numberPartFour, numberPartFive, numberPartSix, numberPartSeven}: any): Promise<any> => {
        return BaseApi.postApi("/api/exams/update", {id: id, examName: examName, totalTime: totalTime, numberPartOne: numberPartOne, numberPartTwo: numberPartTwo, numberPartThree: numberPartThree, numberPartFour: numberPartFour, numberPartFive: numberPartFive, numberPartSix: numberPartSix, numberPartSeven: numberPartSeven});
}

export const getAllExams = (): Promise<any> => {
        return BaseApi.getApi("/api/exams/all", {});
}

export const getExamById = ({id}: any): Promise<any> => {
        return BaseApi.getApi("/api/exams?id="+id, {});
}

export const getAllExam = (): Promise<any> => {
        return BaseApi.getApi("/api/exams/name", {});
}

export const getIntroExamById = ({id}: any): Promise<any> => {
        return BaseApi.getApi("/api/exams/intro?id="+ id, {});
}

export const deleteExam = ({id}: any): Promise<any> => {
        return BaseApi.postApi("/api/exams/delete", {id: id,});
}