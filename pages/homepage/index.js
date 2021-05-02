import NavBar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import HomePageFirstSection from "./firstSection/firstSection";
import HomePageSecondSection from "./secondSection/secondSection";

export default function HomePage() {
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <HomePageFirstSection></HomePageFirstSection>
      <HomePageSecondSection></HomePageSecondSection>
      <Footer></Footer>
    </div>
  )
}