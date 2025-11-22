import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Footer component
import { GlobalProvider } from "@/contexts/GlobalContext";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse",
  description: "Find The Perfect Rental Property",
};

const MainLayout = ({ children }) => {
  return (
    <>
      <GlobalProvider>
        <AuthProvider>
          <html lang="en">
            <body>
              <ToastContainer />
              <Navbar />
              <div>{children}</div>
              <Footer />
            </body>
          </html>
        </AuthProvider>
      </GlobalProvider>
    </>
  );
};

export default MainLayout;
