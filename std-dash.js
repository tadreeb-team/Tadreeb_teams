const internships = [
        { id: 1, title: "Software Development Intern", company: "Aramex", location: "Amman", locationKey: "amman", duration: "3 months", pay: "200 JOD/month", course: "Field Training 1", courseKey: "ft1", major: "cs", posted: "2 days ago" },
        { id: 2, title: "Data Analytics Intern", company: "Aramex", location: "Amman", locationKey: "amman", duration: "4 months", pay: "180 JOD/month", course: "Field Training 2", courseKey: "ft2", major: "cs", posted: "4 days ago" },
        { id: 3, title: "Network Engineering Intern", company: "Zain Jordan", location: "Irbid", locationKey: "irbid", duration: "3 months", pay: "250 JOD/month", course: "Field Training 1", courseKey: "ft1", major: "network", posted: "4 days ago" },
        { id: 4, title: "UI/UX Design Intern", company: "Makeen Technologies", location: "Amman", locationKey: "amman", duration: "2 months", pay: "150 JOD/month", course: "Field Training 1", courseKey: "ft1", major: "design", posted: "1 week ago" },
        { id: 5, title: "Cybersecurity Intern", company: "Orange Jordan", location: "Amman", locationKey: "amman", duration: "3 months", pay: "220 JOD/month", course: "Field Training 2", courseKey: "ft2", major: "security", posted: "3 days ago" },
        { id: 6, title: "Backend Developer Intern", company: "Roya TV", location: "Amman", locationKey: "amman", duration: "3 months", pay: "200 JOD/month", course: "Field Training 1", courseKey: "ft1", major: "cs", posted: "5 days ago" },
        { id: 7, title: "Mobile Development Intern", company: "Zain Jordan", location: "Amman", locationKey: "amman", duration: "3 months", pay: "210 JOD/month", course: "Field Training 2", courseKey: "ft2", major: "cs", posted: "1 day ago" },
        { id: 8, title: "Network Support Intern", company: "Orange Jordan", location: "Zarqa", locationKey: "zarqa", duration: "2 months", pay: "170 JOD/month", course: "Field Training 1", courseKey: "ft1", major: "network", posted: "6 days ago" },
    ];

    let savedIds = new Set();
    let appliedIds = new Set();

    function renderCards(list) {
        const grid = document.getElementById('cardsGrid');
        const noResults = document.getElementById('noResults');
        document.getElementById('stat-showing').textContent = list.length;

        if (list.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        grid.innerHTML = list.map(item => `
            <div class="intern-card">
                <h3>${item.title}</h3>
                <p class="company-name">🏢 ${item.company}</p>
                <div class="card-info">
                    <span>📍 ${item.location}</span>
                    <span>⏱ ${item.duration}</span>
                </div>
                <div class="card-info">
                    <span>💰 ${item.pay}</span>
                    <span class="tag">${item.course}</span>
                </div>
                <div class="card-bottom">
                    <span>Posted ${item.posted}</span>
                    <div class="btn-row">
                        <button class="save-btn ${savedIds.has(item.id) ? 'saved' : ''}"
                            onclick="toggleSave(${item.id}, this)">
                            ${savedIds.has(item.id) ? '⭐ Saved' : '⭐ Save'}
                        </button>
                        <a href="internship-details.html" class="view-btn">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function toggleSave(id, btn) {
        if (savedIds.has(id)) {
            savedIds.delete(id);
            btn.textContent = '⭐ Save';
            btn.classList.remove('saved');
        } else {
            savedIds.add(id);
            btn.textContent = '⭐ Saved';
            btn.classList.add('saved');
        }
        document.getElementById('stat-saved').textContent = savedIds.size;
    }

    function applyFilters() {
        const search = document.getElementById('searchInput').value.toLowerCase().trim();
        const major = document.getElementById('filterMajor').value;
        const location = document.getElementById('filterLocation').value;
        const course = document.getElementById('filterCourse').value;

        const filtered = internships.filter(item => {
            const matchSearch = !search || item.title.toLowerCase().includes(search) || item.company.toLowerCase().includes(search);
            const matchMajor = !major || item.major === major;
            const matchLocation = !location || item.locationKey === location;
            const matchCourse = !course || item.courseKey === course;
            return matchSearch && matchMajor && matchLocation && matchCourse;
        });

        renderCards(filtered);
    }

    function resetFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterMajor').value = '';
        document.getElementById('filterLocation').value = '';
        document.getElementById('filterCourse').value = '';
        renderCards(internships);
    }

    // Live filter on every input change
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        document.getElementById('filterMajor').addEventListener('change', applyFilters);
        document.getElementById('filterLocation').addEventListener('change', applyFilters);
        document.getElementById('filterCourse').addEventListener('change', applyFilters);
        renderCards(internships);
    });