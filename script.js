const container = document.getElementById("countries");

  loopCounter = data.length;

  if (!data || loopCounter === 0) {
    console.error("No country data available");
  } else {

    data.slice(0, 12).forEach(country => {

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="country-card">
            <img src="${country.flags.png}" alt="Flag of ${country.name.official}" class="image-container"/>
            
            <div class="country-info">
            <h2 class="country-name">${country.name.official}</h2>
            <p class="country-population">
                Population: ${country.population.toLocaleString()}
            </p>
            <p class="country-capital">Capital: ${country.capital}</p>
            <p class="country-region">Region: ${country.region}</p>
            </div>
        </div>
    `;

    container.appendChild(div);
  });
}
