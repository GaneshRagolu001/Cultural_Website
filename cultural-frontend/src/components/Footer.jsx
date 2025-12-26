import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Globe,
  Heart,
  Compass,
  Mail,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Heritage", path: "/heritage" },
    { name: "Timeline", path: "/timeline" },
    { name: "Stories", path: "/stories" },
    { name: "Explore Map", path: "/map" },
  ];

  return (
    <footer className="bg-[#1A191E] text-stone-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Compass className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                Cultura<span className="text-amber-500">Sphere</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-stone-500">
              An immersive digital sanctuary dedicated to the preservation of
              India's intangible traditions and architectural marvels.
              Leveraging modern stacks to keep ancient stories alive for the
              next generation.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, text: "#f59e0b" }}
                  href="#"
                  className="p-2 bg-white/5 rounded-full hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">
              Discovery
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-amber-500 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech & Contact Section */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">
              Built With
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {["React", "MongoDB", "Node.js", "Tailwind", "Leaflet"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hello@culturasphere.com"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
              >
                <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Mail size={16} />
                </div>
                hello@culturasphere.com
              </a>
              <a
                href="https://github.com/your-username/CulturaSphere"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 group"
              >
                DEPLOYMENT STATUS: OPERATIONAL
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-800 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-600">
          <p>© {currentYear} CulturaSphere Heritage Foundation</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-900 fill-red-900" />{" "}
            in India
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-stone-400">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
