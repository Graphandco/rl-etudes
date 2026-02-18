import Topbar from "@/components/header/Topbar";
import NavBar from "@/components/header/NavBar";

export default function HeaderWrapper() {
   return (
      <header
         className="relative z-10"
         style={{ viewTransitionName: "header" }}
      >
         <Topbar />
         <NavBar />
      </header>
   );
}
