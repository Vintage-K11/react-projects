// src/components/layouts/HeaderLite.jsx
import Logo from "@/components/common/Logo";
const HeaderLite = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4 flex justify-center">
        {/* Centered Logo */}
                <Logo />
      </div>
    </header>
  );
};

export default HeaderLite;
