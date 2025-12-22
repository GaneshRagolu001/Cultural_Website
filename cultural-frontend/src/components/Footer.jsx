import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-700 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Project Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">CulturaSphere</h2>
          <p className="text-sm leading-relaxed">
            An interactive platform to explore, preserve, and share the rich
            cultural heritage and traditions of India using modern web
            technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/heritage" className="hover:text-white">
                Heritage
              </Link>
            </li>
            <li>
              <Link to="/timeline" className="hover:text-white">
                Timeline
              </Link>
            </li>
            <li>
              <Link to="/stories" className="hover:text-white">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-white">
                Explore Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Built With</h3>
          <p className="text-sm leading-relaxed">
            React · Tailwind CSS · Node.js · Express · MongoDB · Cloudinary ·
            Leaflet
          </p>

          {/* Optional GitHub */}
          <a
            href="https://github.com/<your-username>/CulturaSphere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300"
          >
            View Source Code →
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} CulturaSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
