import React from "react";
import Header from "../components/Header";
import Survey from "../components/Survey";


const HomeContent:React.FC = () => {

    return(
        <div>
        {/* Header */}
        <Header />

        <Survey />

        </div>
    );
};

export default HomeContent;