// Countdown Timer
// Countdown Timer
function updateCountdown() {
    // 22 Januari 2026 00:00 WIB 
    // WIB = UTC+7 → jadi UTC = 21 Jan 2026 17:00
    const weddingDate = Date.UTC(2026, 0, 21, 17, 0, 0);

    const now = Date.now();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}


// Initialize countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Open Invitation Function
function openInvitation() {
    const cover = document.getElementById('cover');
    const audio = document.getElementById('bgMusic');

    // Sembunyikan cover
    cover.classList.add('hidden');
    setTimeout(() => {
        cover.style.display = 'none';
    }, 500);

    // Auto play music setelah "Buka Undangan" diklik
    audio.play().catch(() => {
        console.log("Autoplay diblokir browser, user harus klik tombol musik.");
    });
}


// Copy Account Number Function
function copyAccount(accountId, buttonId) {
    const accountNumber = document.getElementById(accountId).textContent;
    const button = document.getElementById(buttonId);
    
    // Copy to clipboard
    navigator.clipboard.writeText(accountNumber).then(function() {
        // Change button text and style
        const originalText = button.textContent;
        button.textContent = '✓ Tersalin!';
        button.parentElement.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(function() {
            button.textContent = originalText;
            button.parentElement.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            button.textContent = '✓ Tersalin!';
            button.parentElement.classList.add('copied');
            
            setTimeout(function() {
                button.textContent = 'Salin Nomor Rekening';
                button.parentElement.classList.remove('copied');
            }, 2000);
        } catch (err) {
            alert('Gagal menyalin. Silakan salin manual: ' + accountNumber);
        }
        
        document.body.removeChild(textArea);
    });
}

// Music Toggle Functionality

let isPlaying = false;
const musicToggle = document.getElementById('musicToggle');
const audio = document.getElementById('bgMusic');

if (musicToggle) {
    musicToggle.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            isPlaying = true;
            this.textContent = '❚❚';  // pause
        } else {
            audio.pause();
            isPlaying = false;
            this.textContent = '♪';    // play
        }
    });
}

document.addEventListener("scroll", function() {
    const el = document.querySelector(".fade-save");
    const pos = el.getBoundingClientRect().top;

    if (pos < window.innerHeight - 100) {
        el.classList.add("show");
    }
});



// Smooth Scroll untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Parallax effect untuk hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 1000) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Optional: Fade in animation saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animation untuk gift cards saat hover
document.querySelectorAll('.gift-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('section:not(.gallery)').forEach(section => {

// Animation untuk gallery items saat scroll

const galleryItems = document.querySelectorAll('.gallery-item');

const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

galleryItems.forEach(item => galleryObserver.observe(item));

});

// Optimasi gambar gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        // Tambahkan loading="lazy" untuk lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Optimasi untuk gambar besar
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Fallback untuk error
        img.addEventListener('error', function() {
            console.log('Gagal memuat gambar:', this.src);
            // Bisa tambahkan gambar placeholder
            // this.src = 'placeholder.jpg';
        });
    });
});
