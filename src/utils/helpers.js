
export const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

export const truncateText = (text, maxLength = 230, ending = '...') => {
    if (!text) {
        return '';
    }
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - ending.length) + ending;
};