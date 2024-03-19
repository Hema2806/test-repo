const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 10,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
       
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }  
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Baru punya

// Inisialisasi storan tempatan
// Mendapatkan nama pemain dari pengguna melalui prompt
// const playerName = prompt('Sila masukkan nama anda:');

// // Periksa jika pengguna telah memberikan nama atau tidak
// if (playerName) {
//   // Simpan nama pemain dalam localStorage
//   localStorage.setItem('playerName', playerName);
// } else {
//   // Jika pengguna tidak memberikan nama, gunakan nama tetamu
//   localStorage.setItem('playerName', 'Guest');
// }
// wpmRecord.push({name : playerName, wpm: wordsPerMinute});
// saveWpmRecord(wpmRecord);
// // Untuk mendapatkan nama pemain dari localStorage
// const savedPlayerName = localStorage.getItem('playerName');

// // Anda boleh menggunakannya dalam aplikasi anda
// console.log('Nama Pemain:', savedPlayerName);


// function saveWpmRecord(record){
//     localStorage.setItem('WPMrecord', JSON.stringify(record));
// }

// // Tambahkan rekod baru
// records.push({ playerName, WPM });

// // Simpan semula dalam storan tempatan
// localStorage.setItem('WPMRecord', JSON.stringify(records));
// // Dapatkan semula rekod storan tempatan
// records = JSON.parse(localStorage.getItem('WPMRecord'));

// // Urutkan rekod berdasarkan WPM (dalam turutan menurun)
// records.sort((a, b) => b.WPM - a.WPM);

// // Ambil 10 peringkat teratas
// const top10 = records.slice(0, 10);

// // Paparkan peringkat
// console.log('Top 10 Ranking:');
// top10.forEach((record, index) => {
//   console.log(`${index + 1}. ${record.playerName}: ${record.WPM} WPM`);
// });




// // paparkan mana pemain

// function savePlayerScore(record){
//     localStorage.setItem('WPMrecord', JSON.stringify(record));
// }


// function initTimer() {
//     if (timeLeft > 0) {
//         timeLeft--;
//         timeTag.innerText = timeLeft;
//         let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 10);
//         wpmTag.innerText = wpm;
//     } else {
//         clearInterval(timer);
//         const playerScore = wpmTag.innerText;
//         const playerName = localStorage.getItem('playerName');
//         alert(`Rank 1 : ${playerName} - (WPM: ${playerScore})`);
//         resetGame();
//     }
// }

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 10);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        const playerScore = wpmTag.innerText;
        alert("Time UP!!");
        const playerName =  prompt("Sila Masukkan Nama Anda");
        
        // Dapatkan semua rekod pemain dari local storage
        const playerRecords = JSON.parse(localStorage.getItem('WPMRecord')) || [];

        // Tambahkan rekod pemain saat ini ke dalam daftar pemain
        playerRecords.push({ playerName, WPM: parseInt(playerScore) });

        // Simpan ulang daftar pemain ke dalam local storage
        localStorage.setItem('WPMRecord', JSON.stringify(playerRecords));

        // Urutkan daftar pemain berdasarkan WPM (dalam urutan menurun)
        playerRecords.sort((a, b) => b.WPM - a.WPM);

        // Buat pesan alert yang mencantumkan peringkat pemain
        const playerRankingMessage = playerRecords.map((record, index) => {
            return `${index + 1}. ${record.playerName} - (WPM: ${record.WPM})`;
        }).join('\n');

        // Tampilkan pesan alert yang berisi daftar peringkat pemain
        alert(`Peringkat Pemain:\n${playerRankingMessage}`);

        // Reset permainan
        resetGame();
    }
}