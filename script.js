let cache = null;


const timeframeButtons = document.getElementById('timeframe-group');
timeframeButtons.addEventListener('change', (event) => {
    const frame = event.target.value;
    if (frame && cache) {
        renderCards(frame);
    }
});

// Load data once on page load
async function loadData() {
    const response = await fetch('data.json');
    cache = await response.json();
    renderCards('daily'); // default view
}

loadData();


const renderCards = (frame) => {
    const container = document.getElementById('main');
    document.querySelectorAll('.report-card').forEach(card => { card.remove(); });

    cache.forEach(item => {
        const timeframe = item.timeframes[frame]; // Change to daily or monthly as needed
        const card = createCard({
            title: item.title,
            image: item.image,
            color: item.color,
            currentHours: timeframe.current,
            previousHours: timeframe.previous
        });
        container.appendChild(card);
    });
}

const createCard = (item) => {
    const card = document.createElement('div');
    card.classList.add('report-card');
    card.style.backgroundColor = `var(--${item.color}, var(--orange-300))`; // Fallback color if variable is not defined
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${item.image}" alt="${item.title} Icon">
      </div>
      <div class="card-body ">
        <div class="card-title">
          <h2>${item.title}</h2>
          <img src="./images/icon-ellipsis.svg" alt="Ellipsis Icon">
        </div>
        <div class="card-info">
          <p class="current-hours">${item.currentHours}hrs</p>
          <p class="previous-hours">Previous - ${item.previousHours}hrs</p>
        </div>
      </div>
    `;
    return card;
};