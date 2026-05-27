var currentTrackIndex = 0;
var tracks = [
    { file: 'music/Daisies - Justin Bieber.mp3', name: "Daisies - Justin Bieber" },
    { file: 'music/Beauty and a Beat - Justin Bieber (feat. Nicki Minaj).mp3', name: "Beauty and a Beat - Justin Bieber" },
    { file: 'music/Eenie Meenie - Sean Kingston & Justin Bieber.mp3', name: "Eenie Meenie - Justin Bieber" },
    { file: 'music/Timber - Pitbull (feat. Ke$ha).m4a', name: "Timber - Pitbull" },
    { file: 'music/Lush Life - Zara Larsson.m4a', name: "Lush Life - Zara Larsson" },
    { file: 'music/Closer - The Chainsmokers (feat. Halsey).mp3', name: "Closer - The Chainsmokers" }
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
        nextChap(2); 
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
}
 
function showTarget(num) {
    const target = document.getElementById('chap' + num);
    if(target) {
        target.style.display = 'flex';
        target.classList.add('active');
        setTimeout(() => { target.style.opacity = '1'; }, 50);
    }
 
    // PAGE 2: POLAROIDS
    if (num === 2) {
        const polaroids = document.querySelectorAll('.polaroid');
        polaroids.forEach((p, index) => {
            setTimeout(() => { p.style.opacity = '1'; }, index * 150);
        });
    }
 
    // // PAGE 3: COMICS
    if (num === 3) {
    }
    if (num === 4) setTimeout(() => startTenderCards(), 50);
    if (num === 6) animateAuraAudit();
     if (num === 8) {
        setTimeout(() => initLovePuzzle(), 80);
    }
 
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
// ==========================================================================
// PAGE 4: THE 20 THINGS CARDS ENGINE DATABASE & LOGIC
// ==========================================================================
const observationsList = [
    "козиннин астындагы сызыктар кулген кезде кушти боп кетедта, ваще краш боп кетесин",
    "омиримде корген ен кушти приятный кулки шыгар, кейбир кыздар боладыго кулсе кулагын канайтын, сеники наоборот жагымды кулки.",
    "бир нарсеге куанган кезде билмим ишинде кишкентай кыз оянып кетема, таза кишкентай кыз боп кетесин.",
    "бир тема кызып кетсе, токтай алмаай кетесин, куле бересин куле бересин.",
    "бир кунде 1045 рет факю корсете бересин, басы жок аягы жок.",
    "андай кипишь боп кеткенде, проблема боганда тез шешу жолын табасын, респект.",
    "звонок болганда, завтрак обед ужин уакыттарында файеде пикмиланып жургенин",
    "запрещенкаларга деген махаббатын, канша жесенде барибир крашсынго.",
    "маган кишкентай кызга карайтындай караганын кушти, баягыда нонимен урысып каганда ойлайтын едим неге мама маган ага емес биринши апше туып бермид деп, сен сиякты апшем болса баска арман жок, коп кутыра беред деп кринж устайтын шыгарсын бирак ол кутырганым кишкентай кезде шыкпай калган кутырыктар негизи",
    "омиримде ешким ойтип мены еркелетип, кутыртпаган папамамаларда туыскандарда, омимриде ваще бузык болмаганмын сенимен дос болганга дойин",
    "куниге маган тамак апересин, сушняк, сосын касымда баска кыздар болса соларга да апересин, уйге бара жатканда базяга да берип жибереисн ваще респект",
    "каникулдарда кыдырган кездер ваще кушти, азанмен ойтип кошеге шыкпаппын омиримде, еще капеге.",
    "лицейде боваткан букил нарселерге катысыватсын базар жок, тарбиешилер арасы гана емес букил лицей ишинде ен крутой букил нарсеге катыскыш сен шгарсын.",
    "Всегда менин уйкым канганына, карным токтыгына, дари ишилгенине карап журесин рахмет, даже мама ойтип карамайдыго маган",
    "ар мелочьтарга карап журесин, не унайд не унамайд, настроением бар жоктыгына",
    "сен берген аперген плед кимдер ваще бомбаго, толстовканы кимейд деп ойлап кама, 11 битирип жатканда только сомен сосын берген кр футболканмен сосын если класспен азанга дейин отырып анг айтсакта кыста тонсамда только анау пледпен журем.",
    "лицейде ярмарка бирбалелер болса сразу маган тамак сушняк апергин кеп турады, кушти боп калам ишимнен",
    "сен берип журген ойыншыктарын ваще ен кушт ойыншыктар, баягыдан негизи пашти ойыншык алмайтынмын, меннен еки жаска улкен огизге аперетин коп, магазга барад келед нонидн колында всегда ойыншык болатын, бирак апермеди деп жыламайтынмын, бирак кишкене грусни болам сосын коям",
    "жасын меникинен сал улкен болсада, элпэ болуга ваще кедерги емес. Баска биреу сен сиякты жылы карамайтын ед деп ойлаймын.",
    "сухур ифтарды сен истеп беретн кезде кушти болатын едим, сенсиз устап жургенимде карным ашып журетин куни бойы, сен маган тамак степ берем деп азанда ерте турып или иногда тунде уктамайтын кездеринде ваще грусни болатынмын иштей"
];
 
let flippedCardsCount = 0;
let highestZIndex = 100;
 
function startTenderCards() {
    const deckContainer = document.getElementById('cards-deck-container');
    if (!deckContainer) return;
    deckContainer.innerHTML = ""; 
    flippedCardsCount = 0;
    
    const counterDisplay = document.getElementById('card-counter');
    if (counterDisplay) counterDisplay.innerText = "0";
    
    const triggerBtn = document.getElementById('finale-trigger-btn');
    if (triggerBtn) triggerBtn.style.display = 'none';
 
    observationsList.forEach((text, index) => {
        const card = document.createElement('div');
        card.className = 'observation-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${index + 1}</div>
                <div class="card-back">${text}</div>
            </div>
        `;
 
        const containerW = deckContainer.clientWidth || 800;
        const containerH = deckContainer.clientHeight || 500;
        
        const randomX = Math.random() * (containerW - 180);
        const randomY = Math.random() * (containerH - 240);
        const randomRotate = Math.random() * 24 - 12;
 
        card.style.left = `${randomX}px`;
        card.style.top = `${randomY}px`;
 
        card.style.transform = `rotate(${randomRotate}deg)`;
 
        setupCardDrag(card, deckContainer);
        deckContainer.appendChild(card);
    });
}
 
function setupCardDrag(card, container) {
    let isDragging = false;
    let startX, startY, currentX, currentY;
    let hasMoved = false;
 
    const onStart = (e) => {
        isDragging = true;
        hasMoved = false;
        highestZIndex++;
        card.style.zIndex = highestZIndex;
 
        const clientX = e.type.includes('touch') ? e.touches.clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches.clientY : e.clientY;
        startX = clientX - card.offsetLeft;
        startY = clientY - card.offsetTop;
        if (e.type === 'mousedown') e.preventDefault();
    };
 
    const onMove = (e) => {
        if (!isDragging) return;
        const clientX = e.type.includes('touch') ? e.touches.clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches.clientY : e.clientY;
        currentX = clientX - startX;
        currentY = clientY - startY;
 
        if (Math.abs(currentX - card.offsetLeft) > 3 || Math.abs(currentY - card.offsetTop) > 3) {
            hasMoved = true;
        }
 
        card.style.left = `${currentX}px`;
        card.style.top = `${currentY}px`;
    };
 
    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
 
        if (!hasMoved && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            card.style.transform = `rotate(0deg) scale(1.02)`;
            flippedCardsCount++;
            
            const counterDisplay = document.getElementById('card-counter');
            if (counterDisplay) counterDisplay.innerText = flippedCardsCount;
 
            if (typeof playClick === "function") playClick();
 
            if (flippedCardsCount === observationsList.length) {
                document.getElementById('finale-trigger-btn').style.display = 'inline-block';
                if (typeof launchConfetti === "function") launchConfetti();
            }
        }
    };
 
    card.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
 
    card.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);
}
 
  // Переменная для подсчета кликов именно по коробке подарка
let giftClickCount = 0;
 
document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const giftMessage = document.getElementById('giftMessage');
    const giftStatus = document.getElementById('gift-status');
    
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            // Если коробка уже открыта, клики больше не срабатывают
            if (giftBox.classList.contains('open')) return;
 
            giftClickCount++;
            
            // Каждое нажатие вызывает визуальный удар (тряску) коробки
            giftBox.classList.add('shake');
            
            // Обновляем текст с обратным отсчетом для интерактивности
            if (giftStatus && giftClickCount < 20) {
                giftStatus.textContent = `💥 REMAINING HITS: ${20 - giftClickCount} 💥`;
            }
            
            if (giftClickCount >= 20) {
                giftBox.classList.add('open');
                if (giftMessage) {
                    giftMessage.classList.add('open');
                }
                if (giftStatus) {
                    giftStatus.textContent = "✨ UNWRAPPED! ✨";
                }
 
                // === EXACT FIX: HIDES THE HEADER CONTAINER ===
                const currentChapter = document.getElementById('chap5');
                if (currentChapter) {
                    const headerContainer = currentChapter.querySelector('.header-container');
                    if (headerContainer) {
                        headerContainer.style.display = 'none';
                    }
                }
                // ============================================
 
 // Запуск салюта при финальном открытии
            if (typeof launchConfetti === "function") launchConfetti();
        }
 
        // Быстро убираем класс shake, чтобы анимация деформации работала на каждый следующий клик
        setTimeout(() => {
            giftBox.classList.remove('shake');
        }, 300);
    });
}
});
 
// ════════════════════════════════════════════════════════════
//  PAGE 8 — THE PHOTO MOSAIC ENVELOPE
//  ► Replace 'puzzle-photo.png' with your 340×340px photo path
//  ► initLovePuzzle() is called from showTarget() when num===8
// ════════════════════════════════════════════════════════════
 
const PUZZLE_PHOTO = 'puzzle-photo.png'; // ← your photo here
const PIECE_SIZE   = 85;  // px per tile
const GRID_COLS    = 4;
const GRID_ROWS    = 4;
const SNAP_THRESH  = 14; // px — magnetic snap distance
 
let _puzzlePieces    = [];   // DOM elements
let _puzzleSnapped   = [];   // boolean[16]
let _snapCount       = 0;
let _puzzleSolved    = false;
let _dragPiece       = null;
let _dragOffX        = 0;
let _dragOffY        = 0;
let _slotHighlight   = null;
 
// ── ENTRY ──────────────────────────────────────────────────
function initLovePuzzle() {
    _puzzleSolved = false;
    _snapCount    = 0;
    _dragPiece    = null;
    _puzzlePieces = [];
    _puzzleSnapped = new Array(GRID_COLS * GRID_ROWS).fill(false);
 
    const board = document.getElementById('puzzle-board');
    if (!board) return;
    board.innerHTML = '';
    board.classList.remove('fade-out', 'complete');
 
    const counter = document.getElementById('puzzle-counter');
    if (counter) counter.textContent = '0';
 
    // Hide envelope + letter
    const envW  = document.getElementById('final-envelope-wrapper');
    const letW  = document.getElementById('letter-wrapper');
    if (envW)  { envW.classList.remove('show','visible'); envW.style.display = 'none'; }
    if (letW)  { letW.classList.remove('show','visible'); letW.style.display = 'none'; }
 
    const nextBtn = document.getElementById('letter-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';
 
    // Slot highlight overlay
    _slotHighlight = document.createElement('div');
    _slotHighlight.className = 'drop-slot-highlight';
    _slotHighlight.style.opacity = '0';
    board.appendChild(_slotHighlight);
 
    // Use rAF×2 to guarantee board has real layout dimensions
    requestAnimationFrame(() => requestAnimationFrame(() => _buildPieces(board)));
}
 
// ── BUILD PIECES ────────────────────────────────────────────
function _buildPieces(board) {
    const boardRect = board.getBoundingClientRect();
    const total     = GRID_COLS * GRID_ROWS;
 
    // Fisher-Yates shuffle of indices 0…15
    const order = Array.from({length: total}, (_, i) => i);
    for (let i = total - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
 
    order.forEach((tileIdx, _) => {
        const col = tileIdx % GRID_COLS;
        const row = Math.floor(tileIdx / GRID_ROWS);
 
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.tileIdx = tileIdx;
 
        // Which portion of the photo this tile shows
        piece.style.backgroundImage    = `url('${PUZZLE_PHOTO}')`;
        piece.style.backgroundPosition = `-${col * PIECE_SIZE}px -${row * PIECE_SIZE}px`;
 
        // Scatter: random position near the board with slight rotation
        const angle = (Math.random() * 16 - 8).toFixed(2);
        const scatter = _scatterPosition(tileIdx, boardRect);
        piece.style.left      = scatter.x + 'px';
        piece.style.top       = scatter.y + 'px';
        piece.style.transform = `rotate(${angle}deg)`;
        piece.style.zIndex    = 10 + tileIdx;
 
        // Drag listeners
        piece.addEventListener('mousedown',  _onPieceDown);
        piece.addEventListener('touchstart', _onPieceDown, { passive: false });
 
        board.appendChild(piece);
        _puzzlePieces.push(piece);
    });
}
 
// Scatter pieces in clusters near the board edges
function _scatterPosition(idx, boardRect) {
    const board = document.getElementById('puzzle-board');
    const bw = board.offsetWidth  || 340;
    const bh = board.offsetHeight || 340;
 
    // 4 zones: top, right, bottom, left — assign per tile quadrant
    const zone  = idx % 4;
    const jx    = (Math.random() - 0.5) * 60;
    const jy    = (Math.random() - 0.5) * 60;
 
    const zones = [
        { x: bw * 0.1 + jx,      y: -PIECE_SIZE - 20 + jy  }, // top
        { x: bw + 20 + jx,       y: bh * 0.1 + jy           }, // right
        { x: bw * 0.1 + jx,      y: bh + 20 + jy            }, // bottom
        { x: -PIECE_SIZE - 20 + jx, y: bh * 0.1 + jy        }, // left
    ];
 
    return zones[zone];
}
 
// ── DRAG: DOWN ─────────────────────────────────────────────
function _onPieceDown(e) {
    if (_puzzleSolved) return;
    const piece = e.currentTarget;
    if (piece.classList.contains('snapped')) return;
    e.preventDefault();
 
    _dragPiece = piece;
    piece.classList.add('dragging');
    piece.style.zIndex = 500;
 
    const board   = document.getElementById('puzzle-board');
    const bRect   = board.getBoundingClientRect();
    const cX      = e.touches ? e.touches[0].clientX : e.clientX;
    const cY      = e.touches ? e.touches[0].clientY : e.clientY;
    const pRect   = piece.getBoundingClientRect();
 
    _dragOffX = cX - pRect.left;
    _dragOffY = cY - pRect.top;
 
    window.addEventListener('mousemove',  _onPieceMove, { passive: false });
    window.addEventListener('touchmove',  _onPieceMove, { passive: false });
    window.addEventListener('mouseup',    _onPieceUp);
    window.addEventListener('touchend',   _onPieceUp);
}
 
// ── DRAG: MOVE ──────────────────────────────────────────────
function _onPieceMove(e) {
    if (!_dragPiece) return;
    e.preventDefault();
 
    const cX = e.touches ? e.touches[0].clientX : e.clientX;
    const cY = e.touches ? e.touches[0].clientY : e.clientY;
 
    const board = document.getElementById('puzzle-board');
    const bRect = board.getBoundingClientRect();
 
    const newLeft = cX - bRect.left - _dragOffX;
    const newTop  = cY - bRect.top  - _dragOffY;
 
    _dragPiece.style.left = newLeft + 'px';
    _dragPiece.style.top  = newTop  + 'px';
 
    // Show slot highlight
    const nearSlot = _nearestSlot(newLeft, newTop);
    _showHighlight(nearSlot);
}
 
// ── DRAG: UP ────────────────────────────────────────────────
function _onPieceUp(e) {
    window.removeEventListener('mousemove',  _onPieceMove);
    window.removeEventListener('touchmove',  _onPieceMove);
    window.removeEventListener('mouseup',    _onPieceUp);
    window.removeEventListener('touchend',   _onPieceUp);
 
    _hideHighlight();
    if (!_dragPiece) return;
 
    const piece    = _dragPiece;
    _dragPiece     = null;
    piece.classList.remove('dragging');
 
    const tileIdx  = parseInt(piece.dataset.tileIdx);
    const left     = parseFloat(piece.style.left);
    const top      = parseFloat(piece.style.top);
    const target   = _correctPosition(tileIdx);
 
    // Check snap threshold
    const dx = Math.abs(left - target.x);
    const dy = Math.abs(top  - target.y);
 
    if (dx <= SNAP_THRESH && dy <= SNAP_THRESH && !_puzzleSnapped[tileIdx]) {
        // SNAP!
        piece.style.left      = target.x + 'px';
        piece.style.top       = target.y + 'px';
        piece.style.transform = 'rotate(0deg)';
        piece.style.zIndex    = 2;
        piece.classList.add('snapped');
        _puzzleSnapped[tileIdx] = true;
        _snapCount++;
 
        if (typeof playClick === 'function') playClick();
 
        const counter = document.getElementById('puzzle-counter');
        if (counter) counter.textContent = _snapCount;
 
        if (_snapCount === GRID_COLS * GRID_ROWS) {
            setTimeout(_onPuzzleComplete, 200);
        }
    } else {
        // Float gently back toward a slightly off position so it feels natural
        piece.style.zIndex = 10 + tileIdx;
    }
}
 
// ── SLOT MATH ───────────────────────────────────────────────
function _correctPosition(tileIdx) {
    const col = tileIdx % GRID_COLS;
    const row = Math.floor(tileIdx / GRID_ROWS);
    return { x: col * PIECE_SIZE, y: row * PIECE_SIZE };
}
 
function _nearestSlot(left, top) {
    const col = Math.round(left / PIECE_SIZE);
    const row = Math.round(top  / PIECE_SIZE);
    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return null;
    return { col, row, x: col * PIECE_SIZE, y: row * PIECE_SIZE };
}
 
function _showHighlight(slot) {
    if (!_slotHighlight || !slot) { _hideHighlight(); return; }
    _slotHighlight.style.left    = slot.x + 'px';
    _slotHighlight.style.top     = slot.y + 'px';
    _slotHighlight.style.opacity = '1';
}
 
function _hideHighlight() {
    if (_slotHighlight) _slotHighlight.style.opacity = '0';
}
 
// ── COMPLETION ──────────────────────────────────────────────
function _onPuzzleComplete() {
    _puzzleSolved = true;
    const board = document.getElementById('puzzle-board');
    if (board) board.classList.add('complete');
 
    if (typeof _puzzleConfetti === 'function') _puzzleConfetti();
 
    setTimeout(() => {
        if (board) {
            board.style.transition = 'opacity 0.7s ease';
            board.style.opacity = '0';
            setTimeout(() => { board.style.display = 'none'; }, 700);
        }
 
        const envW = document.getElementById('final-envelope-wrapper');
        if (envW) {
            envW.style.display    = 'flex';
            envW.style.opacity    = '0';
            envW.style.transition = 'opacity 0.9s ease';
            setTimeout(() => {
                envW.style.opacity = '1';
                envW.addEventListener('click', _openEnvelope, { once: true });
            }, 60);
        }
    }, 1600);
}
 
function _openEnvelope() {
    const envOuter = document.getElementById('envelope-outer');
    if (envOuter) envOuter.classList.add('opening');
 
    setTimeout(() => {
        const envW = document.getElementById('final-envelope-wrapper');
        if (envW) {
            envW.style.opacity = '0';
            setTimeout(() => { envW.style.display = 'none'; }, 700);
        }
 
        const letW = document.getElementById('letter-wrapper');
        if (letW) {
            letW.style.display    = 'flex';
            letW.style.opacity    = '0';
            letW.style.transition = 'opacity 0.9s ease';
            setTimeout(() => { letW.style.opacity = '1'; }, 60);
        }
 
        setTimeout(() => {
            const btn = document.getElementById('letter-next-btn');
            if (btn) btn.style.display = 'inline-block';
        }, 1200);
    }, 600);
}
 
// ── CONFETTI ─────────────────────────────────────────────────
function _puzzleConfetti() {
    const COLS = ['#FF3C6F','#FFE600','#5271FF','#F5EDDA','#FF8C42','#fff'];
    for (let i = 0; i < 70; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
            position:fixed; top:-12px; z-index:9999; pointer-events:none;
            left:${8 + Math.random()*84}vw;
            width:${5+Math.random()*9}px;
            height:${8+Math.random()*16}px;
            background:${COLS[Math.floor(Math.random()*COLS.length)]};
            border-radius:${Math.random()>.6?'50%':'1px'};
            opacity:0;
            animation:_cpFall ${1.4+Math.random()*2}s linear ${Math.random()*0.6}s forwards;
        `;
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }
 
    // Inject keyframes once
    if (!document.getElementById('_cpStyle')) {
        const s = document.createElement('style');
        s.id = '_cpStyle';
        s.textContent = `
            @keyframes _cpFall {
                0%   { opacity:1; transform:translateY(0) rotate(0deg) scaleX(1); }
                55%  { opacity:1; transform:translateY(55vh) rotate(400deg) scaleX(-1); }
                100% { opacity:0; transform:translateY(108vh) rotate(760deg) scaleX(1); }
            }
        `;
        document.head.appendChild(s);
    }
}