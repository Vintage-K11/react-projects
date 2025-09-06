// src/components/layouts/HeaderLite.jsx
const HeaderLite = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4 flex justify-center">
        {/* Centered Logo */}
        <h1 className="text-2xl font-bold text-primary">Blogify</h1>
      </div>
    </header>
  );
};

export default HeaderLite;
