import React, { useContext } from "react";
import { HelpContext } from "../context/HelpContext";
import { useParams } from "react-router-dom";

const NotiSolution = () => {
    const { notification } = useContext(HelpContext);
    const { notificationId } = useParams();

    // Find the specific notification by ID
    const selectedNotification = notification?.find(noti => noti.id.toString() === notificationId);

    return ( 
        <div>
            <div className="bg-gray-200 px-2 py-10">
                <div id="features" className="mx-auto max-w-6xl">
                    <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Solution
                    </h2>
                    
                    {selectedNotification ? (
                        <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                            <li className="rounded-xl bg-white px-6 py-8 shadow-sm" key={selectedNotification.id}>
                                <img 
                                    src="https://www.svgrepo.com/show/530438/ddos-protection.svg" 
                                    alt="Solution Icon" 
                                    className="mx-auto h-10 w-10"
                                />
                                <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                    {selectedNotification.solution_description}
                                </p>
                            </li>
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600 mt-4">No solution found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotiSolution;
