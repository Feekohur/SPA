<template>
  <div id="nav">
    <router-link to="/authors">Autorzy</router-link> |
    <router-link to="/books">Książki</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav { 
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

table, th, td {
  border: 1px solid black;
  padding: 10px;
}

table {
  border-collapse: collapse;
}
</style>
