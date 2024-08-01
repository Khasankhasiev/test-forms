<template>
   <div class="form-group">
     <label :for="id">{{ label }}</label>
     <select :id="id" :value="modelValue" @input="handleInput" :disabled="disabled">
       <option value="">{{ placeholder }}</option>
       <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
     </select>
     <div v-if="errorMessage" class="alert">{{ errorMessage }}</div>
   </div>
 </template>
 
 <script>
 export default {
   props: {
     id: String,
     label: String,
     options: Array,
     placeholder: String,
     modelValue: String,
     errorMessage: String,
     disabled: Boolean
   },
   methods: {
     handleInput(event) {
       this.$emit('update:modelValue', event.target.value);
       this.$emit('change');
     }
   }
 };
 </script>
 
 <style scoped>
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
 </style>
 