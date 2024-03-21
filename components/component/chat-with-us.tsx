"use client";
import React, { ComponentPropsWithoutRef, useState } from 'react';
import styles from './ChatWithUs.module.css'; // Add your CSS module

const questionsAndAnswers = [
    {
      question: "How can I place an order?",
      answers: [
        { text: "Online through our website", answer: "..." }, // Provide the answer here
        { text: "Call our customer support", answer: "..." },
      ],
    },
    {
      question: "What are your shipping options?",
      answers: [ /* ... */ ],
    },
    // Add more questions and answers
  ];

export default function ChatWithUs({...props} : ComponentPropsWithoutRef<"div">) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>();

  const handleQuestionClick = (answerIndex : number) => {
    setSelectedAnswers([...selectedAnswers ?? [], answerIndex]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div {...props}>
      <button onClick={toggleChat}>
        Chat with Us
      </button>

      {isOpen && (
        <div>
          {currentQuestionIndex < questionsAndAnswers.length ? (
            <div>
              <p>{questionsAndAnswers[currentQuestionIndex].question}</p>
              <ul>
                {questionsAndAnswers[currentQuestionIndex].answers.map(
                  (answer, index) => (
                    <li key={index} onClick={() => handleQuestionClick(index)}>
                      {answer.text}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <div>
              {/* Display the final answer based on selectedAnswers */}
              <p>Thanks for your inquiry! Here{"'"}s the consolidated information: ... </p> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}
