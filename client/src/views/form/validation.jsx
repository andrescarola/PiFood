const validate = (form) => {

    let errors = {};

    if (!form.title) {
        errors.title = 'Please provide a title to your recipe'
    }
    else {
        errors.title = ''
    };

    if (form.summary === '') {
        errors.summary = 'Please provide a summary to your recipe'
    }
    else {
        errors.summary = ''
    };

    if (form.healthScore === '' || isNaN(form.healthScore)) {
        errors.healthScore = 'Please provide a valid health score to your recipe'
    } else if (form.healthScore < 0 || form.healthScore > 100) {
        errors.healthScore = 'The score must be a number between 0 and 100'
    } else {
        errors.healthScore = ''
    };

    if (form.instructions === '') {
        errors.instructions = 'Please provide the instructions to prepare your recipe'
    }
    else {
        errors.instructions = ''
    };
    
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
    const isValidUrl = urlRegex.test(form.image);

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const isValidFile = allowedExtensions.test(form.image);

    if (form.image === '') {
        errors.image = 'Please provide an URL to upload a photo.'

    } else if (!isValidUrl && !isValidFile) {
        errors.image = 'Please provide a valid image URL or file extension (.jpg. / .jpeg / .png / .gif)'
    } else {
        errors.image = ''
    };

    return errors;
};


export default validate;