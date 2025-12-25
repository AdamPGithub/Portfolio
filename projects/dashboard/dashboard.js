let monthlyChart, breakdownChart;

async function loadData() {
  const res = await fetch("./data.json");
  if (!res.ok) throw new Error("Failed to load data.json");
  return res.json();
}

function uniq(arr) {
  return [...new Set(arr)];
}

function groupSum(rows, keyFn) {
  const map = new Map();
  for (const r of rows) {
    const k = keyFn(r);
    map.set(k, (map.get(k) || 0) + r.value);
  }
  return map;
}

function buildMonthly(rows) {
  const months = uniq(rows.map(r => r.month)).sort();
  const totals = months.map(m =>
    rows.filter(r => r.month === m).reduce((a, r) => a + r.value, 0)
  );
  return { months, totals };
}

function buildBreakdown(rows) {
  const byCat = groupSum(rows, r => r.category);
  const labels = [...byCat.keys()].sort();
  const values = labels.map(l => byCat.get(l));
  return { labels, values };
}

function renderCharts(allRows, selectedCategory) {
  const filtered = selectedCategory === "All"
    ? allRows
    : allRows.filter(r => r.category === selectedCategory);

  const m = buildMonthly(filtered);
  const b = buildBreakdown(filtered);

  // Destroy old charts to avoid stacking
  if (monthlyChart) monthlyChart.destroy();
  if (breakdownChart) breakdownChart.destroy();

  monthlyChart = new Chart(document.getElementById("monthlyChart"), {
    type: "line",
    data: {
      labels: m.months,
      datasets: [{ label: "Total", data: m.totals }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  breakdownChart = new Chart(document.getElementById("breakdownChart"), {
    type: "bar",
    data: {
      labels: b.labels,
      datasets: [{ label: "Value", data: b.values }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

async function main() {
  const rows = await loadData();

  const select = document.getElementById("categorySelect");
  const categories = ["All", ...uniq(rows.map(r => r.category)).sort()];

  select.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");

  select.addEventListener("change", () => {
    renderCharts(rows, select.value);
  });

  renderCharts(rows, "All");
}

main().catch(err => {
  document.body.innerHTML = `<pre style="padding:20px;">${err.message}</pre>`;
});
