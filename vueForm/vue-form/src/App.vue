<template>
  <div class="container">
    <div class="form-container">
      <h2>Выбор данных</h2>
      <form @submit.prevent="saveData">
        <div v-if="alertMessage" class="alert">{{ alertMessage }}</div>

        <SelectInput
          id="city"
          label="Город"
          :options="Object.keys(cities)"
          placeholder="Выберите город"
          :modelValue="form.city"
          :errorMessage="errors.city"
          @update:modelValue="form.city = $event"
          @change="updateWorkshops"
        />

        <SelectInput
          id="workshop"
          label="Цех"
          :options="Object.keys(filteredWorkshops)"
          placeholder="Выберите цех"
          :modelValue="form.workshop"
          :errorMessage="errors.workshop"
          :disabled="!form.city"
          @update:modelValue="form.workshop = $event"
          @change="updateEmployees"
        />

        <SelectInput
          id="employee"
          label="Сотрудник"
          :options="filteredEmployees"
          placeholder="Выберите сотрудника"
          :modelValue="form.employee"
          :errorMessage="errors.employee"
          :disabled="!form.workshop"
          @update:modelValue="form.employee = $event"
        />

        <SelectInput
          id="brigade"
          label="Бригада"
          :options="brigades"
          placeholder="Выберите бригаду"
          :modelValue="form.brigade"
          :errorMessage="errors.brigade"
          @update:modelValue="form.brigade = $event"
        />

        <SelectInput
          id="shift"
          label="Смена"
          :options="shifts"
          placeholder="Выберите смену"
          :modelValue="form.shift"
          :errorMessage="errors.shift"
          @update:modelValue="form.shift = $event"
        />

        <button type="submit" class="btn">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
import SelectInput from './SelectInput.vue';

export default {
  components: {
    SelectInput
  },
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
      filteredEmployees: [],
      alertMessage: ''
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

.alert {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
