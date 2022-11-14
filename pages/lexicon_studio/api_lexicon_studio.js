
// Method for handling create new form in Lexicon studio
export const createForm = ( formName, metaCardList, inputsCardList, outputsCardList ) => {
    const formDetails = {
        FORM_NAME: formName,
        META_CARD_LIST: metaCardList,
        INPUTS_CARD_LIST: inputsCardList,
        OUTPUTS_CARD_LIST: outputsCardList
    };

    return (
        fetch('http://localhost:9000/lexiconStudio/saveForm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDetails)
        }).then((response) => {
            return response.json();
        }).catch((error) => console.log(error))
    );
};

// Method for fetching the name and the IDs of all the forms
export const fetchFormNameAndID = () => {
    return(
        fetch('http://localhost:9000/lexiconStudio/fetchFormNameAndID', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        })
    );
}

// Method for deleting a specific form
export const deleteForm = (formID) => {
    return(
        fetch(`http://localhost:9000/lexiconStudio/deleteForm/${formID}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }).then(response => {
            return response.json();
        }).catch( error => console.log(error) )
    )
}

// Method for fetching a specific form using formID
export const fetchForm = (formID) => {
    return(
        fetch(`http://localhost:9000/lexiconStudio/fetchForm/${formID}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json", 
            }
        }).then( response => {
            return response.json();
        }).catch( error => console.log(error))
    );
}
