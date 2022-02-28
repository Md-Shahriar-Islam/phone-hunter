const fetching = () => {
    const searchText = document.getElementById('search-box').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhone(data.data));

}
const showPhone = (data) => {
    const newMobile = data.slice(0, 20);
    const phoneShowCase = document.getElementById('showcase');
    phoneShowCase.textContent = "";
    console.log(newMobile[0]);
    newMobile.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =
            `<div class="card">
            <img src="${mobile.image}" class="card-img-top w-50 pt-3 mx-auto" alt="...">
            <div class="card-body">
                <h3 class="card-title">${mobile.brand}</h3>
                <h4 class="card-text">${mobile.phone_name}r.</h4>
            </div>
        </div>`
        phoneShowCase.appendChild(div);

    });
}