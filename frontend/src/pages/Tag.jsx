import React, { useContext, useEffect } from "react";
import { HelpContext } from "../context/HelpContext";
import { useParams } from "react-router-dom";

const Tag = () => {
    const { fetchSolutionByTag, solutionbytag } = useContext(HelpContext);
    const { tagId } = useParams(); 

    // Fetch solutions when tagId changes
    useEffect(() => {
        if (tagId) {
            fetchSolutionByTag(tagId);
        }
    }, [tagId]);

    return ( 
        <div>
            <div className="bg-gray-200 px-2 py-10">
                <div id="features" className="mx-auto max-w-6xl">
                    <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Solutions
                    </h2>
                    <div className="space-y-4">
                        {Array.isArray(solutionbytag) && solutionbytag.length > 0 ? (
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                                    {solutionbytag.map((solution) => (
                                        <li key={solution.id} className="rounded-xl bg-white px-6 py-8 shadow-sm">
                                            <img src="https://www.svgrepo.com/show/530438/ddos-protection.svg" alt="Solution Icon" className="mx-auto h-10 w-10"/>
                                            <h3 className="my-3 font-display font-medium">{solution.description}</h3>
                                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                                {solution.problem ? solution.problem.description : "No associated problem"}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No solutions available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tag;
