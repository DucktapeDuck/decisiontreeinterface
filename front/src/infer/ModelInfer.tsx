import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useGetDatasets, useGetModels, useInfer } from '../hooks/hooks'
import { infer_result } from '../hooks/types'

type Props = {}

export default function ModelInfer({ }: Props) {

    // Load available models with datasets
    const models = useGetModels();
    const datasets = useGetDatasets();
    const [result, setResult] = useState<infer_result | null>(null);

    console.log(models.data)
    console.log(datasets.data)

    const [selectedDataset, setSelectedDataset] = React.useState('');
    const [inputs, setInputs] = React.useState<string[]>([]);
    const [savedInputs, setSavedInputs] = React.useState({});

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedDataset(event.target.value as string);

        if (models.data !== null && datasets.data !== null) {
            const model_data = models.data.find(({ name }) => (name === (event.target.value as string)))
            const input = datasets.data.find(({ name }) => (name === model_data?.dataset))

            if (input) {
                const parsed_input = JSON.parse(input.inputs)
                setInputs(parsed_input)
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSavedInputs(savedInputs => ({ ...savedInputs, [event.target.id]: event.target.value }))
    }
    
    const HandleInfer = (event: any) => {
        useInfer(result, setResult, selectedDataset, {"inputs": savedInputs});
    }

    return (
        <div>
            <Typography variant='h6' >
                Model Infer
            </Typography>

            {models.loaded &&
                <FormControl sx={{ mt: "5pt" }} fullWidth>
                    <InputLabel>Dataset</InputLabel>
                    <Select
                        labelId="selectedDataset"
                        value={selectedDataset}
                        label="Selected Dataset"
                        onChange={handleChange}
                    >
                        {models.data !== null && models.data.map((dataset, index) => (
                            <MenuItem key={dataset.toString() + index.toString()} id={index.toString()} value={dataset.name}>{dataset.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            }

            {selectedDataset && (
                <>
                    <Typography variant='h6' sx={{ mt: "15pt" }}>
                        Inputs
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: "5pt" }}>
                        {
                            inputs && inputs.map((value, index) => (
                                <Grid key={value.toString() + index.toString()} item xs={2}>
                                    <TextField label={value} variant="outlined" id={value} onChange={handleInputChange} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            )}

            {selectedDataset && (
                <>
                    <Button sx={{ mt: '10pt' }} variant="contained" onClick={HandleInfer} disabled={Object.keys(savedInputs).length !== inputs.length}>Infer Data</Button>
                </>
            )}

            {result &&
                <Typography variant="h6" sx={{ mt: '10pt'}}>
                    Prediction Class: 
                    {result !== null && <>{result}</>}
                </Typography>    
            }
            
        </div>
    )
}