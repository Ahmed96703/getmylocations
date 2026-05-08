import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocationFinder from './pages/LocationFinder.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tool/location-finder" replace />} />
        <Route path="/tool/location-finder" element={<LocationFinder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
