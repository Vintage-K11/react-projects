// src/components/layouts/MainLayout.jsx
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Container";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full Header */}
      <Header />

      {/* Main Content using Container */}
      <Container className="flex-grow">
        {children}
      </Container>

      {/* Full Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
