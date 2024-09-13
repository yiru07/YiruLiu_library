<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>

        <h1>All Books</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="deleteBook(book.id)">Delete</button>
                <button @click="enableEdit(book)">Edit</button>
            </li>
        </ul>

        <div v-if="editingBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook">
                <label for="name">Name:</label>
                <input type="text" v-model="editingBook.name" id="name" required />
                <br />
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="editingBook.isbn" id="isbn" required />
                <br />
                <button type="submit">Update Book</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, getDocs,query, where, addDoc, doc, deleteDoc, updateDoc, orderBy, limit  } from 'firebase/firestore'

export default {
    setup() {
        const isbn = ref('')
        const name = ref('')
        const books = ref([])
        const editingBook = ref(null)


        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value)
                if (isNaN(isbnNumber)) {
                    alert('ISBN should be a number')
                    return
                }

                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value
                })

                isbn.value = ''
                name.value = ''
                fetchBooks()
                alert('Book added successfully')
            } catch (error) {
                console.log('Error adding book: ', error)
            }
        }

        const fetchBooks = async () => {
            try {
                const q = query(collection(db, 'books'),where('isbn', '>', 10), orderBy('name'),limit(5))
                const querySnapshot = await getDocs(q)
                const booksArray = []
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() })
                })
                books.value = booksArray
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }




        const deleteBook = async (id) => {
            try {
                await deleteDoc(doc(db, 'books', id))
                books.value = books.value.filter((book) => book.id !== id)
                alert('Book deleted successfully')
            } catch (error) {
                console.error('Error deleting book:', error)
            }
        }


        const enableEdit = (book) => {
            editingBook.value = { ...book }
        }


        const updateBook = async () => {
            try {
                const isbnNumber = Number(editingBook.value.isbn)
                if (isNaN(isbnNumber)) {
                    alert('ISBN should be a number')
                    return
                }

                const bookRef = doc(db, 'books', editingBook.value.id)
                await updateDoc(bookRef, {
                    name: editingBook.value.name,
                    isbn: isbnNumber
                })

                const index = books.value.findIndex((book) => book.id === editingBook.value.id)
                if (index !== -1) {
                    books.value[index] = { ...editingBook.value }
                }

                editingBook.value = null
                alert('Book updated successfully')
            } catch (error) {
                console.error('Error updating book:', error)
            }
        }

        onMounted(() => {
            fetchBooks()
        })

        return {
            isbn,
            name,
            books,
            editingBook,
            addBook,
            deleteBook,
            enableEdit,
            updateBook
        }
    }
}
</script>

<style scoped></style>
