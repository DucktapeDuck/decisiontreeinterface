import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { datasets, infer_result, models } from "./types";

const global_url = "http://127.0.0.1:8000"

// interface hookreturn {
//     data: object,
//     error: string,
//     loaded: boolean
// }

export const useAxiosPost = <T>(
    data: T | null,
    setData: Dispatch<SetStateAction<T | null>>,
    url: string, 
    payload: any
): {
    data: T | null,
    error: string,
    loaded: boolean
} => {
    let error: string = "";
    let loaded: boolean = false;

    // useEffect(() => {
    axios
        .post(url, payload)
        .then((response) => (setData(response.data.data.prediction[0])))
        .catch((error) => (error = error))
        .finally(() => (loaded = true));

    // console.log(data);
    // }, []);

    return { data, error, loaded };
}

export const useAxiosGet = <T>(
    url: string
): {
    data: T | null,
    error: string,
    loaded: boolean
}  => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get(url)
            .then((response) => setData(response.data.data))
            .catch((error) => setError(error.message))
            .finally(() => {
                setLoaded(true);
                console.log(data);
            });
    }, []);

    return { data, error, loaded };
}

// export const useCreateModel = (modelName: string, dataset: string) => {
//     return useAxiosPost<object>(global_url + "/createmodel/", {"modelName": modelName, "dataset": dataset});
// };

// export const useCreateDataset = () => {
//     return useAxiosPost<object>(global_url + "/createdataset/", null);
// };

export const useInfer = (data: infer_result | null, setData: Dispatch<SetStateAction<infer_result | null>>, model: string, inputs: object) => {
    return useAxiosPost<infer_result>(data, setData, global_url + "/infer/" + model, inputs)
}

export const useGetDatasets = () => {
    return useAxiosGet<Array<datasets>>(global_url + "/datasets/")
}

export const useGetModels = () => {
    return useAxiosGet<Array<models>>(global_url + "/models/")
}