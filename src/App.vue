<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/hello">HelloWorld</router-link></li>
        <li><router-link to="/experience">Experience</router-link></li>
        <li><router-link to="/hotelComponent">Hotel Component</router-link></li>
        <li><router-link to="/HotelExperienceComponent">Hotel Experience</router-link></li>
        <li><router-link to="/ReservationComponent">Reservation</router-link></li>
        <li><router-link to="/UserComponent">User</router-link></li>
        <li><router-link to="/UserPreferenceComponent">User Preference</router-link></li>
        <li><router-link to="/UserRecommendationComponent">User Recommendation</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

 @Options({})
 export default class App extends Vue {}
</script>

<style>
 @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
