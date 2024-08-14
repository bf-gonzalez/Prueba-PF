import React from "react";

const Carrousel: React.FC = () => {
    return (
        <div className="flex items-center relative w-[98vw] h-[200px] sm:h-[250px] md:h-[300px] border-none bg-none border-0">
            <img 
                src="/images/carrousel2.png" 
                className="absolute left-[5%] sm:left-[10%] md:left-[15%] top-0 opacity-0 animate-display w-[90vw] sm:w-[80vw] md:w-[72vw]"
                style={{ animationDelay: '.5s' }}
                alt="Carrousel Image 1"
            />
            <img 
                src="/images/carrousel3.png" 
                className="absolute left-[5%] sm:left-[10%] md:left-[15%] top-0 opacity-0 animate-display w-[90vw] sm:w-[80vw] md:w-[72vw]"
                style={{ animationDelay: '6s' }}
                alt="Carrousel Image 2"
            />
            <img 
                src="/images/carrousel4.png" 
                className="absolute left-[5%] sm:left-[10%] md:left-[15%] top-0 opacity-0 animate-display w-[90vw] sm:w-[80vw] md:w-[72vw]"
                style={{ animationDelay: '11s' }}
                alt="Carrousel Image 3"
            />
        </div>
    );
}

export default Carrousel;
