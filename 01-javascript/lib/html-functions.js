import { locations, experienceLevels, technologies, contractTypes } from './textos.js';

export const offerCard = ({ id, title, company, location, description }) => `<article class="job-listing-card" >
            <div class="job-listing-content" id="contenido">
                <h3>${title}</h3>
                <small>${company} | ${keyName(locations, location)}</small>
                <p>${description}</p>
                <div id="tags">
                </div>
                
            </div>
            <button class="button-apply-job">Aplicar</button>
        </article>`

export const tagSpan = (name) => `<span class="tag">${keyName(technologies, name)}</span>`


function keyName(dictionary, key) {

    return dictionary.find(item => item.key === key).name;

}


function prevIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>`
}
function nextIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>`
}
