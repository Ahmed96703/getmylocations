import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocationFinder from './pages/LocationFinder.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';
import FixLocationNotWorking from './pages/FixLocationNotWorking.jsx';
import GpsCoordinatesFinder from './pages/GpsCoordinatesFinder.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationFinder />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/fix-location-not-working" element={<FixLocationNotWorking />} />
        <Route path="/gps-coordinates-finder" element={<GpsCoordinatesFinder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
