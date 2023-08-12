function createCalendar(elem, year, month) {

  let mon = month - 1;
  let date = new Date(year, mon);

  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

  for (let i = 0; i < getDay(date); i++) {
    table += '<td></td>';
  }


  while (date.getMonth() == mon) {
    table += '<td>' + date.getDate() + '</td>';

    if (getDay(date) % 7 == 6) { // pazarsa new line
      table += '<tr></tr>';
    }

    date.setDate(date.getDate() + 1);
  }

  if (getDay(date) != 0) {
    for (let i = getDay(date); i < 7; i++) {
      table += '<td></td>';
    }
  }

  table += '</tr></table>';

  elem.innerHTML = table;

  // pazartesi değilse

  const cells = elem.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {
      this.classList.toggle('selected');
      if (this.innerHTML !== '') {
        let dateContainer = document.createElement('div');
        const clickedDate = new Date(year, month - 1, parseInt(this.innerHTML));
        dateContainer.textContent = `${clickedDate.getDate()}.${clickedDate.getMonth() + 1}.${clickedDate.getFullYear()}`;
        dateContainer.className = "dateContainer"
        document.body.appendChild(dateContainer);
      }
    });
  }


}

function getDay(date) {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
}

function showCalendar() {
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    alert('Lütfen geçerli bir ay ve yıl girin.');
    return false;
  }

  createCalendar(document.getElementById('calendar'), year, month);


  return false;

}
