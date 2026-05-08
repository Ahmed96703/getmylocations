import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';

export default function NotFound() {
  return (
    <main className="min-h-full grid place-items-center px-5 text-center">
      <div className="glass rounded-3xl p-10 max-w-md">
        <div className="flex justify-center"><Logo size={48} /></div>
        <div className="font-display text-3xl font-bold mt-4">Page not found</div>
        <p className="text-slate-300/90 mt-2 text-sm">The route you followed doesn’t exist.</p>
        <Link to="/tool/location-finder" className="btn-primary mt-5 inline-flex">Open Location Finder</Link>
      </div>
    </main>
  );
}
