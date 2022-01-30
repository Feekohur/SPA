<template>
  <div id="nav">
    <router-link to="/authors">Autorzy</router-link> |
    <router-link to="/books">Książki</router-link>
  </div>
  <router-view/>
</template>

<style>
body{
  margin: 0;
  padding: 0;
}

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

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: initial;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 3px 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>
