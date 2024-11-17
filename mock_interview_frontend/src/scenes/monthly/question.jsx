import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Jeader from "./Jeader"; // Ensure the path is correct
import datas from "../../state/data";
import { useNavigate } from 'react-router-dom';
import LoadingPage from 'components/loadingPage'; // Adjust the import path as needed

const Customers = ({ questions, score, previousQuestion, flag, resume, cv }) => {
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:200px)");
    console.log(resume, cv);

    if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {
        navigate('/loginForm');
    }

    const handleFormSubmit = async (values) => {
        setLoading(true); // Set loading to true when starting submission
        document.getElementById("message").innerText = "wait";

        let crossQuestions = [];
        let finalScore = 0;

        const formattedValues = questions.map((question, index) => ({
            question,
            answer: values[`answer${index}`],
        }));

        for (const obj of formattedValues) {
            const responseScore = await fetch(`${datas.url}ai/check-question`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(obj)
            });
            const result = await responseScore.json();

            console.log(result.score.split(" ")[1]);
            finalScore += (Number(result.score.split(" ")[1]));
            console.log(result);
            console.log(result.tip);
            obj.tip = result.tip;
            obj.score = (Number(result.score.split(" ")[1]));
            crossQuestions.push(result.crossQuestion);
        }

        console.log(finalScore);
        console.log(crossQuestions);
        for (const a of formattedValues) {
            console.log(a);
        }

        setLoading(false); // Set loading to false when submission is done

        if (flag) {
            navigate('/cross-question', { state: { questions: crossQuestions, score: finalScore, currentQuestions: formattedValues, resume: resume, cv: cv } });
        } else {
            previousQuestion = previousQuestion.concat(formattedValues);
            console.log(previousQuestion);
            navigate("/result", { state: { questions: previousQuestion, score: finalScore + score, flag: false, resume: resume, cv: cv } });
        }
    };

    const validationSchema = yup.object().shape(
        questions.reduce((acc, _, index) => {
            acc[`answer${index}`] = yup.string().required("Required");
            return acc;
        }, {})
    );

    const initialValues = questions.reduce((acc, _, index) => {
        acc[`answer${index}`] = "";
        return acc;
    }, {});

    return (
        <Box m="20px">
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <Jeader title="Interview Questions" subtitle="Please answer the following questions" />
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <FieldArray
                                    name="questions"
                                    render={() => (
                                        <Box>
                                            {questions.map((question, index) => (
                                                <Box
                                                    key={index}
                                                    display="grid"
                                                    gap="30px"
                                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                                    sx={{
                                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                                    }}
                                                    mb={2}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        variant="filled"
                                                        type="text"
                                                        label={
                                                            <div style={{ whiteSpace: "pre-wrap", overflow: "visible" }}>
                                                                {question}
                                                            </div>
                                                        }
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values[`answer${index}`]}
                                                        name={`answer${index}`}
                                                        error={!!touched[`answer${index}`] && !!errors[`answer${index}`]}
                                                        helperText={touched[`answer${index}`] && errors[`answer${index}`]}
                                                        sx={{
                                                            gridColumn: "span 4",
                                                            "& .MuiInputLabel-root": {
                                                                fontSize: "1.5rem",
                                                            },
                                                            "& .MuiInputBase-input": {
                                                                paddingTop: "40px", // Adjust this value to move the text down
                                                            },
                                                        }}
                                                        multiline
                                                        rows={10}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                />
                                <Box justifyContent="end" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Submit
                                    </Button>
                                    <div id="message"></div>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </>
            )}
        </Box>
    );
};

export default Customers;
