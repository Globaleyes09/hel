import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Konfigurasi Firebase
const firebaseConfig = {
 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3NsDflVffHtPMkFNErjVFtdkMJPV_LRc",
  authDomain: "global-eyes-5aed0.firebaseapp.com",
  projectId: "global-eyes-5aed0",
  storageBucket: "global-eyes-5aed0.firebasestorage.app",
  messagingSenderId: "311874273981",
  appId: "1:311874273981:web:633a16de160e67d0ca2dd4",
  measurementId: "G-E0FN2LVX21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const posts = []; // Array untuk menyimpan postingan
const likedPosts = new Set(); // Set untuk menyimpan postingan yang sudah di-like oleh user

// Fungsi untuk mengunggah postingan
function uploadPost() {
  let postText = document.getElementById('postInput').value;
  
  // Jika teks mengandung karakter terlarang, redirect ke Rick Roll
  if (/[<>/:]/.test(postText)) {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    return;
  }

  if (postText.trim() !== "") {
    let post = { text: postText, likes: 0, comments: [] };
    posts.push(post);
    updateDashboard();
    document.getElementById('postInput').value = "";
  }
}

// Memperbarui tampilan dashboard
function updateDashboard() {
  let postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = "";
  
  // Urutkan berdasarkan jumlah like
  posts.sort((a, b) => b.likes - a.likes);
  posts.forEach((post, index) => {
    let postElement = document.createElement('div');
    postElement.classList.add('card');
    postElement.innerHTML = `
      <p>${post.text}</p>
      <div class="buttons">
        <button class="like-btn" onclick="likePost(${index})" ${likedPosts.has(index) ? 'disabled' : ''}>❤️ ${post.likes}</button>
      </div>
      <div class="comment-box">
        <input type="text" class="input-box" id="commentInput${index}" placeholder="Tulis komentar...">
        <button class="button" onclick="addComment(${index})">Komentar</button>
        <div id="comments${index}">
          ${post.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}
        </div>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Fungsi untuk memberikan like ke postingan
function likePost(index) {
  if (!likedPosts.has(index)) {
    posts[index].likes += 1;
    likedPosts.add(index);
    updateDashboard();
  }
}

// Fungsi untuk menambahkan komentar
function addComment(index) {
  let commentInput = document.getElementById(`commentInput${index}`);
  let commentText = commentInput.value;
  if (commentText.trim() !== "") {
    posts[index].comments.push(commentText);
    updateDashboard();
  }
}

// Fungsi untuk menangani pencarian
function handleSearch(event) {
  let searchValue = document.getElementById('searchBox').value;
  
  // Jika teks mengandung karakter terlarang, redirect ke Rick Roll
  if (/[<>/:]/.test(searchValue)) {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    return;
  }
  
  if (event.key === 'Enter') {
    alert('Pencarian untuk: ' + searchValue);
  }
}
