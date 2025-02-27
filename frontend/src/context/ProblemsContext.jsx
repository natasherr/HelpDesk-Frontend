import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
    const { authToken } = useContext(UserContext);
    const [problems, setProblems] = useState([]);
    const [onChange, setOnChange] = useState(true);

    // ============================== PROBLEM ================================
    // Fetch problems
    useEffect(() => {
        fetch('http://127.0.0.1:5000/problems', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setProblems(response);
            })
            .catch((error) => {
                toast.error("Failed to fetch problems.");
                console.error(error);
            });
    }, [authToken, onChange]);

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
    const addProblem = (description, tag_id) => {
        toast.loading("Uploading your problem...");
        fetch("http://127.0.0.1:5000/problems", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ description, tag_id })
        })
            .then((resp) => resp.json())
            .then((response) => {
                if (response.success) {
                    toast.dismiss();
                    toast.success(response.success);
                    setOnChange(!onChange);
                } else {
                    toast.dismiss();
                    toast.error(response.error || "Problem could not be added");
                }
            });
    };

    // Update Problem
    const updateProblem = (problem_id, description, tag_id) => {
        toast.loading("Updating your Problem...");
        fetch(`http://127.0.0.1:5000/problems/${problem_id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ description, tag_id })
        })
            .then((resp) => resp.json())
            .then((response) => {
                if (response.success) {
                    toast.dismiss();
                    toast.success(response.success);
                    setOnChange(!onChange);
                } else {
                    toast.dismiss();
                    toast.error(response.error || "Failed to update your problem.");
                }
            });
    };

    // Delete Problem
    const deleteProblem = (problem_id) => {
        toast.loading("Deleting Problem...");
        fetch(`http://127.0.0.1:5000/problems/${problem_id}`, {
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
                } else {
                    toast.dismiss();
                    toast.error(response.error || "Failed to delete problem.");
                }
            });
    };

    return (
        <ProblemContext.Provider value={{
            problems, setProblems, addProblem, getProblemById, updateProblem, deleteProblem
        }}>
            {children}
        </ProblemContext.Provider>
    );
};

