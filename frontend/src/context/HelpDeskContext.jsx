import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const HelpDeskContext  = createContext()

export const HelpDeskProvider = ({children}) => 
    {
        const navigate = useNavigate()
        const {authToken} = useContext(UserContext)

        const [problem, setProblem] = useState([])
        const [solution, setSolution] = useState([])
        const [votes, setVotes] = useState({});
        const [subscriptionStatus, setSubscriptionStatus] = useState({});
        
        
        
        


        const [onChange, setOnChange] = useState(true)

        // ==============================PROBLEM===============================
        // Fetch problems
        useEffect(() => {
            if (authToken) {
               fetch('https://helpdesk-backend-jq1g.onrender.com/problems', {
                   method: "GET",
                   headers: {
                       'Content-Type': 'application/json',
                       Authorization: `Bearer ${authToken}`
                   }
               })
               .then((response) => response.json())
               .then((response) => {
                   setProblem(response.problems || []); // Ensure we get the list of problems
               })
               .catch((error) => console.error("Error fetching problems:", error));
            }
         }, [authToken, onChange]); // Re-run when authToken changes
         
        


    // Fetch problem by ID
    const getProblemById = (problem_id) => {
        return fetch(`https://helpdesk-backend-jq1g.onrender.com/problems/${problem_id}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then((resp) => resp.json())
            .then((response) => {
                if (response.error) {
                    toast.error(response.error);
                    return null;
                }
                return response;
            })
            .catch((error) => {
                toast.error("Failed to fetch problem.");
                console.error(error);
                return null;
            });
    };

        // Add problem
        const addProblem = (description, tag_id) => 
            {
                toast.loading("Uploading your problem... ")
                fetch("https://helpdesk-backend-jq1g.onrender.com/problems",{
                    method:"POST",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization : `Bearer ${authToken}`
        
                        },
                    body: JSON.stringify({
                        description, tag_id
                    })
                })
                .then((resp)=>resp.json())
                .then((response)=>{
                    console.log(response);
                    
                    if(response.success){
                        toast.dismiss()
                        toast.success(response.success)
                        setOnChange(!onChange)
                        navigate("/problems");
                    }
                    else if(response.error){
                        toast.dismiss()
                        toast.error(response.error)
                    }
                    else{
                        toast.dismiss()
                        toast.success("Problem added successfully!")
                    } 
                })
            }

            
        // Update Problem
        const updateProblem = (problem_id,description, tag_id) => {
            toast.loading("Updating your Problem... ");
            fetch(`https://helpdesk-backend-jq1g.onrender.com/problems/${problem_id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    description,
                    tag_id
                })
            })
            .then((resp) => resp.json())
            .then((response) => {
                console.log(response);
                
                if (response.message) {
                    toast.dismiss();
                    toast.success(response.success);
                    setOnChange(!onChange);
                } else if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                } else {
                    toast.dismiss();
                    toast.success("Updated Successfully.");
                }
            });
        }

        // Delete Problem
        const deleteProblem = (problem_id) => 
            {
                toast.loading("Deleting Problem ... ")
                fetch(`https://helpdesk-backend-jq1g.onrender.com/problems/${problem_id}`,{
                    method:"DELETE",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
        
                      }
                })
                .then((resp)=>resp.json())
                .then((response)=>{
                    
                    if(response.success){
                        toast.dismiss()
                        toast.success(response.success)
                        setOnChange(!onChange)
                        navigate("/")
        
                    }
                    else if(response.error){
                        toast.dismiss()
                        toast.error(response.error)
        
                    }
                    else{
                        toast.dismiss()
                        toast.success("Problem deleted successfully!")
        
                    }    
                })
            }


        // fetching subscription status
        const subscripStatus = async (problem_id) => {
            try {
                const response = await fetch(`https://helpdesk-backend-jq1g.onrender.com/subscription-status/${problem_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setSubscriptionStatus(prev => ({
                    ...prev,
                    [problem_id]: data.subscribed, // Store status for each problem ID
                }));
                
            } catch (error) {
                toast.error("Failed to fetch subscription status.");
                console.error("Fetch error:", error);
            }
        };
    
        



        // =====================================SOLUTION==============================
        // Fetch Solution
        useEffect(() => {
            if (!authToken) return; // Prevent fetch if authToken is missing
        
            fetch('https://helpdesk-backend-jq1g.onrender.com/solutions', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setSolution(data.solutions);
            })
            .catch((error) => {
                console.error("Error fetching solutions:", error);
            });
        }, [authToken]); // Add `authToken` as a dependency
        

        // Fetch solution by ID
        const getSolutionByID = (solution_id) => {
            return fetch(`https://helpdesk-backend-jq1g.onrender.com/solutions/${solution_id}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
                .then((resp) => resp.json())
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error);
                        return null;
                    }
                    return response;
                })
                .catch((error) => {
                    toast.error("Failed to fetch solution.");
                    console.error(error);
                    return null;
                });
        };

        // Add Solution
        const addSolution = (description, tag_id, problem_id) => {
            toast.loading("Uploading your solution...");
            fetch("https://helpdesk-backend-jq1g.onrender.com/solutions", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    description, tag_id, problem_id
                })
            })
                .then((resp) => resp.json())
                .then((response) => {
                    if (response.message) {
                        toast.dismiss();
                        toast.success(response.message);
                        setOnChange(!onChange);
                    } else if (response.error) {
                        toast.dismiss();
                        toast.error(response.error);
                    } else {
                        toast.dismiss();
                        toast.success("Solution added successfully!");
                    }
                });
        }

        // Update Solution
        const updateSolution = (solution_id, description, tag_id, problem_id) => {
            toast.loading("Updating your solution...");
            fetch(`https://helpdesk-backend-jq1g.onrender.com/solutions/${solution_id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    description,
                    tag_id,
                    problem_id
                })
            })
                .then((resp) => resp.json())
                .then((response) => {
                    if (response.success) {
                        toast.dismiss();
                        toast.success(response.success);
                        setOnChange(!onChange);
                    } else if (response.error) {
                        toast.dismiss();
                        toast.error(response.error);
                    } else {
                        toast.dismiss();
                        toast.error("Failed to update your solution.");
                    }
                });
        };


        // Delete Solution
        const deleteSolution = (solution_id) => {
            toast.loading("Deleting solution...");
            fetch(`https://helpdesk-backend-jq1g.onrender.com/solutions/${solution_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then((resp) => resp.json())
            .then((response) => {
                toast.dismiss();
                if (response.success) {
                    toast.success(response.success);
                    setOnChange(!onChange);
                } else {
                    toast.error(response.error || "Failed to delete solution");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("Failed to delete solution");
                console.error("Delete Error:", error);
            });
        };
        

    // Add tag
    const addTag = (name) => {
        toast.loading("Adding tag...");
        fetch("https://helpdesk-backend-jq1g.onrender.com/tags", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${authToken}`
            },
            body: JSON.stringify({ name })
        })
            .then((resp) => resp.json())
            .then((response) => {
                if (response.success) {
                    toast.dismiss();
                    toast.success(response.success);
                    setOnChange(!onChange);
                } else if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                }
            });
    };




    // ================Votes==================
        // Function to like/dislike a solution
        const voteOnSolution = (solution_id, vote_type) => {
            toast.loading("Recording your vote...");
        
            fetch(`https://helpdesk-backend-jq1g.onrender.com/solutions/${solution_id}/vote`, {
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
        


        const fetchAllVotes = async (solution_id) => {
            try {
                const response = await fetch(`https://helpdesk-backend-jq1g.onrender.com/solutions/${solution_id}/votes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    }
                });
        
                const data = await response.json();
        
                if (data.error) {
                    toast.error(data.error);
                    return null;
                }
        
                setVotes((prevVotes) => ({
                    ...prevVotes,
                    [solution_id]: { likes: data.likes, dislikes: data.dislikes }
                }));
        
                return data;
            } catch (error) {
                toast.error("Failed to fetch votes");
                console.error(error);
                return null;
            }
        };
        

        
        const data ={
            problem,
            solution,
            votes,
            subscriptionStatus,
            
           


            fetchAllVotes,
            voteOnSolution,
            
            getProblemById,
            addProblem,
            updateProblem,
            deleteProblem,
            
            getSolutionByID,
            addSolution,
            updateSolution,
            deleteSolution,

            
            addTag,

            subscripStatus,
            
            
        }
        return(
            <HelpDeskContext.Provider value={data}>
                {children}
            </HelpDeskContext.Provider>
        )
}