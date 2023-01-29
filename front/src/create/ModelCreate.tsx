import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material'


const steps = ['Input Model Name', 'Select Dataset', 'Create Model'];

export default function HorizontalLinearStepper() {

    const [name, setName] = React.useState<string>('');
    const [datasetValue, setDatasetValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDatasetChange = (event: SelectChangeEvent) => {
        setDatasetValue(event.target.value as string);
    };

    const nameSelection = (
        <React.Fragment>
            <TextField sx={{ width: 1, mt: "20pt" }} id="outlined-basic" label="Model Name" variant="outlined" value={name} onChange={handleChange} />
        </React.Fragment>
    );

    const datasetSelection = (
        <React.Fragment>
            <FormControl sx={{ width: 1, mt: "20pt"}} fullWidth>
                <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
                <Select
                    className='datasetSelection'
                    value={datasetValue}
                    label="Dataset"
                    onChange={handleDatasetChange}
                >
                    <MenuItem value={"Iris"}>Iris</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            )}

            {activeStep !== steps.length && (

                <React.Fragment>

                    {activeStep === 0 && (
                        nameSelection
                    )}

                    {activeStep === 1 && (
                        datasetSelection
                    )}

                    <Box sx={{ mt: "10pt", display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}