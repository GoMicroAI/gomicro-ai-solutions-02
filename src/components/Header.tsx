import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    href: "#solutions",
    label: "Solutions"
  }, {
    href: "#technology",
    label: "Technology"
  }, {
    href: "#about",
    label: "About"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="GoMicro" className="h-10 sm:h-12 w-auto" />
            <span className="font-bold text-foreground text-lg sm:text-2xl">GoMicro AI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
                {link.label}
              </a>)}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Button size="sm" className="lg:hidden" asChild>
              <a href="#contact">Book Demo</a>
            </Button>
            <Button size="lg" className="hidden lg:inline-flex" asChild>
              <a href="#contact">Book a Demo</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>)}
              <Button className="mt-2" asChild>
                <a href="#contact">Book a Demo</a>
              </Button>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;