export interface infer_result {
    prediction: string | null | undefined;
}

export interface models {
    name: string;
    dataset: string;
}

export interface datasets {
    name: string;
    inputs: string;
}