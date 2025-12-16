import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getNavHref = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`;
  };

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GoMicro" className="h-10 w-auto" />
              <span className="text-xl font-bold">GoMicro</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              AI-first company developing cutting-edge AI solutions for the Agricultural Industry. 
              Super Human QC for grains, nuts, and fresh produce.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href={getNavHref("solutions")} className="text-muted-foreground hover:text-primary transition-colors">
                  Grains
                </a>
              </li>
              <li>
                <a href={getNavHref("solutions")} className="text-muted-foreground hover:text-primary transition-colors">
                  Nuts
                </a>
              </li>
              <li>
                <a href={getNavHref("solutions")} className="text-muted-foreground hover:text-primary transition-colors">
                  Fruits & Vegetables
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href={getNavHref("about")} className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href={getNavHref("technology")} className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href={getNavHref("contact")} className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GoMicro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
