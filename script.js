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
 
    // PAGE 3: COMICS
    if (num === 3)  
 
    // PAGE 4: 20 CARDS
    if (num === 4) requestAnimationFrame(() => startTenderCards());
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
    "сен берип журген ойыншыктарын ваще ен кушт ойыншыктар, багана тобеде айткандай пашти ойыншык алмайтынмын, меннен еки жаска улкен огизге аперетин коп, магазга барад келед нонидн колында всегда ойыншык болатын, бирак апермеди деп жыламайтынмын, бирак кишкене грусни болам сосын коям",
    "жасын меникинен сал улкен болсада, элпэ болуга ваще кедерги емес. Баска биреу сен сиякты жылы карамайтын ед деп ойлаймын.",
    "сухур ифтарды сен isteп беретн кезде кушти болатын едим, сенсиз устап жургенимде карным ашып журетин куни бойы, сен маган тамак степ берем деп азанда ерте турып или иногда тунде уктамайтын кездеринде ваще грусни болатынмын иштей"
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

        if (currentX < 0) currentX = 0;
        if (currentY < 0) currentY = 0;
        if (currentX > container.clientWidth - card.clientWidth) currentX = container.clientWidth - card.clientWidth;
        if (currentY > container.clientHeight - card.clientHeight) currentY = container.clientHeight - card.clientHeight;

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
