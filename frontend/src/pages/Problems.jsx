import React, { useState, useCallback, useMemo } from "react";
import { FaThumbsUp, FaThumbsDown, FaUser, FaSearch, FaFilter } from "react-icons/fa";

const Problems = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    categories: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingReply, setEditingReply] = useState(null);

  const categories = [
    "Technical Support",
    "Billing Inquiry",
    "Product Information",
    "General Feedback",
    "Account Issues"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.description || formData.categories.length === 0) {
      alert("Please fill all required fields");
      return;
    }
    const newQuestion = {
      id: Date.now(),
      ...formData,
      date: new Date(),
      replies: [],
      likes: 0,
      dislikes: 0
    };
    setQuestions(prev => [newQuestion, ...prev]);
    setFormData({ username: "", description: "", categories: [] });
    setShowQuestionForm(false);
  };

  const handleReply = (questionId, replyText, categories) => {
    if (!replyText.trim()) return;
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              replies: [
                ...q.replies,
                { 
                  id: Date.now(), 
                  text: replyText,
                  categories: categories, 
                  date: new Date(),
                  likes: 0,
                  dislikes: 0
                }
              ]
            }
          : q
      )
    );
  };

  const handleReplyVote = (questionId, replyId, type) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              replies: q.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, [type]: (reply[type] || 0) + 1 }
                  : reply
              )
            }
          : q
      )
    );
  };

  const handleVote = (questionId, type) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, [type]: q[type] + 1 }
          : q
      )
    );
  };

  const handleUpdateQuestion = (questionId, updatedData) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, ...updatedData }
          : q
      )
    );
    setEditingQuestion(null);
  };

  const handleUpdateReply = (questionId, replyId, updatedText, updatedCategories) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              replies: q.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, text: updatedText, categories: updatedCategories }
                  : reply
              )
            }
          : q
      )
    );
    setEditingReply(null);
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter(q => {
        const matchesSearch = q.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === "all" || q.categories.includes(selectedFilter);
        return matchesSearch && matchesFilter;
      });
  }, [questions, searchQuery, selectedFilter]);

  const QuestionCard = ({ question }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replyCategories, setReplyCategories] = useState([]);

    const handleSubmitReply = () => {
      if (!replyText.trim() || replyCategories.length === 0) {
        alert("Please provide both reply text and categories");
        return;
      }
      handleReply(question.id, replyText, replyCategories);
      setReplyText("");
      setReplyCategories([]);
      setShowReplyForm(false);
    };

    const [editReplyText, setEditReplyText] = useState("");
    const [editReplyCategories, setEditReplyCategories] = useState([]);

    if (editingQuestion?.id === question.id) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <textarea
            value={editingQuestion.description}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, description: e.target.value })}
            className="w-full p-3 border rounded-lg mb-4"
            rows="4"
          />
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    const isSelected = editingQuestion.categories.includes(category);
                    setEditingQuestion({
                      ...editingQuestion,
                      categories: isSelected
                        ? editingQuestion.categories.filter(c => c !== category)
                        : [...editingQuestion.categories, category]
                    });
                  }}
                  className={`px-4 py-2 rounded-full ${editingQuestion.categories.includes(category) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} transition-colors`}                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateQuestion(question.id, { description: editingQuestion.description, categories: editingQuestion.categories })}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingQuestion(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 rounded-full p-2">
            <FaUser className="text-gray-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-lg">{question.username}</h3>
            <p className="text-sm text-gray-500">
              {new Date(question.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{question.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {question.categories.map(cat => (
            <span key={cat} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => handleVote(question.id, "likes")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <FaThumbsUp /> {question.likes}
          </button>
          <button
            onClick={() => handleVote(question.id, "dislikes")}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaThumbsDown /> {question.dislikes}
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Reply
          </button>
        </div>
        {showReplyForm && (
          <div className="mt-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your reply..."
              rows="3"
            />
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      const isSelected = replyCategories.includes(category);
                      setReplyCategories(
                        isSelected
                          ? replyCategories.filter(c => c !== category)
                          : [...replyCategories, category]
                      );
                    }}
                    className={`px-4 py-2 rounded-full ${
                      replyCategories.includes(category)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    } transition-colors`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSubmitReply}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Reply
            </button>
          </div>
        )}
        {question.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {question.replies.map(reply => (
              <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                {editingReply?.id === reply.id ? (
                  <div>
                    <textarea
                      value={editReplyText}
                      onChange={(e) => setEditReplyText(e.target.value)}
                      className="w-full p-3 border text-gray-700 rounded-lg mb-4"
                      rows="3"
                    />
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              const isSelected = editReplyCategories.includes(category);
                              setEditReplyCategories(
                                isSelected
                                  ? editReplyCategories.filter(c => c !== category)
                                  : [...editReplyCategories, category]
                              );
                            }}
                            className={`px-4 py-2 rounded-full ${editReplyCategories.includes(category) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} transition-colors`}                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateReply(question.id, reply.id, editReplyText, editReplyCategories)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReply(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700">{reply.text}</p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {reply.categories && reply.categories.map(cat => (
                        <span key={cat} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => {
                          setEditingReply(reply);
                          setEditReplyText(reply.text);
                          setEditReplyCategories(reply.categories);
                        }}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Desk</h1>
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            What's your question?
          </button>
        </div>

        {showQuestionForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fadeIn">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-3 border text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Problem Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        const isSelected = formData.categories.includes(category);
                        setFormData({
                          ...formData,
                          categories: isSelected
                            ? formData.categories.filter(c => c !== category)
                            : [...formData.categories, category]
                        });
                      }}
                      className={`px-4 py-2 rounded-full ${
                        formData.categories.includes(category)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Question
              </button>
            </form>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problems;