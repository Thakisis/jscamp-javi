const boton = document.querySelector(".button-apply-job");


//console.info("El script se ha cargado correctamente.");

// botones.addEventListener("click", () => {
//     // alert("¡Gracias por tu interés! \nSerás redirigido a la página de aplicación.");
//     // console.log("Esto funciona solo al darle click al botón")
//     // boton.textContent = "¡Aplicado!";
//     // boton.style.backgroundColor = "#4CAF50"; // Cambia el color de fondo a verde
//     // boton.style.color = "white";   
//     // boton.classList.add("b"); // Agrega una clase para estilos adicionales
//     // boton.style.cursor = "not-allowed"; // Cambia el cursor a no permitido
//     // boton.disabled = true; // Deshabilita el botón para evitar múltiples clics 

// });

// 2da manera de hacerlo

// const botones = document.querySelectorAll(".button-apply-job");
// // console.log(botones);

// botones.forEach(boton => {
//     boton.addEventListener("click", function () {
//         // alert("¡Gracias por tu interés! \nSerás redirigido a la página de aplicación.");
//         boton.textContent = "¡Aplicado!";
//         boton.classList.add("is-applied");
//         boton.disabled = true; // Deshabilita el botón para evitar múltiples clics
//     });
// });




// 3ra manera de hacerlo -  copilot pro
// const jobsListingSection = document.querySelector(".jobs-listing");
// jobsListingSection.addEventListener("click", function (e) {
//     if (e.target.classList.contains("button-apply-job")) {
//         // alert("¡Gracias por tu interés! \nSerás redirigido a la página de aplicación.");
//         e.target.textContent = "¡Aplicado!";
//         e.target.classList.add("is-applied");
//         e.target.disabled = true; // Deshabilita el boton para evitar múltiples clics
//     }
// })

// 3ra manera de hacerlo -  midudev
// propragacion de eventos
// interceptar el evento en un elemento padre
// y determinar si el elemento que lo origino es el que nos interesa
const jobsListingsSection = document.querySelector(".jobs-listings");

// encadenamiento opcional - jobsListingsSection?
// si jobsListingsSection es null o undefined no se ejecuta el addEventListener
// si tiene un valor valido si se ejecuta el addEventListener
// previene errores en tiempo de ejecucion
// es buena practica usarlo cuando no estamos seguros si el elemento existe en el DOM

jobsListingsSection.addEventListener("click", function (event) {
    const element = event.target

    if (element.classList.contains("button-apply-job")) {
        // alert("¡Gracias por tu interés! \nSerás redirigido a la página de aplicación.");
        // console.info('Click en el boton');
        element.textContent = "¡Aplicado!";
        element.classList.add("is-applied");
        element.disabled = true; // Deshabilita el boton para evitar múltiples clics
        element.pointerEvents = "none"; // Deshabilita el boton para evitar múltiples clics
        element.style.cursor = "not-allowed"; // Cambia el cursor a no permitido
    }
})



// Obtener Referencias del DOM
// 1. Elementos de la Búsqueda (Input y Botón)
const txtSearch = document.querySelector("#txt-search");
const btnSearch = document.querySelector("#btn-search");
const btnReset = document.querySelector("#btn-reset");

// 2. Obtener Filtros (Selects)
const filterTecnology = document.querySelector("#filter-technology");
const filterLocation = document.querySelector("#filter-location");
const filterExperience = document.querySelector("#filter-experience");
const filterContractType = document.querySelector("#filter-contract-type");

// 3. Obtener ListaTrabajos
const jobsList = document.querySelector(".jobs-listings");
const form = document.querySelector("#form");

// 4. Obtener empleos del DOM
let jobs = [];


function extractJobsFromDOM() {
    const jobCards = document.querySelectorAll(".job-listing-card");
    const extractedJobs = [];

    jobCards.forEach((card, index) => {
        const jobTitle = card.querySelector("h3").textContent;
        const jobDescription = card.querySelector("p").textContent.trim();
        const smallInfo = card.querySelector("small").textContent;

        const smallInfoSubstring = smallInfo.split("|");

        const jobCompany = smallInfoSubstring[0].trim();
        const jobLocation = smallInfoSubstring[1].trim();
        const jobTechnology = card.querySelector(".tag").textContent.trim().toLowerCase();


        const jobExperience = card.dataset.experience ? card.dataset.experience : '';
        const jobContractType = card.dataset.contract ? card.dataset.contract :'';

        // Obtener localización del empleo
        let jobLocationValue = '';
        const lowerLocation = jobLocation.toLowerCase();

        if (lowerLocation.includes('remoto')) jobLocationValue = 'remoto';
        else if (lowerLocation.includes('guadalajara')) jobLocationValue = 'gdl';
        else if (lowerLocation.includes('ciudad')) jobLocationValue = 'cdmx';
        else if (lowerLocation.includes('monterrey')) jobLocationValue = 'mty';
        else if (lowerLocation.includes('barcelona')) jobLocationValue = 'barc';
        else if (lowerLocation.includes('madrid')) jobLocationValue = 'madrid';
        // else if (lowerLocation.includes('otro')) jobLocationValue = 'otro';
        // else if (lowerLocation.includes('presencial')) jobLocationValue = 'presencial';
        // else if (lowerLocation.includes('hybrid')) jobLocationValue = 'hybrid';

        // Obtener experiencia del empleo
        let jobExperienceValue = '';
        const lowerExperience = jobExperience.toLowerCase();

        if (lowerExperience.includes('junior')) jobExperienceValue = 'junior';
        else if (lowerExperience.includes('senior')) jobExperienceValue = 'senior';
        else if (lowerExperience.includes('semi')) jobExperienceValue = 'mid';
        else if (lowerExperience.includes('mid')) jobExperienceValue = 'mid';

        // Obtener tipo de contrato del empleo
        let jobContractTypeValue = '';
        const lowerContractType = jobContractType.toLowerCase();

        if (lowerContractType.includes('fulltime')) jobContractTypeValue = 'fulltime';
        else if (lowerContractType.includes('part')) jobContractTypeValue = 'parttime';
        else if (lowerContractType.includes('contract')) jobContractTypeValue = 'contract';
        else if (lowerContractType.includes('internship')) jobContractTypeValue = 'internship';


        // Crear objeto de empleo
        const jobObject = {
            id: index + 1,
            title: jobTitle,
            company: jobCompany,
            location: jobLocationValue,
            technology: jobTechnology,
            experience: jobExperienceValue,
            contractType: jobContractTypeValue,
            description: jobDescription,
            smallInfo: smallInfo
        };

        extractedJobs.push(jobObject);

    });

    jobs = extractedJobs;

    jobsList.innerHTML = '';

    return jobs;
}


document.addEventListener("DOMContentLoaded", () => {
    extractJobsFromDOM();

    showJobs(jobs);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchJobs();
    });


    filterTecnology.addEventListener('change', searchJobs);
    filterLocation.addEventListener('change', searchJobs);
    filterExperience.addEventListener('change', searchJobs);
    filterContractType.addEventListener('change', searchJobs);


    txtSearch.addEventListener('input', searchJobs);

    btnReset.addEventListener('click', () => {
        clearFilters();
    });

});




function searchJobs() {

    const activeFilters = {
        search: txtSearch.value.toLowerCase(),
        technology: filterTecnology.value,
        location: filterLocation.value,
        experience: filterExperience.value,
        contractType: filterContractType.value,
    };

    let filteredJobs = jobs;

    if (activeFilters.search) {
        filteredJobs = filteredJobs.filter(job => {
            const searchTerms = activeFilters.search;
            return job.title.toLowerCase().includes(searchTerms) ||
                job.description.toLowerCase().includes(searchTerms)  ||
                job.smallInfo.toLowerCase().includes(searchTerms);
        });
    }

    if (activeFilters.technology) {
        filteredJobs = filteredJobs.filter(job =>
            job.technology === activeFilters.technology
        );
    }

    if (activeFilters.location) {
        filteredJobs = filteredJobs.filter(job =>
            job.location === activeFilters.location
        );
    }

    if (activeFilters.experience) {
        filteredJobs = filteredJobs.filter(job =>
            job.experience === activeFilters.experience
        );
    }

    if (activeFilters.contractType) {
        filteredJobs = filteredJobs.filter(job =>
            job.contractType === activeFilters.contractType
        );
    }
    showJobs(filteredJobs);
}



function showJobs(jobsArray) {
    jobsList.innerHTML = '';

    if (jobsArray.length === 0) {
        jobsList.innerHTML = `
        <div class="job-listing-card" style="padding: 2rem; text-align: center; margin: 0 auto; color:var(--text-muted) !important;>
            <div class="job-listing-card-content">
                <h3 class="job-listing-card-title">No hay resultados para tu búsqueda</h3>
                <p >No se encontraron ofertas que coincidan con tus criterios de búsqueda.</p>
            </div>
        </div>
        `;
        return;
    }

    jobsArray.forEach(job => {
        const cardHTML = `
            <article 
                class="job-listing-card"
                data-experience="${job.experience}" 
                data-contract="${job.contractType}"
            > 
                <div class="job-listing-content">
                    <h3>${job.title}</h3>
                    
                    <small>${job.smallInfo} </small>
                    <p>${job.description}</p>
                    <span class="tag">${job.technology.toUpperCase()}</span>
                </div>
                <button class="button-apply-job">Aplicar</button>
            </article>
        `;

        // Añadir el nuevo HTML al contenedor
        jobsList.insertAdjacentHTML('beforeend', cardHTML);
    });
}



function clearFilters() {
    filterTecnology.value = '';
    filterLocation.value = '';
    filterExperience.value = '';
    filterContractType.value = '';
    txtSearch.value = '';
}

// filterTecnology.addEventListener('change', function () {
//     console.log(filterTecnology.value)
// })

// btnSearch.addEventListener('click', function () {
//     //console.log(txtSearch.value)
//     if (txtSearch.value === null || txtSearch.value === '' || txtSearch.value.trim() === '') {
//         alert('Ingrese un texto valido');
//     }
// })
// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     // console.log('submit');
//     // console.log(event);
//     // console.log(event.target);
//     // console.log(event.target.elements);
//     // console.log(event.target.elements.txtSearch.value);
//     // console.log(event.target.elements['txt-search'].value);
//     // console.log(event.target.elements['filter-technology'].value);

//     // console.info(txtSearch.value);
//     // console.info(filterTecnology.value);
//     // console.info(filterLocation.value);
//     // console.info(filterExperience.value);
//     // console.info(filterContractType.value);
//     searchJobs();
// })



// function validateForm() {
//     if (txtSearch.value === null || txtSearch.value === '' || txtSearch.value.trim() === '') {
//         txtSearch.classList.add('is-invalid');
//     }
// }

// //validateForm()
// 