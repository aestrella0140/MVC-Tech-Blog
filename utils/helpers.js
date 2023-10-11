module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    format_comment: (comment) => {
        return parseInt(comment).toLocaleString();
    },
};