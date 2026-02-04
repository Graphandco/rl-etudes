export default function FooterWrapper({ children }) {
   return (
      <footer className="bg-primary text-white">
         <div className="wrapper py-6 sm:py-10 md:py-16">{children}</div>
      </footer>
   );
}
