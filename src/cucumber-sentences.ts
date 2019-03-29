const regexToString = (regex: RegExp) => {
    return regex.toString()
    .replace(/^\/\^?/, '')
    .replace(/\$?\//, '')
    .replace(/\\\"/g, '"');
};

export const getSampleCucumberSentences = () => {
    const sampleRegex = /^the user opens the application son a (desktop|mobile|tablet) using the following link: \"(.*)\"$/;
    return [
        regexToString(sampleRegex)
    ];
};