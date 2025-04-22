import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Edit,
  Trash2,
  AlertTriangle,
  Check,
  User,
  Search,
  X,
} from "lucide-react";

// Configure axios base URL
axios.defaults.baseURL = "http://localhost:8000/api";

// Corrected request interceptor to match backend
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.auth = token; // Changed from Authorization to auth
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function InQuiroApp() {
  const [currentPage, setCurrentPage] = useState("questions-list");
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch user data and questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get("/auth/v1/get-user");
        setUser(userResponse.data.user);

        // Fetch questions based on user interests
        const questionsResponse = await axios.get(
          "/questions/v1/get-questions-feed",
          {
            params: {
              personal_interests: userResponse.data.user.personal_interests,
            },
          }
        );

        setQuestions(questionsResponse.data.feed);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Navigation functions
  const goToQuestionsList = () => {
    setCurrentPage("questions-list");
    setCurrentQuestionId(null);
  };

  const goToQuestionDetail = (questionId) => {
    setCurrentPage("question-detail");
    setCurrentQuestionId(questionId);
  };

  // Question handling functions
  const handleAddQuestion = async (questionData) => {
    try {
      const response = await axios.post(
        "/questions/v1/add-question",
        questionData
      );

      if (response.data.status === "success") {
        // Refresh questions list
        const questionsResponse = await axios.get(
          "/questions/v1/get-questions-feed",
          {
            params: {
              personal_interests: user.personal_interests,
            },
          }
        );

        setQuestions(questionsResponse.data.feed);
        setShowAddQuestionModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add question");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete("/questions/v1/delete-question", {
        data: { question_id: questionId },
      });

      // Refresh questions list
      const questionsResponse = await axios.get(
        "/questions/v1/get-questions-feed",
        {
          params: {
            personal_interests: user.personal_interests,
          },
        }
      );

      setQuestions(questionsResponse.data.feed);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar user={user} />

      {error && (
        <div className="bg-red-500 text-white p-4 text-center">
          {error}
          <button onClick={() => setError(null)} className="ml-4">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {loading && currentPage === "questions-list" ? (
        <div className="max-w-5xl mx-auto px-4 py-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : currentPage === "questions-list" ? (
        <QuestionsListPage
          questions={questions}
          onQuestionClick={goToQuestionDetail}
          onAddQuestionClick={() => setShowAddQuestionModal(true)}
          onDeleteQuestion={handleDeleteQuestion}
          currentUser={user}
        />
      ) : (
        <QuestionDetailPage
          questionId={currentQuestionId}
          onBackClick={goToQuestionsList}
          onAddQuestionClick={() => setShowAddQuestionModal(true)}
          onAddAnswer={handleAddQuestion}
          currentUser={user}
        />
      )}

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <AddQuestionModal
          onClose={() => setShowAddQuestionModal(false)}
          onSubmit={handleAddQuestion}
        />
      )}
    </div>
  );
}

// Navbar component with user info
function Navbar({ user }) {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-green-400">InQuiro</h1>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="hover:text-green-400">
            Home
          </a>
          <a href="#" className="hover:text-green-400">
            Group
          </a>
          <a href="#" className="hover:text-green-400">
            Profile
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={user.image_url || "https://via.placeholder.com/40"}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.username}</span>
            </div>
            <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600">
              Login
            </button>
            <button className="px-3 py-1 bg-green-500 rounded-md hover:bg-green-600">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function QuestionsListPage({
  questions,
  onQuestionClick,
  onAddQuestionClick,
  onDeleteQuestion,
  currentUser,
}) {
  const [activeFilter, setActiveFilter] = useState("newest");

  const sortedQuestions = [...questions].sort((a, b) => {
    if (activeFilter === "newest") {
      return (
        new Date(b.question_date_created) - new Date(a.question_date_created)
      );
    } else if (activeFilter === "votes") {
      return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
    } else if (activeFilter === "active") {
      return b.comments - a.comments;
    }
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Questions Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
          onClick={onAddQuestionClick}
        >
          Ask a question
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {["newest", "votes", "active"].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-md ${
                activeFilter === filter
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "newest"
                ? "Newest"
                : filter === "votes"
                ? "Most Votes"
                : "Most Active"}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.map((question) => (
          <div
            key={question._id}
            className="bg-gray-800 border border-gray-700 hover:border-green-500 rounded-lg p-5 transition-all cursor-pointer relative"
            onClick={() => onQuestionClick(question._id)}
          >
            {currentUser?._id === question.question_uploader_id && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="p-1 hover:bg-gray-700 rounded-full text-gray-400 hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="p-1 hover:bg-gray-700 rounded-full text-gray-400 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteQuestion(question._id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex">
              {/* Stats */}
              <div className="flex flex-col items-center mr-6 space-y-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <ThumbsUp className="h-4 w-4 text-gray-400 mr-1" />
                    <ThumbsDown className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-lg font-medium">
                    {question.upvotes - question.downvotes}
                  </span>
                  <span className="text-xs text-gray-400">votes</span>
                </div>

                <div className="flex flex-col items-center px-2 py-1 rounded-md bg-opacity-20">
                  <span className="text-lg font-medium text-green-400">
                    {question.comments || 0}
                  </span>
                  <span className="text-xs text-green-400">answers</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm">{question.shares || 0}</span>
                  <span className="text-xs text-gray-400">views</span>
                </div>
              </div>

              {/* Question content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-400 hover:underline mb-2">
                  {question.question_text.substring(0, 100)}
                  {question.question_text.length > 100 ? "..." : ""}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {question.question_text.substring(0, 200)}
                  {question.question_text.length > 200 ? "..." : ""}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>
                    Asked on{" "}
                    {new Date(
                      question.question_date_created
                    ).toLocaleDateString()}
                  </span>
                  <span>
                    Updated{" "}
                    {new Date(
                      question.question_date_last_updated
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// QuestionDetailPage component
function QuestionDetailPage({
  questionId,
  onBackClick,
  onAddAnswer,
  currentUser,
}) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch question and answers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionRes, answersRes] = await Promise.all([
          axios.get(`/questions/v1/${questionId}`),
          axios.get(`/answers?questionId=${questionId}`),
        ]);

        setQuestion(questionRes.data);
        setAnswers(answersRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId]);

  const handleVote = async (voteType) => {
    try {
      await axios.post(`/questions/v1/${questionId}/vote`, { voteType });
      const response = await axios.get(`/questions/v1/${questionId}`);
      setQuestion(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit vote");
    }
  };

  const handleAnswerSubmit = async (answerData) => {
    try {
      await onAddAnswer({
        questionId,
        answerText: answerData.answerText,
        answerCode: answerData.answerCode,
        answerUploaderId: currentUser._id,
      });

      const response = await axios.get(`/answers?questionId=${questionId}`);
      setAnswers(response.data);
      setShowAnswerForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p>Question not found</p>
        <button
          onClick={onBackClick}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
        >
          Back to Questions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBackClick}
        className="flex items-center text-green-400 hover:text-green-300 mb-6"
      >
        <X className="h-5 w-5 mr-1" />
        Back to Questions
      </button>

      {/* Error message */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
          {error}
          <button onClick={() => setError(null)}>
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Question Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {question.question_text}
        </h2>
        <div className="mt-2 flex items-center text-sm text-gray-400">
          <span>
            Asked on{" "}
            {new Date(question.question_date_created).toLocaleDateString()}
          </span>
          <div className="flex items-center ml-6">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 rounded-md mr-2 last:mr-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex">
          {/* Voting */}
          <div className="flex flex-col items-center mr-6">
            <button
              className="p-2 hover:bg-gray-700 rounded-full"
              onClick={() => handleVote("upvote")}
            >
              <ThumbsUp className="h-5 w-5 text-gray-400 hover:text-green-400" />
            </button>
            <span className="my-2 font-semibold">
              {question.upvotes - question.downvotes}
            </span>
            <button
              className="p-2 hover:bg-gray-700 rounded-full"
              onClick={() => handleVote("downvote")}
            >
              <ThumbsDown className="h-5 w-5 text-gray-400 hover:text-gray-200" />
            </button>
            <button className="mt-4 p-2 hover:bg-gray-700 rounded-full">
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-yellow-400" />
            </button>
          </div>

          {/* Question body */}
          <div className="flex-1">
            <div className="prose prose-invert max-w-none whitespace-pre-line">
              {question.question_text}
            </div>

            {/* Code snippet */}
            {question.question_code_snippet && (
              <div className="mt-4 bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{question.question_code_snippet}</code>
                </pre>
              </div>
            )}

            {/* Images */}
            {question.question_image_urls?.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.question_image_urls.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Question image ${index + 1}`}
                    className="rounded-lg max-h-64 object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{answers.length} Answers</h3>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Sort by:</span>
            <select className="bg-gray-700 text-sm border border-gray-600 rounded-md px-2 py-1">
              <option>Highest votes</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* Answers */}
        {answers.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-500 mb-4" />
            <h4 className="text-lg font-medium mb-2">No answers yet</h4>
            <p className="text-gray-400 mb-4">
              Be the first to answer this question!
            </p>
            <button
              onClick={() => setShowAnswerForm(true)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
            >
              Answer this question
            </button>
          </div>
        ) : (
          answers.map((answer) => (
            <AnswerItem
              key={answer._id}
              answer={answer}
              currentUser={currentUser}
              onVote={handleVote}
            />
          ))
        )}
      </div>

      {/* Answer Form Toggle */}
      {!showAnswerForm ? (
        <button
          onClick={() => setShowAnswerForm(true)}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition flex items-center justify-center"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Write your answer
        </button>
      ) : (
        <EnhancedAnswerForm
          onCancel={() => setShowAnswerForm(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
}

// AnswerItem component
function AnswerItem({ answer, currentUser, onVote }) {
  const [isAccepted, setIsAccepted] = useState(answer.isAccepted);

  const handleAcceptAnswer = async () => {
    try {
      await axios.put(`/answers/${answer._id}/accept`);
      setIsAccepted(true);
    } catch (err) {
      console.error("Failed to accept answer", err);
    }
  };

  return (
    <div
      className={`bg-gray-800 rounded-xl p-6 mb-6 ${
        isAccepted ? "border-l-4 border-green-500" : ""
      }`}
    >
      <div className="flex">
        {/* Voting */}
        <div className="flex flex-col items-center mr-6">
          <button
            className="p-2 hover:bg-gray-700 rounded-full"
            onClick={() => onVote("upvote")}
          >
            <ThumbsUp className="h-5 w-5 text-gray-400 hover:text-green-400" />
          </button>
          <span className="my-2 font-semibold">
            {answer.upvotes - answer.downvotes}
          </span>
          <button
            className="p-2 hover:bg-gray-700 rounded-full"
            onClick={() => onVote("downvote")}
          >
            <ThumbsDown className="h-5 w-5 text-gray-400 hover:text-gray-200" />
          </button>

          {currentUser?._id === answer.answerUploaderId && !isAccepted && (
            <button
              className="mt-4 p-2 hover:bg-gray-700 rounded-full"
              onClick={handleAcceptAnswer}
              title="Accept this answer"
            >
              <Check className="h-5 w-5 text-gray-400 hover:text-green-400" />
            </button>
          )}

          {isAccepted && (
            <div className="mt-4 p-2 text-green-400" title="Accepted answer">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Answer content */}
        <div className="flex-1">
          <div className="prose prose-invert max-w-none whitespace-pre-line">
            {answer.answerText}
          </div>

          {/* Code snippet */}
          {answer.answerCode && (
            <div className="mt-4 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{answer.answerCode}</code>
              </pre>
            </div>
          )}

          {/* Images */}
          {answer.answerImages?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {answer.answerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Answer image ${index + 1}`}
                  className="rounded-lg max-h-64 object-contain"
                />
              ))}
            </div>
          )}

          {/* Answer footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {answer.answerUploaderId?.username || "Anonymous"}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Answered {new Date(answer.updatedOn).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AddQuestionModal component
function AddQuestionModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        question_text: title,
        question_code_snippet: codeSnippet,
        question_image_urls: [],
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });
    } catch (err) {
      setError(err.message || "Failed to submit question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h3 className="text-xl font-semibold">Ask a Question</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full"
            disabled={isSubmitting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100"
                placeholder="What's your question? Be specific."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100"
                placeholder="Add tags separated by commas (e.g., react, laravel, api)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Question Details
              </label>
              <textarea
                className="w-full h-60 bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-100 resize-y"
                placeholder="Include all the information someone would need to answer your question"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Code Snippet (optional)
              </label>
              <textarea
                className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-100 resize-y font-mono text-sm"
                placeholder="Paste your code here if applicable"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end px-6 py-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </>
              ) : (
                "Post Question"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function EnhancedAnswerForm({ onCancel, onSubmit }) {
  const [answer, setAnswer] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!answer) {
      setError("Answer content is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        answerText: answer,
        answerCode: codeSnippet,
      });
    } catch (err) {
      setError(err.message || "Failed to submit answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Your Answer</h3>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-72 bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-100 resize-y"
          placeholder="Write your answer here. Be specific and detailed to help others understand your solution."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        ></textarea>

        <div className="mt-4 mb-4">
          <label className="block text-sm font-medium mb-2">
            Code Snippet (optional)
          </label>
          <textarea
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-100 resize-y font-mono text-sm"
            placeholder="Paste your code here if applicable"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
          ></textarea>
        </div>

        <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg mt-4 mb-4">
          <h4 className="font-medium text-green-400 mb-1">
            Tips for great answers:
          </h4>
          <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
            <li>Provide step-by-step instructions when applicable</li>
            <li>Include code examples to illustrate your solution</li>
            <li>Cite sources and reference documentation if available</li>
            <li>Focus on solving the specific problem in the question</li>
          </ul>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Posting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                Post Answer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
