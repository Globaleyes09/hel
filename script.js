	import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
// Firebase Configuration
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
 
const posts = []; // Array to store posts
const likedPosts = new Set(); // Set to store posts liked by users
 
// Function to upload a post
function uploadPost() {
  let postText = document.getElementById('postInput').value;
 
  // Redirect to Rick Roll if post contains forbidden characters
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
 
// Update dashboard view
function updateDashboard() {
  let postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = "";
 
  // Sort by number of likes
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
        <input type="text" class="input-box" id="commentInput${index}" placeholder="Write a comment...">
        <button class="button" onclick="addComment(${index})">Comment</button>
        <div id="comments${index}">
          ${post.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}
        </div>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}
 
// Function to like a post
function likePost(index) {
  if (!likedPosts.has(index)) {
    posts[index].likes += 1;
    likedPosts.add(index);
    updateDashboard();
  }
}
 
// Function to add a comment
function addComment(index) {
  let commentInput = document.getElementById(`commentInput${index}`);
  let commentText = commentInput.value;
  if (commentText.trim() !== "") {
    posts[index].comments.push(commentText);
    updateDashboard();
  }
}
 
// Placeholder function for search handling
function handleSearch(event) {
  let searchValue = document.getElementById('searchBox').value;
  // Further implementation for search functionality can be added here
}
