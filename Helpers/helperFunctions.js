class HelperFunctions {
    static getPagination = (page, size) => {
        const limit = size ? +size : 2;
        const offset = page && page > 1 ? (page - 1) * limit : 0;
        return { limit, offset };
    };

    static getPagingData = (query, page, limit) => {
        const { count: totalItems, rows: data } = query;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, data, totalPages, currentPage };
    };
}
module.exports = HelperFunctions;
