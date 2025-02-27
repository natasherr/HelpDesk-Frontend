import React, { useContext, useState } from "react";
import { HelpDeskContext } from "../context/HelpDeskContext";
import { HelpContext } from "../context/HelpContext";

const AddSolution = () => {
    const { addSolution, problem } = useContext(HelpDeskContext);
    const { tag } = useContext(HelpContext);

    const [description, setDescription] = useState('');
    const [tag_id, setTag_Id] = useState('');
    const [problem_id, setProblem_Id] = useState('');
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addSolution(description, tag_id, problem_id);
    };
    
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Reply to Problem</h1>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Describe</label>
                        <textarea 
                            id="message" 
                            name="message"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 border-gray-300 p-2 rounded-lg w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            placeholder="Your Problem" 
                            required
                        ></textarea>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <div className="w-full">
                            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Choose Tag</label>
                            <select 
                                id="tag"
                                className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded w-full"
                                value={tag_id}
                                onChange={(e) => setTag_Id(e.target.value)}
                                required
                            >
                                <option value="">Select a tag</option>
                                {tag && tag.map((tags) => (
                                    <option key={tags.id} value={tags.id}>
                                        {tags.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center mt-4">
                        <div className="w-full">
                            <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Choose Problem</label>
                            <select 
                                id="problem"
                                className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded w-full"
                                value={problem_id}
                                onChange={(e) => setProblem_Id(e.target.value)}
                                required
                            >
                                <option value="">Select a Problem</option>
                                {problem && problem.map((problems) => (
                                    <option key={problems.id} value={problems.id}>
                                        {problems.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="bg-indigo-500 text-white p-2 rounded-lg font-semibold w-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 mt-4"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
 
export default AddSolution;
