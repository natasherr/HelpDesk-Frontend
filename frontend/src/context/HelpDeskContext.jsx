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
        const [notification, setNotification] = useState([])
        const [tag, setTag] = useState([])
        const [vote, setVote] = useState([])


        const [onChange, setOnChange] = useState(true)

        // ==============================PROBLEM===============================
        // Fetch problems
        useEffect(()=>{
            fetch('http://127.0.0.1:5000/problems',{
                    method:"GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                .then((response) => response.json())
                .then((response) => {
                setProblem(response)
                });
       }, [])


    // Fetch problem by ID
    const getProblemById = (problem_id) => {
        return fetch(`http://127.0.0.1:5000/problems/${problem_id}`, {
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
                fetch("http://127.0.0.1:5000/problems",{
                    method:"POST",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
        
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
                        setOnchange(!onChange)
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
            fetch(`http://127.0.0.1:5000/problems/${problem_id}`, {
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
                    toast.success(response.message);
                    setOnchange(!onChange);
                } else if (response.error) {
                    toast.dismiss();
                    toast.error(response.error);
                } else {
                    toast.dismiss();
                    toast.error("Failed to update your problem.");
                }
            });
        }

        // Delete Problem
        const deleteProblem = (problem_id) => 
            {
                toast.loading("Deleting Problem ... ")
                fetch(`http://127.0.0.1:5000/problems/${problem_id}`,{
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
                        setOnchange(!onChange)
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
        // =====================================SOLUTION==============================
        // Fetch Solution
        useEffect(() => {
            fetch('http://127.0.0.1:5000/solutions', {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    setSolution(response.solutions);
                });
        }, [])

        // Fetch solution by ID
        const getSolutionByID = (solution_id) => {
            return fetch(`http://127.0.0.1:5000/solutions/${solution_id}`, {
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
            fetch("http://127.0.0.1:5000/solutions", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
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
            fetch(`http://127.0.0.1:5000/solutions/${solution_id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
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
            fetch(`http://127.0.0.1:5000/solutions/${solution_id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
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
                        toast.success("Solution deleted successfully");
                    }
                });
        };

        // ==============================VOTING===============================
    // Create or update vote
    const voteOnSolution = (solution_id, vote_type) => {
        toast.loading("Recording your vote...");
        fetch(`http://127.0.0.1:5000/solutions/${solution_id}/vote`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ vote_type })
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
                    toast.error("Failed to record your vote.");
                }
            });
    };

    // Delete vote
    const deleteVote = (vote_id) => {
        toast.loading("Deleting your vote...");
        fetch(`http://127.0.0.1:5000/solutions/${vote_id}/vote`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
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
                    toast.error("Failed to delete your vote.");
                }
            });
    };


    // Add tag
    const addTag = (name) => {
        toast.loading("Adding tag...");
        fetch("http://127.0.0.1:5000/tags", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
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

    // Update tag
    const updateTag = (tag_id, name) => {
        toast.loading("Updating tag...");
        fetch(`http://127.0.0.1:5000/tags/${tag_id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
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

    // Delete tag
    const deleteTag = (tag_id) => {
        toast.loading("Deleting tag...");
        fetch(`http://127.0.0.1:5000/tags/${tag_id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
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

    // Fetch tag by ID
    const getTagById = (tag_id) => {
        return fetch(`http://127.0.0.1:5000/tags/${tag_id}`, {
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
                toast.error("Failed to fetch tag.");
                console.error(error);
                return null;
            });
    };

    

        
        const data ={
            problem,
            solution,
            notification,
            tag,
            vote,
            
            getProblemById,
            addProblem,
            updateProblem,
            deleteProblem,
            
            getSolutionByID,
            addSolution,
            updateSolution,
            deleteSolution,

            voteOnSolution,
            deleteVote,
            addTag,
            updateTag,
            deleteTag,
            getTagById
            
        }
        return(
            <HelpDeskContext.Provider value={data}>
                {children}
            </HelpDeskContext.Provider>
        )
    }