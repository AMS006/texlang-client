import axios from "axios";

export const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('texlang-auth-token')}`
}
export const calculateDuration = (file, type) => {
    return new Promise((resolve) => {
        const mediaElement = document.createElement(type);
        mediaElement.src = URL.createObjectURL(file);

        mediaElement.onloadedmetadata = () => {
            const duration = mediaElement.duration;
            URL.revokeObjectURL(mediaElement.src);
            resolve(duration);
        };
    });
};
export const generateFileData = (file, timeStamp, value, user, fileSize) => {
    const format = file.name.split('.').pop()
    const date = new Date(Number(timeStamp))

    const fileData = {
        wordCount: 0,
        value,
        name: file.name,
        size: fileSize[file.name],
        format,
        sourceLanguage: "English",
        targetLanguage: [],
        contentType: "translation",
        filePath: `${user.companyName.split(' ').join('_')}/${user.id}/${date}/${file.name}`
    }
    return fileData
}