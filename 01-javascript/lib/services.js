export async function getOffers({ page = 1, limit = 4, ...filters } = {}) {
    try {
        const response = await fetch('./api/ofertas.json');
        if (!response.ok) {
            throw new Error(`Error al cargar ofertas: ${response.status}`);
        }

        const data = await response.json();
        const datafilter = data.filter(job =>
            Object.entries(filters).reduce((match, [key, value]) => {
                const matchValue = job[key].includes(value);
                return match && matchValue;
            }, true)
        )
        console.log(datafilter);
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = datafilter.slice(start, end);

        return {
            page,
            limit,
            total: datafilter.length,
            totalPages: Math.ceil(datafilter.length / limit),
            offers: paginatedData
        };

    } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        return {
            page,
            limit,
            total: 0,
            totalPages: 0,
            offers: [],
            error: error.message
        };
    }
}
