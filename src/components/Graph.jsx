import { useState } from "react";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function Graph() {
  const [histogramData, setHistogramData] = useState(null);

  async function fetchAndParseData() {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const text = await response.text();
    ChartJS.defaults.font.size = 18;
    // Split text into individual words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter(Boolean);
    const wordCounts = words.reduce((counts, word) => {
      counts[word] = (counts[word] || 0) + 1;
      return counts;
    }, {});


    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    console.log(words);
    console.log(wordCounts);
    console.log(Object.entries(wordCounts).sort((a, b) => b[1] - a[1]));

    const csvData = Papa.unparse(topWords, { header: true });

    setHistogramData({
      labels: topWords.map(([word]) => word),
      data: topWords.map(([_, count]) => count),
      csvData,
    });
  }

  function handleExportClick() {
    const csvBlob = new Blob([histogramData.csvData], {
      type: "text/csv;charset=utf-8;",
    });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "HistogramData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 20,
          },
        },
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
        font: 40,
      },
    },
  };
  return (
    <div className="Histo">
      {!histogramData && (
        <div className="submitbtn">
          <button onClick={fetchAndParseData} className="btn btn-submit">
            Submit
          </button>
        </div>
      )}
      {histogramData && (
        <div className="contain">
          <h2>Histogram for 20 most occuring words</h2>
          <Bar
            className="graph"
            options={option}
            data={{
              labels: histogramData.labels,
              datasets: [
                {
                  label: "Word Frequency",
                  data: histogramData.data,
                  backgroundColor: "rgba(160,195,255,0.6)",
                  borderColor: "#430056",
                  borderWidth: 2,
                },
              ],
            }}
          ></Bar>
          <button onClick={handleExportClick} className="btn btn-export">
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
}
