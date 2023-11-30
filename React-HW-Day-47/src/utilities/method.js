export const stripHTML = (value) => {
    return value.replace(/<[^>]*>?/gm, '');
}