import Home from "./pages/home";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <div
      className="min-h-screen bg-black"
      style={{
        backgroundImage: "url('/basketball-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}
