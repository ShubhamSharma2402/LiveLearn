export function renderChart(ctx, data, type = "bar") {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.9)");
  gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)");

  return new Chart(ctx, {
    type,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Earnings",
          data: data.values,
          backgroundColor: type === "bar" ? gradient : "rgba(99,102,241,0.2)",
          borderColor: "#6366f1",
          borderWidth: 2,
          borderRadius: 8,
          tension: 0.4, // for line charts
          fill: type === "line"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#111827",
          titleColor: "#fff",
          bodyColor: "#fff",
          padding: 10,
          borderRadius: 8,
          displayColors: false
        }
      },

      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#6b7280"
          }
        },
        y: {
          grid: {
            color: "rgba(0,0,0,0.05)"
          },
          ticks: {
            color: "#6b7280"
          }
        }
      },

      animation: {
        duration: 800,
        easing: "easeOutQuart"
      }
    }
  });
}

