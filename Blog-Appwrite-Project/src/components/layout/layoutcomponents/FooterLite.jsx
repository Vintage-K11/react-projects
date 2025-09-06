// src/components/layouts/FooterLite.jsx
import { ReactComponent as ReactLogo } from "../../assets/logos/react.svg";
import { ReactComponent as TailwindLogo } from "../../assets/logos/tailwind.svg";
import { ReactComponent as ShadcnLogo } from "../../assets/logos/shadcn.svg"; // if available
import { ReactComponent as ReduxLogo } from "../../assets/logos/redux.svg";

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
          <ReactLogo className="w-5 h-5" title="React" />
          <TailwindLogo className="w-5 h-5" title="Tailwind CSS" />
          <ShadcnLogo className="w-5 h-5" title="shadcn/ui" />
          <ReduxLogo className="w-5 h-5" title="Redux Toolkit" />
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
