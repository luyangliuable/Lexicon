import NavBar from "../../components/Navbar/Nav";
import Footer from "../../components/Footer/Footer";
import HomePageFirstSection from "./firstSection/firstSection";
import HomePageSecondSection from "./secondSection/secondSection";
import HomePageThirdSection from "./thirdSection/thirdSection";

export default function HomePage() {
  return (
    <div>
      <HomePageFirstSection></HomePageFirstSection>
      <HomePageSecondSection></HomePageSecondSection>
      <HomePageThirdSection></HomePageThirdSection>
      <Footer></Footer>
    </div>
  );
}
