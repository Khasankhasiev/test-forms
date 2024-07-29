<template>
  <div class="container">
  <div class="form-container">
    <h2>Выбор данных</h2>
    <form @submit.prevent="saveData">
      <div v-if="alertMessage" class="alert">{{ alertMessage }}</div>

      <div class="form-group">
        <label for="city">Город:</label>
        <select id="city" v-model="form.city" @change="updateWorkshops">
          <option value="">Выберите город</option>
          <option v-for="(workshops, city) in cities" :key="city" :value="city">{{ city }}</option>
        </select>
        <div v-if="errors.city" class="alert">{{ errors.city }}</div>
      </div>

      <div class="form-group">
        <label for="workshop">Цех:</label>
        <select id="workshop" v-model="form.workshop" @change="updateEmployees" :disabled="!form.city">
          <option value="">Выберите цех</option>
          <option v-for="(employees, workshop) in filteredWorkshops" :key="workshop" :value="workshop">{{ workshop }}</option>
        </select>
        <div v-if="errors.workshop" class="alert">{{ errors.workshop }}</div>
      </div>

      <div class="form-group">
        <label for="employee">Сотрудник:</label>
        <select id="employee" v-model="form.employee" :disabled="!form.workshop">
          <option value="">Выберите сотрудника</option>
          <option v-for="employee in filteredEmployees" :key="employee" :value="employee">{{ employee }}</option>
        </select>
        <div v-if="errors.employee" class="alert">{{ errors.employee }}</div>
      </div>

      <div class="form-group">
        <label for="brigade">Бригада:</label>
        <select id="brigade" v-model="form.brigade">
          <option value="">Выберите бригаду</option>
          <option v-for="brigade in brigades" :key="brigade" :value="brigade">{{ brigade }}</option>
        </select>
        <div v-if="errors.brigade" class="alert">{{ errors.brigade }}</div>
      </div>

      <div class="form-group">
        <label for="shift">Смена:</label>
        <select id="shift" v-model="form.shift">
          <option value="">Выберите смену</option>
          <option v-for="shift in shifts" :key="shift" :value="shift">{{ shift }}</option>
        </select>
        <div v-if="errors.shift" class="alert">{{ errors.shift }}</div>
      </div>

      <button type="submit" class="btn">Сохранить</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      cities: {
        'Москва': {
          'Цех 1': ['Сотрудник 1', 'Сотрудник 2'],
          'Цех 2': ['Сотрудник 3', 'Сотрудник 4']
        },
        'Санкт-Петербург': {
          'Цех 3': ['Сотрудник 5', 'Сотрудник 6'],
          'Цех 4': ['Сотрудник 7', 'Сотрудник 8']
        }
      },
      brigades: ['Бригада 1', 'Бригада 2'],
      shifts: ['Смена 1', 'Смена 2'],
      form: {
        city: '',
        workshop: '',
        employee: '',
        brigade: '',
        shift: ''
      },
      errors: {
        city: '',
        workshop: '',
        employee: '',
        brigade: '',
        shift: ''
      },
      filteredWorkshops: {},
      filteredEmployees: []
    };
  },
  methods: {
    updateWorkshops() {
      if (!this.form.city) {
        this.errors.city = 'Пожалуйста, выберите город.';
        this.filteredWorkshops = {};
        this.filteredEmployees = [];
        this.form.workshop = '';
        this.form.employee = '';
        return;
      }
      this.errors.city = '';
      this.filteredWorkshops = this.cities[this.form.city];
      this.form.workshop = '';
      this.form.employee = '';
      this.filteredEmployees = [];
    },
    updateEmployees() {
      if (!this.form.city) {
        this.errors.city = 'Пожалуйста, выберите город.';
        this.form.workshop = '';
        this.filteredEmployees = [];
        return;
      }
      if (!this.form.workshop) {
        this.errors.workshop = 'Пожалуйста, выберите цех.';
        this.filteredEmployees = [];
        return;
      }
      this.errors.city = '';
      this.errors.workshop = '';
      this.filteredEmployees = this.filteredWorkshops[this.form.workshop];
    },
    saveData() {
      this.errors = {
        city: '',
        workshop: '',
        employee: '',
        brigade: '',
        shift: ''
      };

      let valid = true;

      if (!this.form.city) {
        this.errors.city = 'Пожалуйста, выберите город.';
        valid = false;
      }
      if (!this.form.workshop) {
        this.errors.workshop = 'Пожалуйста, выберите цех.';
        valid = false;
      }
      if (!this.form.employee) {
        this.errors.employee = 'Пожалуйста, выберите сотрудника.';
        valid = false;
      }
      if (!this.form.brigade) {
        this.errors.brigade = 'Пожалуйста, выберите бригаду.';
        valid = false;
      }
      if (!this.form.shift) {
        this.errors.shift = 'Пожалуйста, выберите смену.';
        valid = false;
      }

      if (valid) {
        const selectedValues = { ...this.form };
        document.cookie = `selectedValues=${JSON.stringify(selectedValues)}; path=/;`;
        alert('Форма успешно отправлена.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
}
.form-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #007BFF;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-group select:focus {
  border-color: #007BFF;
}
.alert {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
