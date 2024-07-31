<template>
    <div>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/experienceSelection">Experience Selection</router-link></li>
          <li><router-link to="/searchForm">Search Form</router-link></li>
        </ul>
      </nav>
      <main>
        <slot></slot>
      </main>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CustomerLayout',
  });
  </script>
  
  <style scoped>
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline;
    margin-right: 10px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #42b983;
  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  