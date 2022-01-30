<template>
    <table>
        <tr>
            <th>Id</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data urodzenia</th>
            <th>Modyfikacje</th>
        </tr>
        <tr v-for="author in authors" :key="author.id">
            <td>{{ author.id }}</td>

            <td v-if="edited === author.id"><b-form-input v-model="editedFirstname" style="width: 180px; margin: 0" ></b-form-input></td>
            <td v-else>{{ author.firstname }}</td>

            <td v-if="edited === author.id"><b-form-input v-model="editedLastname" style="width: 180px; margin: 0" ></b-form-input></td>
            <td v-else>{{ author.lastname }}</td>

            <td v-if="edited === author.id"><b-form-input v-model="editedBirthDate" style="width: 180px; margin: 0" ></b-form-input></td>
            <td v-else>{{ author.birthDate }}</td>

            <td><b-button variant="primary" @click="editAuthor(author)">{{ edited === author.id ? 'Zapisz' : 'Edytuj' }}</b-button>
            <b-button variant="primary" @click="deleteAuthor(author.id)">Usuń</b-button></td>
        </tr>
    </table>

    <b-col style="width: 20%">
        <form @submit.prevent="addAuthor">
            Imię 
            <b-form-input v-model="firstname"></b-form-input>
            Nazwisko 
            <b-form-input v-model="lastname"></b-form-input>
            Data urodzenia 
            <b-form-input v-model="birthDate"></b-form-input>
            
            <b-button variant="success" type="submit">Dodaj</b-button>
        </form>
    </b-col>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000";

export default {
    async created() {
        const authors = await axios.get(`${baseURL}/authors`); // Pobieranie autorów z serwera backendowego przy tworzeniu instancji komponentu
        this.authors = authors.data; // Przypisanie autorów do lokalnej zmiennej authors
    },
    data() {
        return {
            id: "",
            firstname: "",
            lastname: "",
            birthDate: "",

            editedFirstname: "",
            editedLastname: "",
            editedBirthDate: "",  

            authors: [ ],
            edited: null
        }
    },
    methods: {
        async addAuthor() {
            // Przygotowanie obiektu autora do wysłania (id inkrementuje się samo, NIE WIEM JAK XD pewnie json-server sam to robi)
            const author = { firstname: this.firstname, lastname: this.lastname, birthDate: this.birthDate }

            const res = await axios.post(`${baseURL}/authors`, author); // Wysyłanie (metodą POST) autora do serwera backendowego
            this.authors = [...this.authors, res.data]; // zaktualizowanie zmiennej lokalnej authors - dodanie do niej nowego autora

            this.firstname = ""
            this.lastname = ""
            this.birthDate = ""
        },
        async deleteAuthor(id) {
            await axios.delete(`${baseURL}/authors/${id}`).then(() => {
                this.authors = this.authors.filter(b => b.id !== id)
            })
        },
        async editAuthor(author) {
            if(this.edited === author.id)
            {
                const obj = { id: author.id, firstname: this.editedFirstname, lastname: this.editedLastname, birthDate: this.editedBirthDate }
                await axios.put(`${baseURL}/authors/${author.id}`, obj).then(() => {
                    const idx = this.authors.findIndex(a => a.id === author.id)
                    this.authors[idx] = obj
                })
                this.edited = null
            }
            else
            {
                this.edited = author.id
                this.editedFirstname = author.firstname
                this.editedLastname = author.lastname
                this.editedBirthDate = author.birthDate
            }
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