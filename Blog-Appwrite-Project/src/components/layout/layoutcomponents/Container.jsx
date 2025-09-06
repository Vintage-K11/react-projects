// src/components/layouts/Container.jsx
const Container = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto px-6 py-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
