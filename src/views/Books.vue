<template>

    <b-col style="width: 20%">
        <form>
            Filtr autorów:
            <b-form-select v-model="filter" style="margin: 5px 10px">
                <option value="-1">Bez filtrowania</option>
                <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                    {{ `${option.firstname}  ${option.lastname}` }}
                </option>
            </b-form-select><br/>
        </form>

        <!-- 
            Tu walnij sorta (w podobny sposób jak filter). Podpowiem, że v-model to jest jakby przypisanie inputa do zmiennej
            jak przypisałem filter do tego selecta, to przy zmianie wartości w select(lub innym input), jednocześnie znmienia się
            wartość zmiennej filter
        -->
    </b-col>

    <table>
        <tr>
            <th>Id</th>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>Kategoria</th>
            <th>Wydawca</th>
            <th>Data wydania</th>
            <th>Modyfikacje</th>
        </tr>
        <tr v-for="book in getBooks()" :key="book.id">
                <td>{{ book.id }}</td>

                <td v-if="edited === book.id"><b-form-input v-model="editedTitle" style="width: 180px; margin: 0" ></b-form-input></td>
                <td v-else>{{ book.title }}</td>

                <td v-if="edited === book.id">
                    <b-form-select v-model="editedAuthorId" style="width: 180px; margin: 0">
                        <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                            {{ `${option.firstname}  ${option.lastname}` }}
                        </option>
                    </b-form-select>
                </td>
                <td v-else>{{ getAuthorName(book.authorId) }}</td>

                <td v-if="edited === book.id"><b-form-input v-model="editedCategory" style="width: 180px; margin: 0" ></b-form-input></td>
                <td v-else>{{ book.category }}</td>

                <td v-if="edited === book.id"><b-form-input v-model="editedPublisher" style="width: 180px; margin: 0" ></b-form-input></td>
                <td v-else>{{ book.publisher }}</td>

                <td v-if="edited === book.id"><b-form-input v-model="editedReleaseDate" style="width: 180px; margin: 0" ></b-form-input></td>
                <td v-else>{{ book.releaseDate }}</td>

                <td><b-button variant="primary" @click="editBook(book)">{{ edited === book.id ? 'Zapisz' : 'Edytuj' }}</b-button>
                <b-button variant="primary" @click="deleteBook(book.id)">Usuń</b-button></td>
        </tr>
    </table>

    <b-col style="width: 20%">
        <form @submit.prevent="addBook">
            Tytuł 
            <b-form-input v-model="title"></b-form-input>
            Autor 
            <b-form-select v-model="authorId" style="margin: 5px 10px">
                <option disabled value="">Wybierz autora</option>
                <option v-for="option in authors" v-bind:value="option.id" :key="option.id">
                    {{ `${option.firstname}  ${option.lastname}` }}
                </option>
            </b-form-select>
            Data wydania 
            <b-form-input v-model="releaseDate"></b-form-input>

            <b-button variant="success" type="submit">Dodaj</b-button>
        </form>
    </b-col>
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
            category: "",
            publisher: "",
            releaseDate: "",

            editedTitle: "",
            editedAuthorId: "",
            editedCategory: "",
            editedPublisher: "",
            editedReleaseDate: "",

            edited: null,
            books: [ ],
            authors: [ ],

            filter: -1,
            sort: -1
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

            const book = { title: this.title, 
                            authorId: this.authorId, 
                            category: this.category,
                            publisher: this.publisher, 
                            releaseDate: this.releaseDate }

            await axios.post(`${baseURL}/books`, book).then(res => {
                this.books = [...this.books, res.data];

                this.title = ""
                this.authorId = ""
                this.category = ""
                this.publisher = ""
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
                const obj = { id: book.id, 
                                title: this.editedTitle, 
                                authorId: this.editedAuthorId, 
                                category: this.editedCategory,
                                publisher: this.publisher,
                                releaseDate: this.editedReleaseDate }
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
                this.editedCategory = book.editedCategory
                this.editedPublisher = book.editedPublisher
                this.editedReleaseDate = book.releaseDate
            }
        },
        getBooks() {
            let tempBooks = this.books;

            if(this.filter > -1)
                tempBooks = tempBooks.filter(b => b.authorId == this.filter)
            
            // tu sortowanie, jeśli -1 to niech nie sortuje (podobnie jak filter)

            return tempBooks
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