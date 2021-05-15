import * as BaseApi from "./BaseApi";

export const createPart = ({numberPart, partName, partDesc}: any): Promise<any> => {
    return BaseApi.postApi("/api/parts", {numberPart: numberPart, partName: partName, partDesc: partDesc});
}

export const updatePart = ({id, numberPart, partName, partDesc}: any): Promise<any> => {
    return BaseApi.postApi("/api/parts/update", {id: id, numberPart: numberPart, partName: partName, partDesc: partDesc});
}

export const deletePart = ({id}: any): Promise<any> => {
    return BaseApi.postApi("/api/parts/delete", {id: id});
}

export const getAllParts = (): Promise<any> => {
    return BaseApi.getApi("/api/parts", {});
}

export const getAllNumberPart = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/number", {});
}

export const getAllNumberPartOne = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/one", {});
}

export const getAllNumberPartTwo = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/two", {});
}

export const getAllNumberPartThree = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/three", {});
}

export const getAllNumberPartFour = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/four", {});
}

export const getAllNumberPartFive = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/five", {});
}

export const getAllNumberPartSix = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/six", {});
}

export const getAllNumberPartSeven = (): Promise<any> => {
    return BaseApi.getApi("/api/parts/seven", {});
}
