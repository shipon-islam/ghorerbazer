import BottomFooter from "./BottomFooter";
import TopFooter from "./TopFooter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-10 pb-20 md:pb-0 text-gray-200">
      <TopFooter />
      <BottomFooter />
    </footer>
  );
}
