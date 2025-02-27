import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { HelpDeskContext } from "../context/HelpDeskContext";
import { HelpContext } from "../context/HelpContext";

const SingleProblem = () => {
    const { id } = useParams();
    const { problem, deleteProblem, updateProblem, updateSolution, deleteSolution } = useContext(HelpDeskContext);
    const { tag } = useContext(HelpContext);
    
    const [showForm, setShowForm] = useState(false);
    const [updatedProblem, setUpdatedProblem] = useState({});
    const [showSolutionForm, setShowSolutionForm] = useState(false);
    const [updatedSolution, setUpdatedSolution] = useState({});
    const [tagId, setTagId] = useState(""); // Define tagId state

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

                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />

                                <button onClick={handleEdit} className="bg-green-600 text-white px-3 py-1 rounded-lg ml-3">Edit</button>
                                <button onClick={() => deleteProblem(singleProblem.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg ml-3">Delete</button>
                                
                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />
                                
                                {singleProblem.solutions.length > 0 ? (
                                    <div className="max-h-60 overflow-y-auto"> {/* Added scrollable area */}
                                        <h3 className="text-2xl font-semibold text-gray-700">Solutions:</h3>
                                        {singleProblem.solutions.map((sol) => (
                                            <div key={sol.id} className="mt-4">
                                                <p className="text-lg text-gray-700">{sol.description}</p>

                                                <hr className="mt-6 mb-6 border-t-2 border-gray-400" />

                                                <button onClick={() => handleEditSolution(sol)} className="bg-yellow-600 text-white px-2 py-1 rounded mt-2">Edit</button>
                                                <button onClick={() => deleteSolution(sol.id)} className="bg-red-600 text-white px-2 py-1 rounded mt-2 ml-3">Delete</button>
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
        </div>
    );
};

export default SingleProblem;
