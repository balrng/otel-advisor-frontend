<!-- src/views/customer/CustomerHome.vue -->
<template>
    <CustomerLayout>
      <template v-slot>
        <header id="showcase">
          <div class="video-container">
            <video src="https://storage.coverr.co/videos/ArCXsA7fpWfEeR1b00el8BDKpB9LSruhw?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjAzOTg5NDM3fQ.Cwn2KmTYstohUR5pqWiOPFqjjTC3947zkulL-OiHanE" autoplay muted loop></video>
          </div>
          <div class="text-content">
            <div class="logo-text-container">
              <img src="@/assets/logo.png" alt="Logo" class="overlay-logo">
            </div>
            <h1>Benzersiz Deneyimler, Eşsiz Fiyat Garantisi</h1>
            <a href="/customer/search-page" class="btn">Başlayın</a>
          </div>
        </header>
      </template>
    </CustomerLayout>
  </template>
  
  <script>
  import CustomerLayout from './CustomerLayout.vue';
  
  export default {
    name: 'CustomerHome',
    components: {
      CustomerLayout,
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 100%;
    margin-left: 0%;
  }
  
  :root {
    --primary-color: #333;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    line-height: 1.6;
  }
  
  h1 {
    font-family: 'Roboto Slab', serif;
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.2;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
  
  #showcase {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    margin: 0;
    padding: 0;
  }
  
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: none;
  }
  
  .video-container video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border: none;
  }
  
  .video-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .text-content {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0; 
  }
  
  .overlay-logo {
    width: 400px; 
    height: auto; 
    margin-bottom: -60px; 
  }
  
  .btn {
    display: inline-block;
    padding: 7px 20px;
    background: #fff;
    border-radius: 10px;
    border: #333 solid 1px;
    margin-top: 25px;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  
  .btn:hover {
    transform: scale(0.92);
  }
  
  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    height: 500px;
    margin: auto;
    text-align: center;
  }
  
  .about h1 {
    border-bottom: 1px solid #333;
    margin-bottom: 2rem;
  }
  </style>
  