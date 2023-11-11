export const useClient = true;
import Card from "@/components/card";
import Footer from "@/components/footer/footer";
import SearchBar from "@/components/searchBar";
import React from "react";

const Home: React.FC = () => {
  return (
    <React.Fragment>
    
      <main className="flex items-center flex-col justify-center m-20 gap-y-5">
        <SearchBar />
        <Card cidade="São Paulo" temperatura={20} estado="SP" />
      </main>
      <Footer/>
    </React.Fragment>
  );
};

export default Home;

