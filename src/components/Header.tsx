import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { href: "solutions", label: "Solutions" },
    { href: "technology", label: "Technology" },
    { href: "about", label: "About" },
    { href: "contact", label: "Contact" },
    { href: "/joindemo", label: "Join Our Next Online Demo", isRoute: true },
  ];

  const getNavHref = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      {/* Scrolling Banner */}
      <div className="bg-primary text-primary-foreground py-1.5 overflow-hidden">
        <div className="flex animate-scroll-banner">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex-shrink-0 px-4 text-sm font-semibold tracking-wide whitespace-nowrap">
              Super Human HC • More Accurate • Faster • Lower Cost • Lower Rejection Risk •&nbsp;
            </span>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="GoMicro" className="h-10 sm:h-12 w-auto" />
            <span className="font-bold text-foreground text-lg sm:text-2xl">GoMicro AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              'isRoute' in link && link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={getNavHref(link.href)}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button size="lg" asChild>
              <Link to="/joindemo">Book a Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={getNavHref(link.href)}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-2" asChild>
                <Link to="/joindemo" onClick={() => setIsMenuOpen(false)}>Book a Demo</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
