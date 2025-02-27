import React, { useContext, useState } from "react";
import { HelpDeskContext } from "../context/HelpDeskContext";
import { HelpContext } from "../context/HelpContext";

const AddProblem = () => {
    const { addProblem } = useContext(HelpDeskContext);
    const { tag } = useContext(HelpContext);

    const [description, setDescription] = useState('');
    const [tag_id, setTag_Id] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addProblem(description, tag_id);

        // reset
        setDescription('');
        setTag_Id('');
    };

    return ( 
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Problem</h1>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Describe</label>
                    <textarea 
                        id="message" 
                        name="message"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-lg w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700" 
                        placeholder="Your Problem" 
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Choose Tag</label>
                    <select 
                        id="tag"
                        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                <button 
                    type="submit" 
                    className="bg-indigo-500 text-white p-2 rounded-lg font-semibold w-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default AddProblem;
