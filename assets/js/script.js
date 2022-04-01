const data = {
    "insurances": [{
        "id": 3322,
        "name": "Amil"
    }, {
        "id": 3293,
        "name": "Bradesco"
    }, {
        "id": 99231,
        "name": "Hapvida"
    }, {
        "id": 1322,
        "name": "CASSI"
    }, {
        "id": 23111,
        "name": "Sulamérica"
    }],
    "guides": [{
        "number": "3210998321",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 9321123,
            "name": "Augusto Ferreira",
            "thumb_url": "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2019/10/04/794834/20191004154953157610i.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 5567.2
    }, {
        "number": "287312832",
        "start_date": "2021-04-23T19:18:47.210Z",
        "patient": {
            "id": 93229123,
            "name": "Caio Carneiro",
            "thumb_url": "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg"
        },
        "insurane_id": 1322,
        "health_insurance": {
            "id": 1322,
            "name": "CASSI",
            "is_deleted": false
        },
        "price": 213.3
    }, {
        "number": "283718273",
        "start_date": "2021-04-22T19:18:47.210Z",
        "patient": {
            "id": 213122388,
            "name": "Luciano José",
            "thumb_url": "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 88.99
    }, {
        "number": "009090321938",
        "start_date": "2021-04-20T19:18:47.210Z",
        "patient": {
            "id": 3367263,
            "name": "Felício Santos",
            "thumb_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU"
        },
        "insurane_id": 3293,
        "health_insurance": {
            "id": 3293,
            "name": "Bradesco",
            "is_deleted": true
        },
        "price": 828.99
    }, {
        "number": "8787128731",
        "start_date": "2021-04-01T19:18:47.210Z",
        "patient": {
            "id": 777882,
            "name": "Fernando Raposo"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 772
    }, {
        "number": "12929321",
        "start_date": "2021-04-02T19:18:47.210Z",
        "patient": {
            "id": 221,
            "name": "Paciente com nome grande pra colocar text ellipsis testando nome com paciente grande"
        },
        "insurane_id": 3322,
        "health_insurance": {
            "id": 3322,
            "name": "Amil",
            "is_deleted": false
        },
        "price": 221
    }]
};

const dataGuides = data.guides;
const dataInsurances = data.insurances;

let accumulator = [];

function selectUser(value) {
    if (!accumulator.includes(value)) {
        accumulator.push(value);
    } else {
        const index = accumulator.indexOf(value);
        accumulator.splice(index, 1);
    }
};

let array = dataGuides;
let items = [];

pagination(1);

function pagination(value) {
    let pageQuery = value;
    let page = parseInt(pageQuery) || 1;
    let limit = 2;
    let offset = (page - 1) * limit;
    let total = array.length;
    items = array.slice(offset, offset + limit);

    let pageSize = Math.ceil(total/limit);

    let _pagination = {
        page: page,
        total: total,
        limit: limit,
        pages: pageSize
    };

    const paginationResult = _pagination;
    let paginationItems = '';

    for (let i = 0; i < paginationResult.pages; i++) {
        let active = page === (i + 1) ? 'active' : '';
        paginationItems += `<button class="pagination_link ${active}" onclick="button(${i + 1})">${i + 1}</button>`
    };

    document.getElementById('pagination').innerHTML = paginationItems;
    renderTable(items);
};

function button(value){
    pagination(value);
};

function renderTable(guides) {
    const tbody = document.getElementById('tbody');
    let html = '';

    guides.forEach(guide => {
        html += `
            <tr>
                <td><input type="checkbox" class="adjust-checkbox" value="${guide.number}" onchange="selectUser(${guide.number})" ${accumulator.includes(parseInt(guide.number)) ? "checked" : "unchecked"}></td>
                <td>${new Date(guide.start_date).toLocaleDateString('pt-br')}</td>
                <td>${guide.number}</th>
                <td class="ellipsis"><img class="img" src="${guide.patient.thumb_url || 'https://via.placeholder.com/150x150.jpg'}">${guide.patient.name}</td>
                <td class="text-center ${guide.health_insurance.is_deleted ? 'risk' : ''}">${guide.health_insurance.name}</td>
                <td class="text-end">${guide.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
                `
    });

    if (!guides.length) {
        html += `<tr><td colspan="6" style="text-align: center;">Nenhuma guia encontrada!</td></tr>`
    };

    tbody.innerHTML = html;
};

function selectInsurances(insurances) {
    const select = document.getElementById('select');
    let option = `<option value="">Selecione</option>`;

    insurances.forEach(insurance => {
        option += `<option value="${insurance.id}">${insurance.name}</option>`
    });

    select.innerHTML = option;
};
selectInsurances(dataInsurances);

const dateStart = document.getElementById('dateStart');
const dateEnd = document.getElementById('dateEnd');

const buttonMonth = document.getElementById('buttonMonth');
const buttonToday = document.getElementById('buttonToday');

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getUTCFullYear();

buttonMonth.addEventListener('click', function () {
    dateStart.value = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-01`;
    dateEnd.value = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-30`;
    filter();
});

buttonToday.addEventListener('click', function () {
    dateStart.value = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentYear < 10 ? '0' + currentDay : currentDay}`;
    dateEnd.value = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentYear < 10 ? '0' + currentDay : currentDay}`;
    filter();
});

function filter() {
    const searchGuides = document.getElementById('search').value;
    const searchInsurances = document.getElementById('select').value;
    const normalizeSearchGuides = searchGuides.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const normalizeDateStart = new Date(dateStart.value);
    const normalizeDateEnd = new Date(dateEnd.value);

    if (!normalizeSearchGuides && !searchInsurances && !dateStart.value && !dateEnd.value) {
        array = dataGuides;
        pagination();

        let pageQuery = 1;
        let page = parseInt(pageQuery) || 1;
        let limit = 2;
        let offset = (page - 1) * limit;
        let items = dataGuides.slice(offset, offset + limit);

        return renderTable(items);
    }

    const filterGuides = dataGuides.filter(guide => {
        const normalizeName = guide.patient.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const normalizeDate = new Date(guide.start_date);
        const idGuide = guide.insurane_id;
        const number = guide.number;

        if (accumulator.includes(parseInt(number))) {
            return true;
        }

        if ((dateStart.value && dateEnd.value) && !searchInsurances && !normalizeSearchGuides && normalizeDate >= normalizeDateStart && normalizeDate <= normalizeDateEnd) {
            return true;
        }

        if ((dateStart.value && dateEnd.value) && searchInsurances && !normalizeSearchGuides && normalizeDate >= normalizeDateStart && normalizeDate <= normalizeDateEnd && idGuide === ~~searchInsurances) {
            return true;
        }

        if ((dateStart.value && dateEnd.value) && !searchInsurances && normalizeSearchGuides && normalizeDate >= normalizeDateStart && normalizeDate <= normalizeDateEnd && (normalizeName.includes(normalizeSearchGuides) || number.includes(normalizeSearchGuides))) {
            return true;
        }

        if ((dateStart.value && dateEnd) && searchInsurances && normalizeSearchGuides && normalizeDate >= normalizeDateStart && normalizeDate <= normalizeDateEnd && idGuide === ~~searchInsurances && (normalizeName.includes(normalizeSearchGuides) || number.includes(normalizeSearchGuides))) {
            return true;
        }

        if (!(dateStart.value && dateEnd.value) && searchInsurances && !normalizeSearchGuides && idGuide === ~~searchInsurances) {
            return true;
        }

        if (!(dateStart.value && dateEnd.value) && !searchInsurances && normalizeSearchGuides && (normalizeName.includes(normalizeSearchGuides) || number.includes(normalizeSearchGuides))) {
            return true;
        }

        if (!(dateStart.value && dateEnd.value) && searchInsurances && normalizeSearchGuides && idGuide === ~~searchInsurances && (normalizeName.includes(normalizeSearchGuides) || number.includes(normalizeSearchGuides))) {
            return true;
        }

        return false;
    });

    array = filterGuides;
    pagination();

    let pageQuery = 1;
    let page = parseInt(pageQuery) || 1;
    let limit = 2;
    let offset = (page - 1) * limit;
    let items = filterGuides.slice(offset, offset + limit);

    renderTable(items);
};