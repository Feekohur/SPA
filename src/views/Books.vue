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

                <td v-if="edited === book.id"><input v-model="editedTitle" ></td>
                <td v-else>{{ book.title }}</td>

                <td v-if="edited === book.id">
                    <select v-model="editedAuthorId">
                        <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                            {{ `${option.firstname}  ${option.lastname}` }}
                        </option>
                    </select>
                </td>
                <td v-else>{{ getAuthorName(book.authorId) }}</td>

                <td v-if="edited === book.id"><input v-model="editedReleaseDate" ></td>
                <td v-else>{{ book.releaseDate }}</td>

                <td><button @click="editBook(book)">{{ edited === book.id ? 'Zapisz' : 'Edytuj' }}</button>
                | <button @click="deleteBook(book.id)">Usuń</button></td>
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

    <form>
        Wybierz autora, którego chcesz wyświetlić książki <select v-model="authorId">
                <option disabled value="">Wybierz autora</option>
                <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                    {{ `${option.firstname}  ${option.lastname}` }}
                </option>
            </select><br/>
        <button @click.prevent="filterBook(authorId)">Filtruj</button>
    </form>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000";

export default {
    async created() {
        const books = await axios.get(`${baseURL}/books`);
        this.books = books.data; 

        const authors = await axios.get(`${baseURL}/authors`);
        this.authors = authors.data; 
    },
    data() {
        return {
            id: "",
            title: "",
            authorId: "",
            releaseDate: "",

            editedTitle: "",
            editedAuthorId: "",
            editedReleaseDate: "",

            edited: NaN,
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

            await axios.post(`${baseURL}/books`, book).then(res => {
                this.books = [...this.books, res.data];

                this.title = ""
                this.authorId = ""
                this.releaseDate = ""
            })
        },
        async deleteBook(id) {
            await axios.delete(`${baseURL}/books/${id}`).then(() => {
                this.books = this.books.filter(b => b.id !== id)
            })
        },
        async editBook(book) {
            if(this.edited === book.id)
            {
                const obj = { id: book.id, title: this.editedTitle, authorId: this.editedAuthorId, releaseDate: this.editedReleaseDate }
                await axios.put(`${baseURL}/books/${book.id}`, obj).then(() => {
                    const idx = this.books.findIndex(b => b.id === book.id)
                    this.books[idx] = obj
                })
                this.edited = null
            }
            else
            {
                this.edited = book.id
                this.editedTitle = book.title
                this.editedAuthorId = book.authorId
                this.editedReleaseDate = book.releaseDate
            }
        },
        async filterBook(id){
            let newbooks = await axios.get(`${baseURL}/books`);
            this.books = newbooks.data;
            this.books = this.books.filter(b => b.authorId == id)
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