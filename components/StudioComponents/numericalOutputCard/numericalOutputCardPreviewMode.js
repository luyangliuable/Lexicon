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

        variables.forEach(( item, index ) => {
            for (var value of cardVariables) {
                if ( value.questionText == item ) {
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
            formula = formula.replace(/\[.*?\]/, matches[i]);
        }

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

            // const matches = [];
            // const matches = variables.filter(( item, index ) => {
            //     for (var value of props.cardElement.availableVariables) {
            //         if ( value.questionText == item ) {
            //             return true;
            //         }
            //     }
            // });

            const matches = getValueOfVariables(variables, props.cardElement.availableVariables);
            formula = replaceVariableWithValues(matches, formula);

            return eval( formula );
        } catch (e) {
            return e.message;
        }
    };

    return (
        <>
          <div className="w-full border shadow-md p-2 hover:shadow-xl mb-2">
            {/* card heading row */}
            <div className="flex flex-row mb-1 mb-0">
              <div className="inline-block font-bold text-2xl w-full text-blue-900 break-all">
                {props.cardElement.outputHeading}
              </div>
            </div>
            {/* card heading row */}
            {/* card content area */}
            <div className="mb-1">{props.cardElement.outputDescription}</div>
            {/* card content area */}
            {/* card result area */}
            <div className="flex text-blue-900 font-semibold border-1 py-0.5 px-2 rounded justify-between border-blue-900">
              <div>Result:</div>
              <div>{ JSON.stringify(evalutateFormula(props.cardElement.formula)) }</div>
            </div>
            {/* card result area */}
          </div>
        </>
    );
}

export default NumericalOutputCardPreviewMode;
