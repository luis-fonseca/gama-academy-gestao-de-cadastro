document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const submit = form.querySelector('#create');
  const clear = form.querySelector('#clear');
  const tableName = 'products';

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

  function total(tableName) {
    if (localStorage.hasOwnProperty(tableName)) {
      return JSON.parse(localStorage.getItem(tableName)).length;
    }

    return 0;
  }

  function htmlTableData(tableName) {
    const data = JSON.parse(localStorage.getItem(tableName));
    let html = '';
    // console.log(data);

    data.map((obj) => {
      html += '<tr>';
      for (const prop in obj) {
        html += `<td>${obj[prop]}</td>`;
      }
      html += '</tr>';
    });

    return html;
  }

  function updateHTMLTable() {
    const table = document.querySelector('.products-list table');
    const tbody = table.querySelector('tbody');
    const tfoot = table.querySelector('tfoot td');

    table.classList.remove('d-none');

    tbody.innerHTML = htmlTableData(tableName);
    tfoot.innerHTML = `Total de produtos cadastrados: ${total(tableName)}`;
  }

  submit.addEventListener('click', (event) => {
    const name = document.querySelector('input[name=name]').value.trim();
    const quantity = document.querySelector('input[name=quantity]').value.trim();
    const data = {
      name: name,
      quantity: quantity,
    };

    if (name && quantity) {
      insertData(data, tableName);
      form.reset();

      if (hasData(tableName)) {
        document.querySelector('.products-list p').classList.add('d-none');
        document.querySelector('.products-list table').classList.remove('d-none');

        updateHTMLTable();
      }
    } else {
      alert('Obrigatório o preenchimento dos dados.');
    }
  });

  clear.addEventListener('click', (event) => {
    localStorage.setItem(tableName, JSON.stringify([]));

    updateHTMLTable();

    document.querySelector('.products-list p').classList.remove('d-none');
    document.querySelector('.products-list table').classList.add('d-none');
  });

  // console.log(hasData(tableName));
  if (hasData(tableName)) {
    document.querySelector('.products-list p').classList.add('d-none');
    document.querySelector('.products-list table').classList.remove('d-none');

    updateHTMLTable();
  } else {
    localStorage.setItem(tableName, JSON.stringify([]));
  }
});
