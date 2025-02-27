import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const HelpContext = createContext()

export const HelpProvider = ({children}) => 
    {
        const navigate = useNavigate()
        const {authToken} = useContext(UserContext)

        const [faqs, setFaqs] = useState([])
        const [notification, setNotification] = useState([])
        const [tag, setTag] = useState([])
        const [solutionbytag, setSolutionByTag] = useState([]);


        const [onChange, setOnChange] = useState(true)
        



        // ====================notification=============
            useEffect(() => {
                fetch(`http://127.0.0.1:5000/notifications`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => response.json())
                .then((response) => {
                    setNotification(response.notifications || []); // Ensure it's always an array
                })
                .catch((error) => console.error("Error fetching notifications:", error));
            }, [authToken]);
        
        
            // ==> Delete Notification
            const deleteNotification = (id) => {
                toast.loading("Deleting Notification...");
                fetch(`http://127.0.0.1:5000/notifications/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`, // Ensure authToken is valid
                    },
                })
                .then((resp) => resp.json())
                .then((response) => {
                    toast.dismiss();
                    
                    if (response.message === "Notification deleted successfully") {
                        toast.success(response.message);
                        setOnChange(!onchange); // Trigger a refresh
                    } else {
                        toast.error(response.message || "Failed to delete");
                    }
                })
                .catch((error) => {
                    toast.dismiss();
                    toast.error("Error deleting notification");
                    console.error("Delete Notification Error:", error);
                });
            };
        
        
        
        
            // =======================TAG======================
            useEffect(() => {
                fetch(`http://127.0.0.1:5000/tags`, { 
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => response.json())
                .then((response) => {
                    setTag(response || []); // response is already an array
                })
                .catch((error) => console.error("Error fetching tags:", error));
            }, [authToken]);




            //  ===> fetching solution based on a tag
            const fetchSolutionByTag = (tagId) => {
                fetch(`http://127.0.0.1:5000/tags/${tagId}/solutions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((resp) => resp.json())
                .then((response) => {
                    console.log("API Response:", response);
                    
                    if (response.error) {
                        toast.error(response.error || "Failed to fetch solutions");
                        return;
                    }
            
                    if (Array.isArray(response)) {
                        setSolutionByTag(response);
                    } else {
                        console.error("Unexpected response format", response);
                        setSolutionByTag([]);
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    setSolutionByTag([]);
                });
            };
            







            // ================= FAQS==============
            useEffect(() => {
                fetch(`http://127.0.0.1:5000/faqs`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => response.json())
                .then((response) => {
                    setFaqs(response);
                });
            }, [onChange]);
    
    
            const data = {
                notification,
                faqs,
                tag,
                solutionbytag,


                deleteNotification,
                fetchSolutionByTag
            }
            return(
                <HelpContext.Provider value={data}>
                    {children}
                </HelpContext.Provider>
            )
    }