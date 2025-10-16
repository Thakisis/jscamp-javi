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