const Form = require('../models/form');

// method for creating new forms in Lexicon studio
exports.createForm = async (req, res, next) => {

    const new_form = new Form({
        name: req.body.FORM_NAME,
        metaCardList: req.body.META_CARD_LIST,
        inputsCardList: req.body.INPUTS_CARD_LIST,
        outputsCardList: req.body.OUTPUTS_CARD_LIST
    });

    await new_form.save((err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            return res.status(200).json({ ...result._doc, _id: result.id });
        }
    });
};

// method for fetching all the forms from database
exports.fetchFormNameAndID = async ( req, res, next ) => {
    const Form_Name_And_ID = await Form.find().select('_id name');

    if (!Form_Name_And_ID){
        return res.status(400).json({ error: err });
    } else {
        return res.status(200).json({ output: Form_Name_And_ID });
    }
};

// method for deleting a specific form using ID
exports.deleteForm = async (req, res, next) => {
    try {
        const formID = req.params['formID'];
        const formToBeDeleted = await Form.findById(formID);
        await Form.deleteOne({ _id: formToBeDeleted._id });
        return res.status(200).json({ message: 'Form deleted successfully !' });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// method for fetching a specific form using its ID
exports.fetchForm = async ( req, res, next ) => {
    try {
        const formID = req.params['formID'];
        const resultantForm = await Form.findById(formID);
        console.log(resultantForm);
        return res.status(200).json({ form: resultantForm });
    } catch (err) {
        return res.status(400).json({error: err});
    }
};


exports.main = async ( req, res, next ) => {
    try {
        return res.status(200).send("<div style='background: #1e90ff; padding: 20px; width: 80px;'>It's working</div>");
    } catch (err) {
        return res.status(400).json({error: err});
    }
}
