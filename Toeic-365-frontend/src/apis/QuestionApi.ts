import * as BaseApi from "./BaseApi";

export const getAllQuestions = (): Promise<any> => {
    return BaseApi.getApi("/api/questions", {});
}

export const createQuestion = ({title, questionNumber, questionContent, questionImg, option1, option2, option3, option4, correctAnswer}: any): Promise<any> => {
    return BaseApi.postApi("/api/questions", {
        title: title,
        questionNumber: questionNumber,
        questionContent: questionContent,
        questionImg: questionImg,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correctAnswer: correctAnswer
    });
}

export const updateQuestion = ({id, questionNumber, questionContent, questionImg, option1, option2, option3, option4, correctAnswer}: any): Promise<any> => {
    return BaseApi.postApi("/api/questions/update", {
        id: id,
        questionNumber: questionNumber,
        questionContent: questionContent,
        questionImg: questionImg,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correctAnswer: correctAnswer
    });
}

export const deleteQuestion = ({id}: any): Promise<any> => {
    return BaseApi.postApi("/api/questions/delete", {id: id,});
}
