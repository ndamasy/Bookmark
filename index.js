var siteName = document.getElementById('siteNameInput');
var siteUrl = document.getElementById('siteUrlInput');
var updatedData = document.getElementById('site-updated-data');
var visitBtn = document.getElementById('visit');
var deleteBtn = document.getElementById('delete');
var invalidForm = document.getElementById('invalidForm');


var siteData = [];

if (localStorage.getItem('siteData') != null) {
    siteData = JSON.parse(localStorage.getItem('siteData'));
    displayBookmark()
}

function saveData() {
    localStorage.setItem('siteData', JSON.stringify(siteData));
}

function addSiteData() {
    var site = {
        name: siteName.value,
        address: siteUrl.value
    }

    if (siteName.classList.contains('is-valid') && siteUrl.classList.contains('is-valid')) {
        siteData.push(site);
        clearInput();
        saveData();
        displayBookmark();
    } else {
        invalidForm.classList.remove('d-none');
    }

}

function clearInput() {
    siteName.value = '';
    siteUrl.value = '';
}

function displayBookmark() {
    var bookMrk = '';
    for (var i = 0; i < siteData.length; i++) {
        bookMrk += `
        <tr>
            <td>${i + 1}</td>
            <td>${siteData[i].name}</td>
            <td>
                <a id="visit" type="button" href="${siteData[i].address}" target="_blank" class="btn  ">
                    <i class="fa-solid fa-eye me-2"></i>
                    Visit
                </a>
            </td>
            <td>
                <button id="delete" type="button" class="btn btn-danger" onclick="deleteBoomark(${i})">
                    <i class="fa-solid fa-trash-can me-2"></i>
                    Delete
                </button>
            </td>
        </tr>
    `
    }

    updatedData.innerHTML = bookMrk;
}

function deleteBoomark(index) {
    if (siteData[index] != null) {
        siteData = siteData.slice(0, index).concat(siteData.slice(index + 1));
        saveData();
        displayBookmark();
    }
}

function vaidateBookmark(element) {
    var regex = {
        siteNameInput: /^[A-Z].+/,
        siteUrlInput: /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
    }

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');


    } else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        element.nextElementSibling.classList.remove('d-none');


    }

}



