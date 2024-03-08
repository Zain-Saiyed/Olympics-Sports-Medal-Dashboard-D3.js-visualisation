import React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CountryComparison    from './Pages/CountryComparison';
import AthleteAnalysis      from './Pages/AthleteAnalysis';
import HistoricalTrends     from './Pages/HistoricalTrends';
import DemographicsInsights from './Pages/DemographicsInsights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                     element={<HomePage />} />
        <Route path="/country-comparison"   element={<CountryComparison />} />
        <Route path="/athlete-analysis"     element={<AthleteAnalysis />} />
        <Route path="/historical-trends"    element={<HistoricalTrends />} />
        <Route path="/demographic-insights" element={<DemographicsInsights />} />

      </Routes>
    </Router>
  );
}

export default App;
