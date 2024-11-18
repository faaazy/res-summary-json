async function getData(url = "./data.json") {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  renderItems(selectors, data);
  calcScore(selectors);
}

const selectors = {
  scoreTotal: document.querySelector("[data-score-total]"),
  scoreTitle: document.querySelector("[data-score-title]"),
  scorePercent: document.querySelector("[data-score-percent]"),
  summaryImg: document.querySelector("[data-summary-item-img]"),
  summaryTitle: document.querySelector("[data-summary-item-title]"),
  summaryScore: document.querySelector("[data-summary-item-score]"),
  summaryBtn: document.querySelector("[data-summary-btn]"),
  summaryItemsContainer: document.querySelector(".test__summary-items"),
  summaryItems: document.querySelectorAll(".test__summary-item"),
};

function renderItems(selectors, data) {
  const { summaryItemsContainer } = selectors;
  data.forEach((item, index) => {
    const { category, score, icon } = data[index];

    const html = `
        <div class="test__summary-item test__summary-item--${category.toLowerCase()}">
            <img src="${icon}" alt="" data-summary-item-img />
            <div class="test__summary-item__title" data-summary-item-title>${category}</div>
            <div class="test__summary-item__score"><strong data-summary-item-score>${score}</strong> / 100</div>
        </div>
    `;

    summaryItemsContainer.insertAdjacentHTML("beforeend", html);
  });
}

function calcScore(selectors) {
  const { scoreTotal, scoreTitle } = selectors;
  const summaryScores = document.querySelectorAll("[data-summary-item-score]");
  let sum = 0;

  summaryScores.forEach((item) => {
    sum += parseInt(item.textContent);
  });

  const total = Math.round(sum / summaryScores.length);

  scoreTotal.textContent = total;
}
getData();
