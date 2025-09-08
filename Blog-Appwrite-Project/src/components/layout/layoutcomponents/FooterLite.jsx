// src/components/layout/layoutcomponents/FooterLite.jsx
import ReactLogo from "../../../assets/react.svg";
import TailwindLogo from "../../../assets/tailwind.png";
import ShadcnLogo from "../../../assets/shadcn.png"; // if available
import ReduxLogo from "../../../assets/redux.png";

const FooterLite = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col items-center gap-3">
        {/* Centered Logo */}
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Blogify
        </h1>

        {/* Tech Logos */}
        <div className="flex gap-3 items-center">
          <img src={ReactLogo} alt="React" className="w-5 h-5" title="React" />
          <img src={TailwindLogo} alt="Tailwind CSS" className="w-5 h-5" title="Tailwind CSS" />
          <img src={ShadcnLogo} alt="shadcn/ui" className="w-5 h-5" title="shadcn/ui" />
          <img src={ReduxLogo} alt="Redux Toolkit" className="w-5 h-5" title="Redux Toolkit" />
        </div>

        {/* Built With + Copyright */}
        <div className="text-gray-400 text-sm text-center">
          Built with React, Tailwind CSS, shadcn/ui & Redux Toolkit | © {year} Blogify
        </div>
      </div>
    </footer>
  );
};

export default FooterLite;
