import { offerCard, tagSpan } from './data/html-functions.js';

import jobListings from './data/ofertas.js';
const filters = loadParam();
const filtersContainer = document.getElementById('filters-container');


function loadParam() {

    const paramsObject = Object.fromEntries(new URLSearchParams(location.search))
    Object.entries(paramsObject).forEach(([key, value]) => {
        const selectElement = document.querySelector(`select[name="${key}"]`);
        if (selectElement) selectElement.value = value;

    });
    return {}
}

filtersContainer.addEventListener('change', (event) => {
    const select = event.target.closest('select');
    const name = select?.name;

    if (!select || !name) return;
    const value = select.value;
    filters[name] = value;

    if (!value) delete filters[name];

    renderfilters(filters);
    setParams(name, value);

});


function setParams(name, value) {

    const params = new URLSearchParams(window.location.search);
    params.set(name, value);

    if (!value) params.delete(name);
    window.history.pushState({}, '', `?${params.toString()}`);
}

renderOffers(jobListings);

function renderfilters(filters) {

    const jobsfilter = jobListings.filter(job =>
        Object.entries(filters).reduce((match, [key, value]) => {
            const matchValue = job[key].includes(value);
            return match && matchValue;
        }, true)
    )

    renderOffers(jobsfilter);
}
function renderOffers(jobs) {

    const jobsContainer = document.getElementById('jobs');
    const nodes = jobs.map(job => renderOffer(job));
    jobsContainer.replaceChildren(...nodes);

}


function renderOffer({ tag, technology, ...job }) {

    const jobCard = offerCard(job)
    const offerNode = new DOMParser().parseFromString(jobCard, 'text/html').body.firstChild;
    const tagsContainger = offerNode.querySelector('#tags');
    const tags = technology.map(tagSpan)
    const tagsNode = tags.map(tag => new DOMParser().parseFromString(tag, 'text/html').body.firstChild);
    tagsContainger.append(...tagsNode);

    return offerNode;

}

