import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./App.css";

export default function App() {
  const [glucose, setGlucose] = useState("");
  const [food, setFood] = useState("");
  const [records, setRecords] = useState([]);

  const addRecord = () => {
    if (!glucose || !food) return;

    const today = new Date().toLocaleDateString();
    const status = [];

    // Glucose condition
    if (parseInt(glucose) > 160) {
      status.push("⚠️ High Glucose Level!");
    }

    // Food condition
    const healthyFoods = ["rice", "chapati", "salad", "fruit", "greens"];
    if (!healthyFoods.includes(food.toLowerCase())) {
      status.push("🍔 Unhealthy Food Intake!");
    }

    const newRecord = { date: today, glucose: parseInt(glucose), food, status };
    setRecords([...records, newRecord]);
    setGlucose("");
    setFood("");
  };

  return (
    <div className="app">
      <h1 className="title">🌈 Glucose & Diet Monitor</h1>

      <div className="form">
        <input
          type="number"
          value={glucose}
          placeholder="Enter Glucose Level"
          onChange={(e) => setGlucose(e.target.value)}
        />
        <input
          type="text"
          value={food}
          placeholder="Enter Food Intake"
          onChange={(e) => setFood(e.target.value)}
        />
        <button onClick={addRecord}>Add Record</button>
      </div>

      {/* Chart Section */}
      <div className="chart-box">
        <h2>📊 Glucose Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="glucose" stroke="#ff007f" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Records Section */}
      <div className="records">
        <h2>📌 Records</h2>
        {records.map((rec, idx) => (
          <div
            key={idx}
            className={`record ${rec.glucose > 160 ? "high" : "normal"}`}
          >
            <p><b>Date:</b> {rec.date}</p>
            <p><b>Glucose:</b> {rec.glucose}</p>
            <p><b>Food:</b> {rec.food}</p>
            {rec.status.length > 0 && (
              <p className="status">{rec.status.join(" | ")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
