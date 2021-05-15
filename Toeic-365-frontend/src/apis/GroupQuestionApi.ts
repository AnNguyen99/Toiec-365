import * as BaseApi from "./BaseApi";

export const createGroupQuestion = ({numberPart, title, groupQuestionDesc, groupQuestionImg, audio, paragraph}: any): Promise<any> => {
    return BaseApi.postApi("/api/group-questions", {
        numberPart: numberPart,
        title: title,
        groupQuestionDesc: groupQuestionDesc,
        groupQuestionImg: groupQuestionImg,
        audio: audio,
        paragraph: paragraph
    });
}

export const getAllGroupQuestions = (): Promise<any> => {
    return BaseApi.getApi("/api/group-questions", {});
}

export const getAllTitleByNumberPart = ({numberPart}: any): Promise<any> => {
    return BaseApi.postApi("/api/group-questions/title", {numberPart: numberPart});
}

export const updateGroupQuestion = ({id, title, groupQuestionDesc, groupQuestionImg, audio, paragraph}: any): Promise<any> => {
    return BaseApi.postApi("/api/group-questions/update", {
        id: id,
        title: title,
        groupQuestionDesc: groupQuestionDesc,
        groupQuestionImg: groupQuestionImg,
        audio: audio,
        paragraph: paragraph
    });
}

export const deleteGroupQuestion = ({id}: any): Promise<any> => {
    return BaseApi.postApi("/api/group-questions/delete", {id: id,});
}
