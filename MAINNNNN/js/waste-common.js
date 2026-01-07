const allData = [
  { name: "Milk Packets", qty: 24, category: "Dispose" },
  { name: "Vegetables", qty: 15, category: "Dispose" },
  { name: "Bread", qty: 30, category: "Donate" },
  { name: "Fruits", qty: 12, category: "Donate" },
  { name: "Biscuits", qty: 50, category: "Discount" },
  { name: "Snacks", qty: 40, category: "Discount" },
  { name: "Cold Drinks", qty: 60, category: "Sale" },
  { name: "Chips", qty: 45, category: "Sale" }
];

let chart;

function renderItems(category) {
  const container = document.getElementById("items");
  container.innerHTML = "";

  const filtered = category === "All"
    ? allData
    : allData.filter(i => i.category === category);

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = `card ${item.category}`;
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Quantity: ${item.qty}</p>
    `;
    container.appendChild(div);
  });

  renderChart(filtered);
}

function renderChart(data) {
  const ctx = document.getElementById("barChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.qty),
        backgroundColor: data.map(d => {
          if (d.category === "Dispose") return "#dc2626";
          if (d.category === "Donate") return "#2563eb";
          if (d.category === "Discount") return "#ea580c";
          return "#16a34a";
        })
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}

document.getElementById("filter").addEventListener("change", e => {
  renderItems(e.target.value);
});

renderItems(DEFAULT_CATEGORY);
