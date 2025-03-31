
import { useState, useEffect } from "react";

const surveyQuestions = [
    {
        id: 1,
        type: "radio",
        question: "How satisfied were you with the initial planning and consultation process?",
        options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
      },
    {
        id: 2,
        type: "radio",
        question: "Did you feel your needs and goals were clearly understood?",
        options: ["Yes", "Somewhat", "No"],
      },
    {
        id: 3,
        type: "radio",
        question: "How satisfied are you with the final design and layout of your website?",
        options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied", "Did not apply"],
    },
    {
        id: 4,
        type: "radio",
        question: "Was the content and structure of your website organized in a user-friendly way?",
        options: ["Yes", "Somewhat", "No", "Did not apply"],
      },
    {
        id: 5,
        type: "radio",
        question: "How would you rate the communication throughout the project?",
        options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
      },
    {
        id: 6,
        type: "radio",
        question: "Are all requested features and functions working as expected?",
        options: ["Yes", "Somewhat", "No"],
      },
    {
        id: 7,
        type: "radio",
        question: "Was your website optimized for both desktop and mobile devices?",
        options: ["Yes", "Somewhat", "No", "Did not apply"],
      },
    {
        id: 8,
        type: "radio",
        question: "Did you feel confident managing or updating the site after the handoff?",
        options: ["Yes", "Somewhat", "No", "Did not apply"],
      },
    {
        id: 9,
        type: "radio",
        question: "Was training, documentation, or post-launch support helpful?",
        options: ["Yes", "Somewhat", "No", "Did not apply"],
      },
    {
        id: 10,
        type: "radio",
        question: "How likely are you to recommend R43 Digital Tech to others?",
        options: ["Definitely", "Maybe", "Not Likely"],
      },
    {
        id: 11,
        type: "text",
        question: "Do you feel the project was priced fairly based on the results delivered?",
      }, 
    {
        id: 12,
        type: "text",
        question: "What was the most valuable part of the service you received?",
      },
    {
        id: 13,
        type: "text",
        question: "Do you have any suggestions for how we can improve?",
      },
      
    
  ];
  
  const Survey = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(showPopup){
            const timer = setTimeout(() => setShowPopup(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) return;
        setSubmitting(true);
      
        try {
          const response = await fetch("https://client-survey-api-7u58.onrender.com/survey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: responses }),
          });
      
          if (response.ok) {
            setShowPopup(true);
            setResponses({});
          } else {
            alert("Something went wrong.");
          }
        } catch (err) {
          console.error("Submission error:", err);
          alert("Server error.");
        } finally {
            setSubmitting(false);
        }
      };
      

    return (
        <form 
        onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold mb-4">Client Feedback Survey</h1>
      
        {surveyQuestions.map((q) => (
          <div key={q.id}>
            <label className="block font-medium mb-2">{q.question}</label>
      
            {q.type === "radio" && (
              <div className="space-y-1">
                {q.options?.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          [`question-${q.id}`]: e.target.value,
                        }))
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
      
            {q.type === "text" && (
              <textarea
                name={`question-${q.id}`}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [`question-${q.id}`]: e.target.value,
                  }))
                }
              />
            )}
          </div>
        ))}
      
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-green-500 hover:text-black"
          disabled={submitting}
        >
          {submitting ? "submitting" : "submit"}
        </button>
      
        {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Thank you!</h2>
            <p>Your feedback has been submitted.</p>
            <button
            onClick={() => setShowPopup(false)}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
            >
            Close
            </button>
        </div>
        </div>
    )}
    </form>

    );
}; 
      
  
  export default Survey;
  




