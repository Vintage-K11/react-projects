// src/components/layouts/MainLayout.jsx
import {Outlet} from "react-router-dom"
import Header from "./layoutcomponents/Header";
import Footer from "./layoutcomponents/Footer";
import Container from "./layoutcomponents/Container";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Full Header */}
      <Header />

      {/* Main Content using Container */}
      <main className="flex-grow w-full">
      <Container className="flex-grow">
        <Outlet />
      </Container>
      </main>
        
      {/* Full Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
