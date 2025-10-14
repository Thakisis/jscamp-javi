const filters = {}
const filtersContainer = document.getElementById('filters-container');

filtersContainer.addEventListener('change', (event) => {
    const select = event.target.closest('select');
    const name = select?.name;

    if (!select || !name) return;
    const value = select.value;
    filters[name] = value;
    if (!value) delete filters[name];
    console.log(filters);
    renderfilters(filters);

});

function renderfilters(filters) {
    const offers = document.querySelectorAll('.job-listing-card');
    offers.forEach((offer) => {
        const data = offer.dataset;
        const isMatch = Object.entries(filters).reduce((match, [key, value]) => {
            const matchValue = data[key].split(",").includes(value);
            return match && matchValue;
        }, true);

        offer.style.display = isMatch ? 'block' : 'none';
    });
}