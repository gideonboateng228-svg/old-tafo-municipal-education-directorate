// Handle feedback form submission (simulated, as no backend)
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const school = document.getElementById('school').value;
    const message = document.getElementById('message').value;
    
    if (name && email && school && message) {
        alert(`Thank you, ${name}! Your feedback has been submitted.\n\nDetails:\nEmail: ${email}\nSchool: ${school}\nMessage: ${message}`);
        // Clear form
        this.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Handle back-to-top button click
document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle announcement slideshow
const announcements = document.querySelectorAll('.announcement');
let currentAnnouncement = 0;
let slideshowInterval;

function showAnnouncement(index) {
    announcements.forEach((ann, i) => {
        ann.classList.remove('active');
        if (i === index) {
            ann.classList.add('active');
            ann.style.backgroundImage = `url('${ann.dataset.background}')`;
        } else {
            ann.style.backgroundImage = '';
        }
    });
}

function nextAnnouncement() {
    currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
    showAnnouncement(currentAnnouncement);
}

// Start slideshow
function startSlideshow() {
    slideshowInterval = setInterval(nextAnnouncement, 4000);
}
startSlideshow();
showAnnouncement(currentAnnouncement);

// Handle read more button clicks
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        const fullDesc = this.previousElementSibling;
        if (fullDesc.style.display === 'none' || fullDesc.style.display === '') {
            fullDesc.style.display = 'block';
            this.textContent = 'Read Less';
        } else {
            fullDesc.style.display = 'none';
            this.textContent = 'Read More';
        }
    });
});

// Handle calendar
const calendarContainer = document.getElementById('calendar-container');
const monthYear = document.getElementById('month-year');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');

const eventDates = Array.from(announcements).map(ann => ann.dataset.date);

function generateCalendar() {
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    function renderCalendar(month, year) {
        calendarContainer.innerHTML = '';
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${monthNames[month]} ${year}`;

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Add day headers
        daysInWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Add empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'empty';
            grid.appendChild(emptyCell);
        }

        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayCell = document.createElement('div');
            dayCell.className = eventDates.includes(dateStr) ? 'day event-day' : 'day';
            dayCell.textContent = day;
            if (eventDates.includes(dateStr)) {
                dayCell.dataset.date = dateStr;
                dayCell.addEventListener('click', () => {
                    const index = Array.from(announcements).findIndex(ann => ann.dataset.date === dateStr);
                    if (index !== -1) {
                        clearInterval(slideshowInterval); // Pause slideshow
                        currentAnnouncement = index;
                        showAnnouncement(index);
                        setTimeout(startSlideshow, 10000); // Resume after 10 seconds
                    }
                });
            }
            grid.appendChild(dayCell);
        }

        calendarContainer.appendChild(grid);
    }

    renderCalendar(currentMonth, currentYear);

    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Auto-update to current month
    setInterval(() => {
        const now = new Date();
        if (now.getMonth() !== currentMonth || now.getFullYear() !== currentYear) {
            currentMonth = now.getMonth();
            currentYear = now.getFullYear();
            renderCalendar(currentMonth, currentYear);
        }
    }, 1000 * 60 * 60 * 24); // Check daily
}

generateCalendar();

// Handle department tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Handle dropdown toggles
document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const dropdownContent = button.nextElementSibling;
        if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
            dropdownContent.style.display = 'block';
            button.textContent = 'Hide Roles';
        } else {
            dropdownContent.style.display = 'none';
            button.textContent = 'View Roles';
        }
    });
});