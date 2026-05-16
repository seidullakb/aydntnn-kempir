// --- DATA CONFIGURATION ---
const quizData = [
    { question: "WHO IS THE MAIN CHARACTER?", options: ["YOU", "STAY MAD", "DEFINITELY YOU"], correct: 0 },
    { question: "КАНША ЖЫЛ КАЛДЫ?", options: ["20", "80", "67"], correct: 1 }
];

const auraFails = [
    { text: "ШЫМКЕНТТЕН БУРГЕР АКЕМЕДИН", loss: -500000 },
    { text: "ПЕПСИ ИШЕСИН", loss: -200000 },
    { text: "ТУНДЕ УКТАМАЙСЫН", loss: -150000 },
    { text: "ЖЫЛАУЫК", loss: -670000 }
];

const hypePhrases = ["МАЛАДЕС", "ЛЕГЕНДА", "МАШ-ИНА", "АУРА ГЕНЕРАТОР", "ОРГАНИЗАТОРША"];
let currentQuestion = 0;
let currentTrackIndex = 0;
// Replace your old 'const tracks = [...]' with this:
const tracks = [
    { file: 'music/Daisies — Justin Bieber.mp3', name: "Daisies — Justin Bieber" },
    { file: 'music/Beauty and a Beat — Justin Bieber (feat. Nicki Minaj).mp3', name: "Beauty and a Beat — Justin Bieber" },
    { file: 'music/Eenie Meenie — Sean Kingston & Justin Bieber.mp3', name: "Eenie Meenie — Justin Bieber" },
    { file: 'music/Timber — Pitbull (feat. Ke$ha).m4a', name: "Timber — Pitbull" },
    { file: 'music/Lush Life - Zara Larsson.m4a', name: "Lush Life - Zara Larsson" },
    { file: 'music/Closer — The Chainsmokers (feat. Halsey).mp3', name: "Closer — The Chainsmokers" }
];

const bgMusic = document.getElementById('bg-music');

function togglePlay() {
    const audio = document.getElementById('bg-music'); // Fixed missing definition
    const record = document.getElementById('vinyl-record');
    const btn = document.getElementById('play-pause');

    if (!audio.src || audio.src === "" || audio.src.includes('song1.mp3')) {
        playMusic(tracks[currentTrackIndex]);
        return;
    }

    if (audio.paused) {
        audio.play();
        record.classList.remove('paused');
        record.classList.add('spinning');
        btn.innerText = '⏸';
    } else {
        audio.pause();
        record.classList.add('paused');
        btn.innerText = '⏵';
    }
}
function playMusic(trackObj) {
    const audio = document.getElementById('bg-music');
    const record = document.getElementById('vinyl-record');
    const trackDisplay = document.getElementById('current-track');
    const btn = document.getElementById('play-pause');

    if (!trackObj) return;

    audio.src = trackObj.file;
    audio.load();
    
    audio.play().then(() => {
        if (trackDisplay) {
            trackDisplay.innerText = `Track: ${trackObj.name}`;
            // Reset animation to start from the right again
            trackDisplay.style.animation = 'none';
            trackDisplay.offsetHeight; /* trigger reflow */
            trackDisplay.style.animation = null; 
        }
        record.classList.remove('paused');
        record.classList.add('spinning');
        const playerContainer = document.getElementById('vinyl-player-container');
playerContainer.classList.add('playing');
playerContainer.classList.remove('hidden-player'); // Чтобы плеер сам открылся, если заиграла музыка

        btn.innerText = "⏸";
    }).catch(e => console.error("Playback error:", e));
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playMusic(tracks[currentTrackIndex]);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playMusic(tracks[currentTrackIndex]);
}

// --- LOGIN & DATE LOGIC ---
function checkDate() {
    const input = document.getElementById('date-input');
    const rawVal = input.value.replace(/\D/g, ''); 
    playClick();

    if (rawVal === "08052006") {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('secret-content').style.display = 'block';
        nextChap(1); 
    } else {
        document.getElementById("glitch-overlay").classList.remove("hidden");
    }
}

function appendNum(num) {
    const input = document.getElementById('date-input');
    if (input.value.length < 8) {
        input.value += num; 
        playClick();
        updateHeartDisplay();
    }
}

function backspace() {
    const input = document.getElementById('date-input');
    input.value = input.value.slice(0, -1);
    playClick();
    updateHeartDisplay();
}

function updateHeartDisplay() {
    const input = document.getElementById('date-input');
    const charCount = input.value.length;
    if (charCount > 0) {
        let heartImages = [];
        let heartPositions = [];
        for (let i = 0; i < charCount; i++) {
            heartImages.push("url('pixel-heart.png')"); 
            heartPositions.push(`${i * 38}px center`);
        }
        input.style.backgroundImage = heartImages.join(", ");
        input.style.backgroundPosition = heartPositions.join(", ");
    } else {
        input.style.backgroundImage = "none";
    }
}

function closeGlitch() {
    playClick();
    document.getElementById("glitch-overlay").classList.add("hidden");
    document.getElementById('date-input').value = "";
    updateHeartDisplay();
}

function nextChap(num) {
    playClick();
    
    // 1. Hide all chapters and remove the 'active' class
    document.querySelectorAll('.chapter').forEach(c => {
        c.style.display = 'none';
        c.classList.remove('active');
        c.style.opacity = '0'; // Ensure opacity is reset for the fade-in
    });
    
    // 2. Select the target chapter
    const target = document.getElementById('chap' + num);
    if(target) {
        target.style.display = 'flex';
        // Small delay to allow 'display: flex' to register before adding 'active' for the animation
        setTimeout(() => {
            target.classList.add('active');
            target.style.opacity = '1';
        }, 10);
    }

    // 3. CHAPTER SPECIFIC LOGIC
    
    // Chapter 1: Polaroids
    if (num === 1) {
        document.querySelectorAll('.polaroid').forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = `scale(1) rotate(${Math.random()*12-6}deg)`;
            }, index * 180);
        });
    }

    // Chapter 2: THE QUIZ (THE BUG FIX)
   if (num === 2) {
        currentQuestion = 0;
        // 1. First, make sure the text isn't empty so it has a height
        document.getElementById("question-text").innerText = "INITIALIZING...";
        
        // 2. Wait 100ms for the CSS 'display: flex' to actually kick in
        setTimeout(() => {
            loadQuestion(); 
            console.log("Quiz Loaded for Chapter 2"); // Check your F12 console for this!
        }, 100);
    }

    if (num === 6) startAuraGame(); 
    if (num === 4) animateAuraAudit();
    
    // Chapter 5: Final Count
    if (num === 5) {
        let n = 0;
        const nInt = setInterval(() => { 
            const bigNum = document.getElementById('big-number');
            if(n < 20) { 
                n++; 
                if(bigNum) bigNum.innerText = n; 
            } else { 
                clearInterval(nInt); 
                launchConfetti(); 
            }
        }, 100);
    }

    // Update Aura Bar progress if you are using that feature
    if (typeof updateAuraBar === "function") {
        updateAuraBar(num);
    }
}

// --- SFX & DECORATIONS ---
function playClick() {
    const sfx = document.getElementById('click-sfx');
    if (sfx) sfx.cloneNode().play().catch(e => {});
}

function playBuzzer() {
    const sfx = document.getElementById('buzzer-sfx');
    if (sfx) sfx.cloneNode().play().catch(e => {});
}

function launchConfetti() {
    const sfx = document.getElementById('confetti-sfx');
    if (sfx) sfx.play().catch(e => {});
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF3131', '#5271FF', '#000'] });
}

function loadQuestion() {
    const q = quizData[currentQuestion];
    const questionEl = document.getElementById("question-text");
    const optionsDiv = document.getElementById("quiz-options");

    // 1. Clear previous options immediately
    optionsDiv.innerHTML = "";

    // 2. Animate the Question (Fade in and slide up)
    questionEl.style.opacity = "0";
    questionEl.style.transform = "translateY(10px)";
    
    setTimeout(() => {
        questionEl.innerText = q.question;
        questionEl.style.transition = "all 0.5s ease";
        questionEl.style.opacity = "1";
        questionEl.style.transform = "translateY(0)";
    }, 100);

    // 3. Create and Stagger the Buttons
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "next-btn quiz-opt"; // Added 'quiz-opt' for specialized CSS
        btn.style.opacity = "0";
        btn.style.transform = "translateX(-20px)";
        
        btn.onclick = () => handleQuizClick(i);
        optionsDiv.appendChild(btn);

        // This creates the "one-by-one" appearance effect
        setTimeout(() => {
            btn.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            btn.style.opacity = "1";
            btn.style.transform = "translateX(0)";
        }, 200 + (i * 100)); // Each button waits an extra 100ms
    });
}

function handleQuizClick(index) {
    const q = quizData[currentQuestion];
    const quizBox = document.getElementById('quiz-box');

    if (index === q.correct) {
        // 1. Success Feedback
        playClick();
        quizBox.style.transition = "background 0.2s ease";
        quizBox.style.background = "rgba(0, 245, 160, 0.1)"; // Light green flash
        
        setTimeout(() => {
            quizBox.style.background = "white";
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                // 2. Final Win logic
                const winSfx = document.getElementById('win-sfx');
                if (winSfx) winSfx.play();
                
                // CRITICAL FIX: Changed from 6 to 3 because your HTML ends at chap5
                nextChap(3); 
            }
        }, 200);

    } else { 
        // 3. Failure Feedback
        const buzzer = document.getElementById('buzzer-sfx');
        if (buzzer) {
            buzzer.currentTime = 0;
            buzzer.play();
        }
        
        quizBox.classList.add('shake');
        quizBox.style.border = "2px solid #FF3131"; // Turn border red briefly
        
        setTimeout(() => {
            quizBox.classList.remove('shake');
            quizBox.style.border = "2px solid var(--border)";
        }, 400);
    }
}

let gameActive = false;
let score = 0;
function startAuraGame() {
    gameActive = true;
    score = 0;
    const aura = document.getElementById('aura-drop');
    const player = document.getElementById('player');
    let auraPos = { x: Math.random() * (window.innerWidth - 60), y: -50 };
    
    window.addEventListener('mousemove', (e) => {
        if (!gameActive) return;
        player.style.left = (e.clientX - 30) + 'px';
    });

    const gameLoop = setInterval(() => {
        if (!gameActive) { clearInterval(gameLoop); return; }
        auraPos.y += 7;
        aura.style.top = auraPos.y + 'px';
        aura.style.left = auraPos.x + 'px';
        const pRect = player.getBoundingClientRect();
        const aRect = aura.getBoundingClientRect();

        if (aRect.bottom >= pRect.top && aRect.left < pRect.right && aRect.right > pRect.left) {
            score++;
            playClick();
            auraPos.y = -50;
            auraPos.x = Math.random() * (window.innerWidth - 60);
            if (score >= 5) { gameActive = false; launchConfetti(); nextChap(3); }
        }
        if (auraPos.y > window.innerHeight) {
            auraPos.y = -50;
            auraPos.x = Math.random() * (window.innerWidth - 60);
        }
    }, 16);
}

function animateAuraAudit() {
    const totalEl = document.getElementById('aura-total');
    const feed = document.getElementById('event-feed-container');
    let mainAura = 1000000;
    let i = 0;
    const interval = setInterval(() => {
        playBuzzer(); 
        const fail = auraFails[i];
        const sticker = document.createElement('div');
        sticker.className = "fail-sticker";
        sticker.innerHTML = `<span>AURA LOSS</span><p>${fail.text}</p><h2>${fail.loss}</h2>`;
        feed.appendChild(sticker);
        mainAura += fail.loss;
        totalEl.innerText = mainAura;
        i++;
        if (i === auraFails.length) {
            clearInterval(interval);
            setTimeout(() => {
                const winSfx = document.getElementById('win-sfx');
                if (winSfx) winSfx.play();
                totalEl.innerText = "∞"; 
                totalEl.style.color = "#00FF00";
                document.getElementById('finale-btn').style.display = 'block';
                launchConfetti();
            }, 1500);
        }
    }, 1500);
}

function generateHype() {
    playClick();
    document.getElementById('hype-text').innerText = hypePhrases[Math.floor(Math.random() * hypePhrases.length)];
    launchConfetti();
}

// --- TRAIL ENGINE ---
const DOT_COUNT = 10;
const dots = [];
const mousePos = { x: 0, y: 0 };
function initTrail() {
    const container = document.getElementById('trail-container');
    for (let i = 0; i < DOT_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        container.appendChild(dot);
        dots.push({ el: dot, x: 0, y: 0 });
    }
}
window.addEventListener('mousemove', (e) => { mousePos.x = e.clientX; mousePos.y = e.clientY; });
function updateTrail() {
    let targetX = mousePos.x;
    let targetY = mousePos.y;
    dots.forEach((dot, index) => {
        dot.x += (targetX - dot.x) * 0.15; 
        dot.y += (targetY - dot.y) * 0.15;
        dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        targetX = dot.x + (index * 2); 
        targetY = dot.y + (index * 2);
    });
    requestAnimationFrame(updateTrail);
}
initTrail();
updateTrail();

document.getElementById('bg-music').addEventListener('ended', () => {
    console.log("Song ended, playing next...");
    nextTrack();
});

document.getElementById('bg-music').onended = nextTrack;

// --- ADVANCED NAVIGATION & PROGRESS ---
function updateAuraBar(chapterNum) {
    const fill = document.getElementById('aura-bar-fill');
    const status = document.getElementById('aura-status');
    const percentage = (chapterNum / 5) * 100; // Assuming 5 chapters
    
    fill.style.width = percentage + "%";
    status.innerText = `AURA LEVEL: ${Math.round(percentage)}%`;
    
    if(percentage === 100) {
        status.innerText = "MAX AURA UNLOCKED 👑";
        status.style.color = "var(--pink)";
    }
}

function nextChap(num) {
    playClick();
    
    const activeChap = document.querySelector('.chapter.active');
    if (activeChap) {
        activeChap.style.opacity = '0';
        setTimeout(() => {
            activeChap.style.display = 'none';
            activeChap.classList.remove('active');
            showTarget(num);
        }, 300);
    } else {
        showTarget(num);
    }
    
    updateAuraBar(num);
}

function showTarget(num) {
    const target = document.getElementById('chap' + num);
    if(target) {
        target.style.display = 'flex';
        target.classList.add('active');
        setTimeout(() => { target.style.opacity = '1'; }, 50);
    }

    // CHAPTER 1: POLAROIDS
    if (num === 1) {
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach((p, index) => {
            setTimeout(() => { p.style.opacity = '1'; }, index * 150);
        });
    }

    // CHAPTER 2: THE QUIZ
    if (num === 2) {
        currentQuestion = 0;
        setTimeout(() => { loadQuestion(); }, 100);
    }

    // CHAPTER 6: AURA AUDIT
    if (num === 6) startAuraGame();
    if (num === 4) animateAuraAudit();
}    
// ── COMIC STRIP NAVIGATION (chap6) ──────────────────────────
let comicPanel = 0;
const COMIC_TOTAL = 5;

function scrollComic(dir) {
    comicPanel = Math.max(0, Math.min(COMIC_TOTAL - 1, comicPanel + dir));
    const strip = document.getElementById('comic-strip');
    if (strip) strip.style.transform = `translateX(-${comicPanel * 20}%)`;

    const counter = document.getElementById('panel-counter');
    if (counter) counter.textContent = `${comicPanel + 1} / ${COMIC_TOTAL}`;

    // Show CONTINUE button after last panel
    const continueBtn = document.getElementById('comic-continue-btn');
    if (continueBtn) continueBtn.style.display = comicPanel === COMIC_TOTAL - 1 ? 'inline-block' : 'none';
}

function rewindComic() {
    comicPanel = 0;
    const strip = document.getElementById('comic-strip');
    if (strip) strip.style.transform = 'translateX(0)';
    const counter = document.getElementById('panel-counter');
    if (counter) counter.textContent = `1 / ${COMIC_TOTAL}`;
    const continueBtn = document.getElementById('comic-continue-btn');
    if (continueBtn) continueBtn.style.display = 'none';
}

// Reset comic state when chap6 is entered
const _origShowTarget = typeof showTarget === 'function' ? showTarget : null;
document.addEventListener('DOMContentLoaded', () => {
    // Keyboard nav for comic when chap6 is active
    document.addEventListener('keydown', (e) => {
        const chap6 = document.getElementById('chap6');
        if (!chap6 || !chap6.classList.contains('active')) return;
        if (e.key === 'ArrowRight') scrollComic(1);
        if (e.key === 'ArrowLeft')  scrollComic(-1);
    });

    // Touch/swipe for comic viewport
    const vp = document.querySelector('.comic-viewport');
    if (vp) {
        let touchStartX = 0;
        vp.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
        vp.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 40) scrollComic(dx < 0 ? 1 : -1);
        });
    }
});

// --- CONTROL CENTER WIDGET LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const ccTrigger = document.getElementById('control-center-trigger');
    const vinylPlayer = document.getElementById('vinyl-player-container');
    const ccClose = document.getElementById('close-cc-btn');

    // Проверяем, существуют ли элементы, чтобы не вызвать ошибок
    if (ccTrigger && vinylPlayer && ccClose) {
        
        // По умолчанию прячем плеер при загрузке страницы
        vinylPlayer.classList.add('hidden-player');

        // Открытие плеера при клике на всплывающую иконку ноты
        ccTrigger.addEventListener('click', () => {
            vinylPlayer.classList.remove('hidden-player');
            ccTrigger.style.pointerEvents = 'none'; // Отключаем клики по иконке, пока плеер открыт
            ccTrigger.style.opacity = '0';
        });

        // Закрытие плеера при клике на крестик '×'
        ccClose.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие клика
            vinylPlayer.classList.add('hidden-player');
            
            // Возвращаем иконку ноты обратно после закрытия плеера
            setTimeout(() => {
                ccTrigger.style.pointerEvents = 'auto';
                ccTrigger.style.opacity = '';
            }, 400);
        });
    }
});
