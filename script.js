// Mobile Menu Toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.style.height === "350px") {
      navLinks.style.height = "0";
    } else {
      navLinks.style.height = "350px";
    }
  });

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active nav link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Chat Widget Functionality
const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatClose = document.getElementById("chat-close");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");

chatToggle.addEventListener("click", function () {
  chatBox.classList.toggle("active");
});

chatClose.addEventListener("click", function () {
  chatBox.classList.remove("active");
});

function addMessage(text, isReceived) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(isReceived ? "received" : "sent");
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener("click", function () {
  const message = chatInput.value.trim();
  if (message) {
    addMessage(message, false);
    chatInput.value = "";

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "Selamat pagi",
        "",
        "I'd be happy to help with that. What's your timeline?",
        "Great question! Let me think about the best approach.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, true);
    }, 1000);
  }
});

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    chatSend.click();
  }
});

// CV Modal Functionality
const downloadCvBtn = document.getElementById("download-cv-btn");
const cvModal = document.getElementById("cv-modal");
const cvModalClose = document.getElementById("cv-modal-close");
const downloadPdf = document.getElementById("download-pdf");
const downloadImage = document.getElementById("download-image");

downloadCvBtn.addEventListener("click", function () {
  cvModal.classList.add("active");
});

cvModalClose.addEventListener("click", function () {
  cvModal.classList.remove("active");
});

downloadPdf.addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "PDF download would start here. In a real implementation, this would link to your actual CV PDF file."
  );
});

downloadImage.addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Image download would start here. In a real implementation, this would link to your actual CV image file."
  );
});

// Close modal when clicking outside
cvModal.addEventListener("click", function (e) {
  if (e.target === cvModal) {
    cvModal.classList.remove("active");
  }
});

// YOUTUBE MODAL FUNCTIONALITY

const ytEmbedLinks = [
  "https://www.youtube.com/embed/SLUrjbmeHvI?si=WGWQWMBYLc4cEzK6", // Video 1
  "https://www.youtube.com/embed/fMOrDWYQCjM?si=bCGf6mplVoBVsxAJ", // Video 2
  "https://www.youtube.com/embed/Gt6sYIu_XbE?si=jaSoWoNMResUrg-6", // Video 3
  "https://www.youtube.com/embed/CgffPoW8mEQ?si=h40MQbpqW9SCFGTU", // Video 4
  "https://www.youtube.com/embed/jiDhYnvGZZo?si=c-8-pM9r69iHpWHb", // Video 5
];

// ===============================================
// 2. Mendapatkan Elemen-elemen DOM
// ===============================================
// Tombol-tombol pemicu (semua elemen dengan class 'live-button')
const liveButtons = document.querySelectorAll(".live-button");

// Modal dan elemen di dalamnya
const ytModal = document.getElementById("yt-modal");
const ytCloseButton = document.getElementById("yt-modal-close");
const ytIframe = document.getElementById("yt-show");

// ===============================================
// 3. Fungsi untuk Memuat Video dan Membuka Modal
// ===============================================
/**
 * Membuka modal dan memuat link embed YouTube yang sesuai.
 * @param {number} index - Indeks (posisi) video dalam array ytEmbedLinks.
 */
function openYoutubeModal(index) {
  // Pastikan indeks berada dalam batas array
  if (index >= 0 && index < ytEmbedLinks.length) {
    const embedUrl = ytEmbedLinks[index];

    // Memuat URL embed ke dalam iframe.
    // Parameter '&autoplay=1' ditambahkan agar video otomatis diputar saat modal terbuka.
    ytIframe.src = embedUrl + "?autoplay=1";

    // Menampilkan modal (asumsi Anda menggunakan class 'yt-modal' untuk menampilkannya dengan CSS display: block/flex)
    ytModal.style.display = "flex";

    // Logika tambahan untuk fokus ke modal (opsional)
    ytModal.focus();

    console.log(`Memuat video untuk Tombol ${index + 1}: ${embedUrl}`);
  } else {
    console.error(`Indeks video ${index} di luar jangkauan.`);
  }
}

// ===============================================
// 4. Fungsi untuk Menutup Modal dan Menghentikan Video
// ===============================================
function closeYoutubeModal() {
  // Menyembunyikan modal
  ytModal.style.display = "none";

  // Menghentikan video dengan mengatur ulang atribut 'src' iframe
  // Cara terbaik untuk menghentikan video YouTube adalah dengan mengosongkan src
  ytIframe.src = "";

  console.log("Modal YouTube ditutup dan video dihentikan.");
}

// ===============================================
// 5. Menghubungkan Tombol-tombol dengan Logika (Event Listeners)
// ===============================================

// a. Listener untuk Tombol-tombol live-button
liveButtons.forEach((button, index) => {
  // 'index' sesuai dengan posisi tombol, yang juga sesuai dengan indeks link di array ytEmbedLinks
  button.addEventListener("click", () => {
    openYoutubeModal(index);
  });
});

// b. Listener untuk Tombol Tutup
ytCloseButton.addEventListener("click", closeYoutubeModal);

// c. Listener untuk menutup modal ketika mengklik di luar konten (opsional)
ytModal.addEventListener("click", (event) => {
  // Jika elemen yang diklik adalah modal itu sendiri (bukan konten di dalamnya)
  if (event.target === ytModal) {
    closeYoutubeModal();
  }
});

// d. Listener untuk menutup modal dengan tombol ESC (opsional)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && ytModal.style.display === "flex") {
    closeYoutubeModal();
  }
});

// FUNCTIONALITY INSTAGRAM
const instagramLinks = [
  "https://www.instagram.com/p/DMcGot0zrKC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Link ke-1 (Indeks 0)
  "https://www.instagram.com/p/DMkumeMzYnd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Link ke-2 (Indeks 1)
  "https://www.instagram.com/p/DNU1XjlTgKQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Link ke-3 (Indeks 2)
];

// 2. Mendapatkan semua tombol berdasarkan class
const buttons = document.querySelectorAll(".button-instagram");

// 3. Menghubungkan Tombol dengan Link menggunakan Index
buttons.forEach((button, index) => {
  // 'index' adalah posisi tombol yang diklik (0, 1, atau 2)

  button.addEventListener("click", () => {
    // Cek apakah indeks tombol sesuai dengan indeks link yang tersedia
    if (index < instagramLinks.length) {
      const targetLink = instagramLinks[index];

      // Membuka link di tab baru
      window.open(targetLink, "_blank");

      console.log(`Tombol ${index + 1} diklik. Membuka link: ${targetLink}`);
    } else {
      console.error("Link Instagram tidak ditemukan untuk tombol ini.");
    }
  });
});

// // Contact Form Submission
// document
//   .getElementById("contact-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     alert("Thank you for your message! I will get back to you soon.");
//     this.reset();
//   });

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        // Reset animation by removing and re-adding the class
        bar.style.animation = "none";
        void bar.offsetWidth; // Trigger reflow
        bar.style.animation = "slideIn 1.5s ease-out forwards";
      });
    }
  });
}, observerOptions);

// Observe the skills section
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// // Number
// const numberElement = document.querySelector("#number");

// // Ambil nilai kunjungan sebelumnya dari LocalStorage
// let visits = localStorage.getItem("visits");

// if (!visits) {
//   visits = 0; // kalau belum ada data, mulai dari 0
// } else {
//   visits = parseInt(visits, 10);
// }

// // Tambah 1 kunjungan setiap kali halaman dimuat
// visits++;

// // Simpan nilai kunjungan baru ke LocalStorage
// localStorage.setItem("visits", visits);

// // Update tampilan angka di halaman
// numberElement.textContent = visits;



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    // API_ENDPOINT menunjuk ke Serverless Function Node.js di Vercel
    // Karena dihosting di domain yang sama, gunakan path relatif.
    const API_ENDPOINT = '/api/send-telegram'; 

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 1. Kumpulkan data formulir
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // UI Feedback
        formStatus.textContent = 'Sending...';
        formStatus.style.color = 'gray';
        submitButton.disabled = true;

        // 2. Kirim data ke API Node.js (Backend)
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formStatus.textContent = 'Pesan berhasil terkirim';
                formStatus.style.color = 'green';
                form.reset(); // Kosongkan formulir
            } else {
                formStatus.textContent = `Gagal mengirim: ${data.message}`;
                formStatus.style.color = 'red';
                console.error('API Error:', data.message);
            }
        })
        .catch(error => {
            formStatus.textContent = 'Terjadi kesalahan koneksi jaringan atau server.';
            formStatus.style.color = 'red';
            console.error('Network Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            if (formStatus.textContent === 'Sending...') {
                 submitButton.textContent = 'Send Message';
            }
        });
    });
});