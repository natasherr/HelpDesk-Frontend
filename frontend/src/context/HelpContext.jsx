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




        // ================Votes==================
        // Function to like/dislike a solution
        const voteOnSolution = (solution_id, vote_type) => {
            toast.loading("Recording your vote...");
        
            fetch(`http://127.0.0.1:5000/solutions/${solution_id}/vote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ vote_type })
            })
            .then((resp) => resp.json())
            .then((response) => {
                toast.dismiss();
                
                if (response.message) {
                    toast.success(response.message);
                    setOnChange(prev => !prev);  // Trigger UI update
                } else {
                    toast.error("Failed to record your vote.");
                }
            })
            .catch((error) => {
                toast.dismiss();
                console.error("Error voting on solution:", error);
                toast.error("An error occurred while voting.");
            });
        };
        


        // Function to fetch vote counts for a solution
        const fetchVoteCounts = (solution_id) => {
            fetch(`http://127.0.0.1:5000/solutions/${solution_id}/voted`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    setVotes((prevVotes) => ({
                        ...prevVotes,
                        [solution_id]: data,  // Ensure state is updated correctly
                    }));
                }
            })
            .catch((error) => console.error("Error fetching votes:", error));
        };



        // ========================Subscribe=====================
        // Subscribing
        const addSubscribe = (problem_id) => {
            toast.loading("Subscribing to the Question....");
            
            fetch("http://127.0.0.1:5000/subscribe", {
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
            fetch(`http://127.0.0.1:5000/unsubscribe/${problem_id}`, {
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


                deleteNotification,
                fetchSolutionByTag,

                voteOnSolution,
                fetchVoteCounts,

                addSubscribe,
                deleteSubscription
            }
            return(
                <HelpContext.Provider value={data}>
                    {children}
                </HelpContext.Provider>
            )
    }