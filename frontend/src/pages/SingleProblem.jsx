import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelpDeskContext } from "../context/HelpDeskContext";
import { HelpContext } from "../context/HelpContext";
import { UserContext } from "../context/UserContext";


const SingleProblem = () => {
    const { id } = useParams();
    const { problem, deleteProblem, updateProblem, updateSolution, deleteSolution,addSolution,votes, voteOnSolution, fetchAllVotes, subscripStatus, subscriptionStatus } = useContext(HelpDeskContext);
    const { tag,addSubscribe,deleteSubscription } = useContext(HelpContext);
    const {current_user} = useContext(UserContext)
    
    
    
    const [showForm, setShowForm] = useState(false);
    const [updatedProblem, setUpdatedProblem] = useState({});
    const [showSolutionForm, setShowSolutionForm] = useState(false);
    const [updatedSolution, setUpdatedSolution] = useState({});
    const [tagId, setTagId] = useState(""); // Define tagId state
    const [description, setDescription] = useState("");
    const [showAddSolutionForm, setShowAddSolutionForm] = useState(false);

    // Find the specific problem by ID
    const singleProblem = problem ? problem.find((p) => p.id.toString() === id) : null;

    const handleEdit = () => {
        setUpdatedProblem({ description: singleProblem.description });
        setShowForm(true);
    };

    const handleSaveChanges = () => {
        if (updatedProblem.description) {
            updateProblem(singleProblem.id, updatedProblem.description, tagId); // Pass tagId when saving
            setShowForm(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleEditSolution = (solution) => {
        setUpdatedSolution({ id: solution.id, description: solution.description });
        setShowSolutionForm(true);
    };

    const handleSaveSolutionChanges = () => {
        if (updatedSolution.description) {
            updateSolution(updatedSolution.id, updatedSolution.description, tagId); // Pass tagId for solution
            setShowSolutionForm(false);
        }
    };

    const handleCancelSolution = () => {
        setShowSolutionForm(false);
    };

    const handleSubmitSolution = (e) => {
        e.preventDefault();
        if (!description || !tagId) {
            alert("Please fill in all fields");
            return;
        }
        addSolution(description, tagId, singleProblem.id);
        setDescription("");
        setTagId("");
        setShowAddSolutionForm(false);
    };

    useEffect(() => {
        if (singleProblem) { 
            subscripStatus(singleProblem.id);
        }
    }, [singleProblem]);


    useEffect(() => {
        if (singleProblem?.solutions.length > 0) {
            singleProblem.solutions.forEach((sol) => fetchAllVotes(sol.id));
        }
    }, [singleProblem]);
    
    
    const handleVote = (solution_id, vote_type) => {
        voteOnSolution(solution_id, vote_type);
    };

    return (
        <div className="min-h-screen flex flex-col p-12 sm:p-20 md:p-28 justify-center bg-gray-100">
            <div data-theme="teal" className="mx-auto max-w-7xl">
                <section className="font-sans text-black">
                    <div className="lg:flex lg:items-center bg-white shadow-2xl rounded-2xl overflow-hidden">
                        {/* Image Section */}
                        <div className="flex-shrink-0 self-stretch lg:w-1/3">
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src="https://i.pinimg.com/originals/75/87/df/7587df77ef521cf98057d0028ee983f1.gif"
                                alt=""
                            />
                        </div>
                        
                        {/* Text Section */}
                        {singleProblem ? (
                            <div className="p-10 lg:p-16 bg-gray-200 lg:w-2/3">
                                <h2 className="text-5xl font-bold text-gray-800">{singleProblem.description}</h2>
                                {Array.isArray(singleProblem?.tag) ? (
                                    singleProblem.tag.map((nam) => (
                                        <span key={nam.id} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                            {nam.name}
                                        </span>
                                    ))
                                ) : (
                                    singleProblem?.tag && (
                                        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                            {singleProblem.tag.name}
                                        </span>
                                    )
                                )}

                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />
                                {/* show buttons only if the logged-in user is the one who posted the problem */}

                                {singleProblem?.user?.id === current_user?.id && (
                                    <>
                                        <button onClick={handleEdit} className="bg-green-600 text-white px-3 py-1 rounded-lg ml-3">Edit</button>
                                        <button onClick={() => deleteProblem(singleProblem.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg ml-3">Delete</button>
                                    </>
                                    )}
                                
                                {subscriptionStatus[singleProblem.id] ?(
                                    <button
                                        onClick={() => deleteSubscription(singleProblem.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded-lg ml-3"
                                    >
                                        Unfollow
                                    </button>
                                
                                ):(
                                    <button
                                        onClick={() => addSubscribe(singleProblem.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg ml-3"
                                    >
                                        Follow
                                    </button>
                                    
                                )}
                                
                                
                                <button onClick={() => setShowAddSolutionForm(true)} className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-3">
                                    Add Solution
                                </button>
                                
                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />
                                
                                {singleProblem.solutions.length > 0 ? (
                                    <div className="max-h-60 overflow-y-auto"> {/* Added scrollable area */}
                                        <h3 className="text-2xl font-semibold text-gray-700">Solutions:</h3>
                                        {singleProblem?.solutions.map((sol) => (
                                            <div key={sol.id} className="mt-4">
                                                <p className="text-lg text-gray-700">{sol.description}</p>
                                                {sol?.tag &&(
                                                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                                        {sol.tag.name}
                                                    </span>
                                                )}

                                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />

                                                {/* Show edit & delete buttons only for the solution's owner */}
                                                {sol.user?.id === current_user?.id && (
                                                    <>
                                                        <button onClick={() => handleEditSolution(sol)} className="bg-yellow-600 text-white px-2 py-1 rounded mt-2">
                                                        Edit
                                                        </button>
                                                        <button onClick={() => deleteSolution(sol.id)} className="bg-red-600 text-white px-2 py-1 rounded mt-2 ml-3">
                                                        Delete
                                                        </button>
                                                    </>
                                                )}
                                                <button onClick={() => handleVote(sol.id, 1)}>
                                                    👍 {votes[sol.id]?.likes !== undefined ? votes[sol.id].likes : 0}
                                                </button>
                                                <button onClick={() => handleVote(sol.id, -1)}>
                                                    👎 {votes[sol.id]?.dislikes !== undefined ? votes[sol.id].dislikes : 0}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-4 text-lg text-gray-600">No solutions yet</p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-2xl">Problem not found</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Edit Problem Form */}
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Edit Problem</h2>
                        <input
                            type="text"
                            value={updatedProblem.description}
                            onChange={(e) => setUpdatedProblem({ ...updatedProblem, description: e.target.value })}
                            className="w-full border p-2 rounded text-gray-700"
                        />
                        <select
                            id="tag"
                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={tagId}
                            onChange={(e) => setTagId(e.target.value)} // Update the tagId when changed
                            required
                        >
                            <option value="">Select a tag</option>
                            {tag && tag.map((tags) => (
                                <option key={tags.id} value={tags.id}>
                                    {tags.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-4 mt-3">
                            <button onClick={handleSaveChanges} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Solution Form */}
            {showSolutionForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Solution</h2>
                        <input
                            type="text"
                            value={updatedSolution.description}
                            onChange={(e) => setUpdatedSolution({ ...updatedSolution, description: e.target.value })}
                            className="w-full border p-2 rounded text-gray-700"
                        />
                        <select
                            id="tag"
                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={tagId}
                            onChange={(e) => setTagId(e.target.value)} // Update the tagId for solution
                            required
                        >
                            <option value="">Select a tag</option>
                            {tag && tag.map((tags) => (
                                <option key={tags.id} value={tags.id}>
                                    {tags.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-4 mt-3">
                            <button onClick={handleSaveSolutionChanges} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={handleCancelSolution} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Add solution Form */}
            {showAddSolutionForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Solution</h2>
                        <textarea
                            className="w-full p-2 border rounded text-gray-700"
                            placeholder="Describe your solution..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <select
                            id="tag"
                            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={tagId}
                            onChange={(e) => setTagId(e.target.value)}
                            required
                        >
                            <option value="">Select a tag</option>
                            {tag && tag.map((tags) => (
                                <option key={tags.id} value={tags.id}>{tags.name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-4 mt-3">
                            <button onClick={handleSubmitSolution} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                            <button onClick={() => setShowAddSolutionForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SingleProblem;
