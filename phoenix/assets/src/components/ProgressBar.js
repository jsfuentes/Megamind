import React, { useState } from "react";

export default function ProgressBar(props) {
    
    const [percentage, setPercentage] = useState(50);

    return (
        <div>
            <div className="text-white text-right font-bold pb-2" style={{width: percentage + '%'}}>
                {percentage}%
            </div>
            <div className="block duration-150 border-l border-r border-b border-t border-blue-200 text-right rounded pt-2 pb-2 bg-blue-500 text-black shadow" style={{width: percentage + '%'}}>
            </div> 
        </div>      
    );
}
