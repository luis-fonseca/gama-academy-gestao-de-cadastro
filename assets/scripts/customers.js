document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const submit = form.querySelector('#create');
  const clear = form.querySelector('#clear');
  const tableName = 'customers';

  function insertData(values, tableName) {
    const data = JSON.parse(localStorage.getItem(tableName));
    data.push(values);
    localStorage.setItem(tableName, JSON.stringify(data));
  }

  function hasData(tableName) {
    if (localStorage.hasOwnProperty(tableName)) {
      if (JSON.parse(localStorage.getItem(tableName)).length > 0) {
        return true;
      }
    }

    return false;
  }

  function total() {
    if (localStorage.hasOwnProperty('customers')) {
      return JSON.parse(localStorage.getItem('customers')).length;
    }

    return 0;
  }

  function htmlTableData(tableName) {
    const data = JSON.parse(localStorage.getItem(tableName));
    let html = '';

    data.map((element) => {
      html += `
        <tr>
          <td>${element.name}</td>
          <td>${element.address}</td>
        </tr>
      `;
    });

    return html;
  }

  function updateHTMLTable() {
    const table = document.querySelector('.customers-list table');
    const tbody = table.querySelector('tbody');
    const tfoot = table.querySelector('tfoot td');
    let html = '';

    table.classList.remove('d-none');

    tbody.innerHTML = htmlTableData(tableName);
    tfoot.innerHTML = `Total de clientes cadastrados: ${total(tableName)}`;
  }

  submit.addEventListener('click', (event) => {
    const name = document.querySelector('input[name=name]').value.trim();
    const address = document.querySelector('input[name=address]').value.trim();
    const data = {
      name: name,
      address: address,
    };

    if (name && address) {
      insertData(data, tableName);
      form.reset();

      if (hasData(tableName)) {
        document.querySelector('.customers-list p').classList.add('d-none');
        document.querySelector('.customers-list table').classList.remove('d-none');

        updateHTMLTable();
      }
    } else {
      alert('Obrigatório o preenchimento dos dados.');
    }
  });

  clear.addEventListener('click', (event) => {
    localStorage.setItem(tableName, JSON.stringify([]));

    updateHTMLTable();

    document.querySelector('.customers-list p').classList.remove('d-none');
    document.querySelector('.customers-list table').classList.add('d-none');
  });

  // console.log(hasData(tableName));
  if (hasData(tableName)) {
    document.querySelector('.customers-list p').classList.add('d-none');
    document.querySelector('.customers-list table').classList.remove('d-none');

    updateHTMLTable();
  } else {
    localStorage.setItem(tableName, JSON.stringify([]));
  }
});
