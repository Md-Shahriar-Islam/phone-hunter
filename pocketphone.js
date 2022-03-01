// -------api calling for showcase-----------
const fetching = () => {
    const searchText = document.getElementById('search-box').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhone(data.data))

}


// ------------api calling for details-------------
const fetch_details = (data) => {
    const url = `https://openapi.programming-hero.com/api/phone/${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phone_details(data.data));
}
const phone_details = (data) => {
    // console.log(data);
    //------card body-------
    const cardShow = document.getElementById('card-show');
    cardShow.innerHTML = ``;
    const body = document.createElement('div');
    body.classList.add('card-body');
    const bodyContainingDiv = document.createElement('div');
    bodyContainingDiv.classList.add('col-md-8')
    const { brand, image, name, releaseDate } = data;
    body.innerHTML = `<h3>Brand:${brand}</h3>
    <h4>Name:${name}</h4>`;

    for (const property in data.mainFeatures) {
        const p = document.createElement('p');
        p.innerText = (`${property}: ${data.mainFeatures[property]}`);
        body.appendChild(p);
    }
    for (const property in data.others) {
        const p = document.createElement('p');
        p.innerText = (`${property}: ${data.others[property]}`);
        body.appendChild(p);
    }

    if (releaseDate === undefined || releaseDate === "") {
        const p = document.createElement('p');
        p.innerText = "releaseDate:no release date"
        body.appendChild(p);
    }
    else {
        const p = document.createElement('p');
        p.innerText = `releaseDate:${releaseDate}`
        body.appendChild(p);
    }
    bodyContainingDiv.appendChild(body);
    // ------card image-------
    const imgContainingDiv = document.createElement('div');
    imgContainingDiv.classList.add('col-md-4');
    imgContainingDiv.innerHTML = `<img src="${image}" class="img-fluid rounded-start" alt="...">`
    // -------total containing div-----------
    const divTotal = document.createElement('div');
    divTotal.classList.add("row", "g-0");
    divTotal.appendChild(imgContainingDiv);
    divTotal.appendChild(bodyContainingDiv);
    // ---------html upload-----------

    cardShow.appendChild(divTotal);
}

const showPhone = (data) => {
    if (data.length === 0) {
        const phoneShowCase = document.getElementById('showcase');
        phoneShowCase.textContent = "";
        const cardShow = document.getElementById('card-show');
        cardShow.innerHTML = ``
        const h2 = document.createElement('h2');

        h2.innerText = "sorry your search result not found";
        h2.classList.add("error");


        phoneShowCase.appendChild(h2);
    }
    else {
        const newMobile = data.slice(0, 20);
        const phoneShowCase = document.getElementById('showcase');
        phoneShowCase.textContent = "";
        const cardShow = document.getElementById('card-show');
        cardShow.innerHTML = ``;
        newMobile.forEach(mobile => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML =
                `<div class="card">
                <img src="${mobile.image}" class="card-img-top w-50 pt-3 mx-auto" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-center">${mobile.brand}</h3>
                    <h4 class="card-text text-center">${mobile.phone_name}</h4>
                    <button id="search-button" onClick="fetch_details('${mobile.slug}' )">details</button>
                </div>
            </div>`;
            phoneShowCase.appendChild(div);

        });

    }

}