const params = new URLSearchParams(window.location.search); // Get query parameters

const name = params.get("name");
const capital = params.get("capital");
const region = params.get("region");
const subregion = params.get("subregion");
const population = params.get("population");
const flag = params.get("flag");
const languages = params.get("languages");
const currencies = params.get("currencies");

function goBack() {               // New function to go back to index.html
    window.location.href = "index.html";
}

function countryCardDetailHandler() {   // New function to populate country details

    const container = document.getElementById("countryDetail");
        
        container.innerHTML = `
           <div class="country-detail">
                <h2>${name}</h2>

                <img src="${flag}" alt="Flag of ${name}" class="image-container-detail"/>
        
                <div class="country-info-detail">
                <p><strong>Population:</strong> ${Number(population).toLocaleString()}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>Subregion:</strong> ${subregion}</p>
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Currencies:</strong> ${currencies}</p>
                <p><strong>Languages:</strong> ${languages}</p>
                </div>
            
            </div>
            `
};

countryCardDetailHandler(); // Call the function to populate details on page load