let visibleCount = 12; // 🔑 number of countries to show initially
let currentData = data; // 🔑 to hold the filtered data

function populateCountryCards(data) { // 🔑 function to populate country cards

    const container = document.getElementById("countries"); // Get the container element

    container.innerHTML = ""; // Clear existing content

    const loopCounter = data.length; // Total number of countries in the data
 
    if (visibleCount >= loopCounter) { // Hide "Show More" button if all countries are displayed
        document.getElementById("loadMoreBtn").style.display = "none";
    } else {
        document.getElementById("loadMoreBtn").style.display = "block";
    }

    if (!data || loopCounter === 0) { // Handle case when no data is available
        console.error("No country data available");
    } else {

        data.slice(0, visibleCount).forEach((country, index) => { // Loop through the data up to visibleCount

        const div = document.createElement("div"); // Create a new div for each country card

        div.innerHTML = `
            <div class="country-card" onclick="countryCardHandler(${index})">
                <img src="${country.flags.png}" alt="Flag of ${country.name.official}" class="image-container"/>
                
                <div class="country-info">
                <h2 class="country-name">${country.name.official}</h2>
                <p class="country-population">
                    Population: ${country.population.toLocaleString()}
                </p>
                <p class="country-capital">
                Capital: ${country.capital}
                </p>
                <p class="country-region">Region: ${country.region}</p>
                </div>
            </div>
        `;

        container.appendChild(div); // Append the country card to the container
        console.log(data.length); // Log the length of the data array
    });
    }
}

populateCountryCards(data); // Initial population of country cards

function filterByRegion(region) { // 🔑 function to filter by region
    currentData = data.filter(
        country => region === "All Regions" || country.region === region
    );
    visibleCount = 12;
    populateCountryCards(currentData);

}

function filterData() { // 🔑 function to filter by name, region, and population

    let inputValue = document.getElementById("searchInput").value;
    let regex = /^[a-zA-Z -]*$/; // Regex to allow only letters, spaces, and hyphens

    if (!regex.test (inputValue)){ // Validate input against regex
        alert ("Enter a valid country name");
        return;
    }

        const populationInput = document.getElementById("populationSearch").value;
        const regionInput = document.getElementById("regionFilter").value;
        const searchInput = document.getElementById("searchInput").value.toLowerCase();

        if (populationInput && populationInput >= 1500000000) { // Validate population input
            alert("Country’s population cannot be greater than 1.5 billion.");
            return;
        }

        currentData = data.filter(country => // Filtering logic
            (country.name.official.toLowerCase().includes(searchInput) || country.name.common.toLowerCase().includes(searchInput)) &&
            (regionInput === "All Regions" || country.region === regionInput) &&
            (populationInput === "" || country.population >= parseInt(populationInput)));

        visibleCount = 12; // 🔑 reset
        
        if (currentData.length === 0) { // Handle no matching countries
        const container = document.getElementById("countries");
        container.innerHTML = `
            <div class="country-error">
                <p class="country-message">No country found matching the search criteria.</p>
            </div>
        `;
        document.getElementById("loadMoreBtn").style.display = "none";
        return;
        }

        populateCountryCards(currentData); // Repopulate country cards with filtered data
}

function showMoreHandler() { // 🔑 function to show more countries
    visibleCount += 10;
    populateCountryCards(currentData);
}

function getFormattedNames(languages) { // 🔑 function to format languages and currencies
    return languages.map(languages => languages.name).join(", ");
}

function countryCardHandler(index) { // 🔑 function to handle country card click and navigate to detail page
    const country = currentData[index];
    const container = document.getElementById("countries");
    container.innerHTML = "";
    
    let queryString = "?name="+encodeURIComponent(country.name.official)+
                        "&capital="+encodeURIComponent(country.capital)+
                        "&region="+encodeURIComponent(country.region)+
                        "&subregion="+encodeURIComponent(country.subregion)+
                        "&population="+encodeURIComponent(country.population)+
                        "&flag="+encodeURIComponent(country.flags.png)+
                        "&languages="+encodeURIComponent(getFormattedNames(Object.values(country.languages)))+
                        "&currencies="+encodeURIComponent(getFormattedNames(Object.values(country.currencies)));

    window.location.href = "detail.html" + queryString; // Navigate to detail page with query parameters
}

