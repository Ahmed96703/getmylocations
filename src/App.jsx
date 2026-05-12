import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocationFinder from './pages/LocationFinder.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationFinder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
