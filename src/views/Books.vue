<template>
    <table>
        <tr>
            <th>Id</th>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>Data wydania</th>
            <th>Modyfikacje</th>
        </tr>
        <tr v-for="book in books" :key="book.id">
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ getAuthorName(book.authorId) }}</td>
            <td>{{ book.releaseDate }}</td>
            <td>Edytuj | <button @click="deleteBook(book.id)">Usuń</button></td>
        </tr>
    </table>

    <form @submit.prevent="addBook">
        Tytuł <input v-model="title"><br/>
        Autor <select v-model="authorId">
                <option disabled value="">Wybierz autora</option>
                <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                    {{ `${option.firstname}  ${option.lastname}` }}
                </option>
            </select><br/>
        Data wydania <input v-model="releaseDate"><br/>
        <button type="submit">Dodaj</button>
    </form>
</template>

<script>
import axios from "axios";

const booksURL = "http://localhost:3000/books";
const authorsURL = "http://localhost:3000/authors";

export default {
    async created() {
        const books = await axios.get(booksURL);
        this.books = books.data; 

        const authors = await axios.get(authorsURL);
        this.authors = authors.data; 
    },
    data() {
        return {
            id: "",
            title: "",
            authorId: "",
            releaseDate: "",
            books: [ ],
            authors: [ ]
        }
    },
    methods: {
        getAuthor(id) {
            return this.authors.find(a => a.id == id)
        },
        getAuthorName(id) {
            let author = this.getAuthor(id)
            if(author != null) 
                return `${author.firstname} ${author.lastname}`
            else
                return ""
        },
        async addBook() {
            if(typeof this.authorId != 'number')
                return

            const book = { title: this.title, authorId: this.authorId, releaseDate: this.releaseDate }

            await axios.post(booksURL, book).then(res => {
                this.books = [...this.books, res.data];

                this.title = ""
                this.authorId = ""
                this.releaseDate = ""
            })
        },
        async deleteBook(id) {
            await axios.delete(`${booksURL}/${id}`).then(() => {
                this.books = this.books.filter(b => b.id !== id)
            })
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