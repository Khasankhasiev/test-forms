document.addEventListener('DOMContentLoaded', () => {
   const cities = {
       'Москва': {
           'Цех 1': ['Сотрудник 1', 'Сотрудник 2'],
           'Цех 2': ['Сотрудник 3', 'Сотрудник 4']
       },
       'Санкт-Петербург': {
           'Цех 3': ['Сотрудник 5', 'Сотрудник 6'],
           'Цех 4': ['Сотрудник 7', 'Сотрудник 8']
       }
   };

   const citySelect = document.getElementById('city');
   const workshopSelect = document.getElementById('workshop');
   const employeeSelect = document.getElementById('employee');
   const brigadeSelect = document.getElementById('brigade');
   const shiftSelect = document.getElementById('shift');
   const alertBox = document.getElementById('alert');

   // Populate city dropdown
   for (const city in cities) {
       const option = document.createElement('option');
       option.value = city;
       option.text = city;
       citySelect.add(option);
   }

   // Handle city change
   citySelect.addEventListener('change', () => {
       alertBox.textContent = ''; // Clear any previous alert
       workshopSelect.innerHTML = '<option value="">Выберите цех</option>';
       employeeSelect.innerHTML = '<option value="">Выберите сотрудника</option>';

       const selectedCity = citySelect.value;
       if (selectedCity) {
           const workshops = cities[selectedCity];
           for (const workshop in workshops) {
               const option = document.createElement('option');
               option.value = workshop;
               option.text = workshop;
               workshopSelect.add(option);
           }
       }
   });

   // Handle workshop change
   workshopSelect.addEventListener('click', () => {
       if (!citySelect.value) {
           alertBox.textContent = 'Пожалуйста, выберите город.';
           return;
       }
   });

   workshopSelect.addEventListener('change', () => {
       alertBox.textContent = ''; // Clear any previous alert
       employeeSelect.innerHTML = '<option value="">Выберите сотрудника</option>';

       const selectedCity = citySelect.value;
       const selectedWorkshop = workshopSelect.value;
       if (selectedCity && selectedWorkshop) {
           const employees = cities[selectedCity][selectedWorkshop];
           employees.forEach(employee => {
               const option = document.createElement('option');
               option.value = employee;
               option.text = employee;
               employeeSelect.add(option);
           });
       }
   });

   // Handle employee change
   employeeSelect.addEventListener('click', () => {
       if (!workshopSelect.value) {
           alertBox.textContent = 'Пожалуйста, выберите цех.';
           return;
       }
   });

   // Save selected values to Cookie in JSON format
   document.getElementById('saveButton').addEventListener('click', () => {
       if (!citySelect.value || !workshopSelect.value || !employeeSelect.value) {
           alertBox.textContent = 'Пожалуйста, заполните все поля.';
           return;
       }

       alertBox.textContent = ''; // Clear any previous alert
       const selectedValues = {
           city: citySelect.value,
           workshop: workshopSelect.value,
           employee: employeeSelect.value,
           brigade: brigadeSelect.value,
           shift: shiftSelect.value
       };
       document.cookie = `selectedValues=${JSON.stringify(selectedValues)}; path=/;`;
       alert('Значения сохранены в Cookie');
   });
});