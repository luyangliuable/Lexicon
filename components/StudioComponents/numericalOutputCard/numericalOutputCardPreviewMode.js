import React from "react";

function NumericalOutputCardPreviewMode(props) {

    const matchVariablesFromFormula = (formula) => {
        /*
         * Identifies a variable in the formula using regex.
         *
         * Parameters:
         *  - formula (string): The original formula
         *
         * Returns: An array of matches containing variable names from formula.
         */

        return formula.match(/(?<=\[).+?(?=\])/g);
    };


    const getValueOfVariables = (variables, cardVariables) => {
        /*
         * Get the value of variables connecting to their input cards
         *
         * Parameters:
         *  - variables (string[]): List of variables
         *  - cardVariables (string[]): List of all variables
         *
         * Returns: An array of containing matche numbers or values from cards from the variables
         */
        const matches = [];

        variables && variables.forEach((item, index) => {
            for (var value of cardVariables) {
                if (value.questionText == item) {
                    matches.push(value.value);
                }
            }
        });

        return matches;
    };

    const replaceVariableWithValues = (matches, formula) => {
        /*
         * Replace the variables with their values in the formula
         *
         * Parameters:
         *  - matches (number[]): List of numbers corresponding to their variables
         *  - formula (string): Original formula
         *
         * Returns: New formula without variables
         */

        for (let i = 0; i < matches.length; i++) {
            formula = formula.replace(/\[.*?\]/, JSON.stringify(matches[i]));
        }

        // Remove " symbol
        formula = formula.replace(/"/g, '');

        // Replace symbols with other symbols
        formula = formula.replace(/\^/g, '**'); // Power

        return formula;
    };

    const evalutateFormula = (formula) => {
        /*
         * Evaluate a formula for this output card
         *
         * Parameters:
         *  - formula (string): Original formula
         *
         * Returns: The result of the formula
         */
        try {
            const variables = matchVariablesFromFormula(formula);

            const matches = getValueOfVariables(variables, props.cardElement.availableVariables);
            formula = replaceVariableWithValues(matches, formula);

            console.log(formula);
            const sqrt = Math.sqrt;
            const sum = (valueArray) => {
                return valueArray.reduce((accumulator, currentValue) => {
                    console.log(accumulator);
                    return accumulator + currentValue;
                }, 0);
            };

            return eval(formula);
        } catch (e) {
            console.warn(`${e.message}`);
            return "There is an error in the formula";
        }
    };

    function round(value, precision = 4) {
        const exponent = Math.pow(10, precision);
        return Math.round(value * exponent) / exponent;
    }

    function detectDuplicateVariables(variables) {
        /*
         * Detects duplicate variables in the formula
         *
         * Parameters:
         *  - variables (string[]): List of variables
         *
         * Returns: True if there are duplicate variables, false otherwise
         */

        console.log(variables);
        const unique = [...new Set(variables.map(item => item.questionText))];
        return unique.length !== variables.length;
    }

    return (
        <>
            <div className="w-full border shadow-md p-8 hover:shadow-xl mb-2 bg-gray-50 flex flex-col justify-start">
                {/* card heading row */}
                <div className="flex flex-row mb-1 mb-0">
                    <div className="inline-block font-bold text-2xl w-full text-blue-900 break-all">
                        {props.cardElement.outputHeading}
                    </div>
                </div>
                <div className="card-error-display" style={{
                    visibility: detectDuplicateVariables(props.cardElement.availableVariables) ? "visible" : "hidden"
                }}>
                    {
                        detectDuplicateVariables(props.cardElement.availableVariables) &&
                        "Error: There are duplicate variables in the formula"
                    }
                </div>
                {/* card heading row */}
                {/* card content area */}
                <div className="mb-1 flex justify-between">
                    {props.cardElement.outputDescription}
                </div>
                {/* card content area */}
                {/* card result area */}
                <div className="flex text-blue-900 font-semibold border-1 py-0.5 rounded justify-between border-blue-900">
                    <div>Result:</div>
                    <div>
                        {
                            (() => {
                                const result = evalutateFormula(props.cardElement.formula) ? evalutateFormula(props.cardElement.formula) : "";
                                return typeof (result) == 'number' ? round(result, props.cardElement.precision) : result;
                            })()
                        }
                    </div>
                </div>
                {/* card result area */}
            </div>
        </>
    );
}

export default NumericalOutputCardPreviewMode;
