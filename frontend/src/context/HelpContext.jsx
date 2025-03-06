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
        const [votes, setVotes] = useState({});
        const [subscribe, setSubscribe] = useState({});
        const [Problembytag, setProblemByTag] = useState([]);
        const [unreadCount, setUnreadCount] = useState(0);




        const [onChange, setOnChange] = useState(true)
        



        // ====================notification=============
            useEffect(() => {
                fetch(`https://helpdesk-backend-jq1g.onrender.com/notifications`, {
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
            }, [authToken,onChange]);
        
        
            // ==> Delete Notification
            const deleteNotification = (id) => {
                toast.loading("Deleting Notification...");
                fetch(`https://helpdesk-backend-jq1g.onrender.com/notifications/${id}`, {
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

            // ===> Mark as read
            const markAsRead = (notification_id) => {
                toast.loading("marking as Read ...");
                fetch(`https://helpdesk-backend-jq1g.onrender.com/notifications/${notification_id}/marks`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((resp) => resp.json())
                .then((response) =>{
                    toast.dismiss();
                    
                    if (response.message) {
                        toast.success(response.message); // ✅ Corrected line
                        setOnChange(!onChange);
                    }
                    else if (response.error){
                        toast.error(response.error);
                    }
                    else {
                        toast.error("Failed to mark as read");
                    }
                })
                .catch((error) => {
                    toast.dismiss();
                    toast.error("An error occurred while marking as read");
                    console.error("Error:", error);
                });
            };
            


            // ====>fetch count notification
            useEffect(() => {
                if (!authToken) {
                    console.warn("No auth token available.");
                    return;
                }
            
                fetch("https://helpdesk-backend-jq1g.onrender.com/notifications/unread", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }
                    return resp.json();
                })
                .then((response) => {
                    setUnreadCount(response.unread_notifications || 0); // Extract count
                })
                .catch((error) => {
                    console.error("Error fetching unread notifications:", error);
                });
            }, [authToken,onChange]); 
            

        
            // =======================TAG======================
            useEffect(() => {
                fetch(`https://helpdesk-backend-jq1g.onrender.com/tags`, { 
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
            }, [authToken,onChange]);




            //  ===> fetching solution based on a tag
            const fetchSolutionByTag = (tagId) => {
                fetch(`https://helpdesk-backend-jq1g.onrender.com/tags/${tagId}/solutions`, {
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


            // fetching problems based on a tag
            const fetchProblemByTag = (tagId) => {
                fetch(`https://helpdesk-backend-jq1g.onrender.com/tags/${tagId}/problems`,{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    }
                })
                .then((resp) => resp.json())
                .then((response) => {
                    console.log(response);

                    if (response.error){
                        toast.error(response.error || "Failed to fetch solutions");
                        return;
                    }

                    if (Array.isArray(response)) {
                        setProblemByTag(response);
                    } else {
                        console.error("Unexpected response format", response);
                        setProblemByTag([]);
                    }
                })
                .catch((error) => {
                    console.error("Fetch eorror:", error);
                    setProblemByTag([])
                })
            }
            

            // ================= FAQS==============
            useEffect(() => {
                fetch(`https://helpdesk-backend-jq1g.onrender.com/faqs`, {
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



        // ========================Subscribe=====================
        // Subscribing
        const addSubscribe = (problem_id) => {
            toast.loading("Subscribing to the Question....");
            
            fetch("https://helpdesk-backend-jq1g.onrender.com/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ problem_id })
            })
            .then((resp) => resp.json())
            .then((response) => {
                console.log(response);
        
                if (response.message) {
                    toast.dismiss();
                    toast.success(response.message); 
                    setOnChange((prev) => !prev);  
                } else if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                } else {
                    toast.dismiss();
                    toast.success("Subscribed successfully");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("Subscription failed");
                console.error("Subscription Error:", error);
            });
        };
        
        // Unsubscribing
        const deleteSubscription = (problem_id) => {
            toast.loading("Unsubscribing from the Problem...");
            fetch(`https://helpdesk-backend-jq1g.onrender.com/unsubscribe/${problem_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                }
            })
            .then((resp) => resp.json())
            .then((response) => {
                console.log(response);
                
                if (response.message) {
                    toast.dismiss();
                    toast.success(response.message);
                    setOnChange(prev => !prev);  // Ensure state update
                } else if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                } else {
                    toast.dismiss();
                    toast.error("Failed to unsubscribe.");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("An error occurred. Please try again.");
                console.error(error);
            });
        };
        

            const data = {
                notification,
                faqs,
                tag,
                solutionbytag,
                votes,
                Problembytag,
                unreadCount,


                markAsRead,


                deleteNotification,
                fetchSolutionByTag,
                fetchProblemByTag,

                

                addSubscribe,
                deleteSubscription
            }
            return(
                <HelpContext.Provider value={data}>
                    {children}
                </HelpContext.Provider>
            )
    }