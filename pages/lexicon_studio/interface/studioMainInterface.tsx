interface studioMainState {
    totalInputScore: number
    saveFormDialogBoxOptions: any,
    error: {
        occurence: boolean,
        message: string
    }
    prevState?: any,
    viewSavedFormsDialogBox: any,
    previewMode: boolean,
    displayCardAdditionToast: boolean,
    cardDeleteConfirmation: boolean,
    cardDeleteModalDisplay: boolean,
    viewSavedFormsMenu: boolean,
    displayTotalInputScore: boolean,
    showSideBarMenu: boolean,
    objectToBeDeleted: any | null,
    formulaValues: string,
    inputsList: any[],
    metaList: any[],
    outputsList: any[]
    savedFormsList: any[],
    setState?: (prevState?: any) => any
}

export default studioMainState;
