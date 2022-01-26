<template>
    <table>
        <tr>
            <th>Id</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data urodzenia</th>
        </tr>
        <tr v-for="author in authors" :key="author.id">
            <td>{{ author.id }}</td>
            <td>{{ author.firstname }}</td>
            <td>{{ author.lastname }}</td>
            <td>{{ author.birthDate }}</td>
        </tr>
    </table>

    <form @submit.prevent="addAuthor">
        Imię <input v-model="firstname"><br/>
        Nazwisko <input v-model="lastname"><br/>
        Data urodzenia <input v-model="birthDate"><br/>
        <button type="submit">Dodaj</button>
    </form>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/authors";

export default {
    async created() {
        const authors = await axios.get(baseURL); // Pobieranie autorów z serwera backendowego przy tworzeniu instancji komponentu
        this.authors = authors.data; // Przypisanie autorów do lokalnej zmiennej authors
    },
    data() {
        return {
            id: "",
            firstname: "",
            lastname: "",
            birthDate: "",
            authors: [ ]
        }
    },
    methods: {
        async addAuthor() {
            // Przygotowanie obiektu autora do wysłania (id inkrementuje się samo, NIE WIEM JAK XD pewnie json-server sam to robi)
            const author = { firstname: this.firstname, lastname: this.lastname, birthDate: this.birthDate }

            const res = await axios.post(baseURL, author); // Wysyłanie (metodą POST) autora do serwera backendowego
            this.authors = [...this.authors, res.data]; // zaktualizowanie zmiennej lokalnej authors - dodanie do niej nowego autora

            this.firstname = ""
            this.lastname = ""
            this.birthDate = ""
        }
    }
}
</script>

<style scoped>
table {
    margin: 10px;
}
input {
    margin: 5px 10px;
}
button {
    margin: 10px;
}
</style>