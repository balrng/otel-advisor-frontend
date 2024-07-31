<!-- src/views/agency/AdminHome.vue -->
<template>
    <AdminLayout>
      <template v-slot>
        <div class="admin-home">
          <h1>Welcome to the Admin Panel</h1>
          <div class="stats">
            <div class="stat">
              <h3>Users</h3>
              <p>1500</p>
            </div>
            <div class="stat">
              <h3>Reservations</h3>
              <p>300</p>
            </div>
            <div class="stat">
              <h3>Hotels</h3>
              <p>80</p>
            </div>
            <div class="stat">
              <h3>Experiences</h3>
              <p>120</p>
            </div>
          </div>
          <div class="charts">
            <h3>Recent Activities</h3>
            <!-- Placeholder for charts -->
            <p>Graph or Chart showing recent activities</p>
          </div>
          <div class="recent-activities">
            <h3>Recent Reservations</h3>
            <ul>
              <li>Reservation #1234 by John Doe</li>
              <li>Reservation #1235 by Jane Smith</li>
              <!-- More reservations -->
            </ul>
          </div>
          <div class="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link to="/hotel">Manage Hotels</router-link></li>
              <li><router-link to="/user">Manage Users</router-link></li>
              <li><router-link to="/reservation">Manage Reservations</router-link></li>
            </ul>
          </div>
        </div>
      </template>
    </AdminLayout>
  </template>
  
  <script>
  import AdminLayout from './AdminLayout.vue';
  
  export default {
    name: 'AdminHome',
    components: {
      AdminLayout,
    },
  };
  </script>
  
  <style scoped>
  .admin-home {
    text-align: center;
  }
  
  .stats {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  
  .stat {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 10px;
    width: 20%;
  }
  
  .charts {
    margin: 20px 0;
  }
  
  .recent-activities {
    margin: 20px 0;
    text-align: left;
  }
  
  .recent-activities ul {
    list-style-type: none;
    padding: 0;
  }
  
  .quick-links {
    margin: 20px 0;
    text-align: left;
  }
  
  .quick-links ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  