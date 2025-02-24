// src/components/LearnerHelpCenter.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../App.css"


export default function LearnerHelpCenter() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle card clicks
  const handleCardClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Learner Help Center</h1>
      <div className="row">
        {/* Card 1: Account & Notifications */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/account-notifications")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Account & Notifications</h3>
              <p className="card-text">
                Account settings, login issues, and notification preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Payments & Subscriptions */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/payments-subscriptions")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Payments & Subscriptions</h3>
              <p className="card-text">
                Help with payments, subscription options, and Financial Aid.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Enrollment */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/enrollment")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Enrollment</h3>
              <p className="card-text">
                Find courses to take and learn about enrollment options.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Grades & Assignments */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/grades-assignments")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Grades & Assignments</h3>
              <p className="card-text">
                Grades, peer reviews, assignments, and Labs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5: Certificates & Verification */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/certificates-verification")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Certificates & Verification</h3>
              <p className="card-text">
                How to get and share a Course Certificate.
              </p>
            </div>
          </div>
        </div>

        {/* Card 6: CampX Policies */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/campx-policies")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">CampX Policies</h3>
              <p className="card-text">
                Learn about our policies and program terms.
              </p>
            </div>
          </div>
        </div>

        {/* Card 7: Course Content */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/course-content")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Course Content</h3>
              <p className="card-text">
                Videos, discussion forums, and common course issues.
              </p>
            </div>
          </div>
        </div>

        {/* Card 8: Specializations */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/specializations")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Specializations</h3>
              <p className="card-text">
                Help with Specializations and Capstone Projects.
              </p>
            </div>
          </div>
        </div>

        {/* Card 9: Degrees & Other Programs */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/degrees-programs")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Degrees & Other Programs</h3>
              <p className="card-text">
                Help with degrees, Professional Certificates, and other programs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 10: Video Library */}
        <div className="col-md-4 mb-4" onClick={() => handleCardClick("/video-library")}>
          <div className="card h-100 clickable-card">
            <div className="card-body">
              <h3 className="card-title">Video Library</h3>
              <p className="card-text">
                Watch tutorials on the Coursera learner experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connect with Learners Section */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Connect with Learners Around the World</h2>
        <p className="text-center mb-4">
          Ask questions and help others, discuss subjects you're studying, and meet people around the world.
        </p>
        <div className="text-center mb-5">
          <button
            className="btn btn-primary btn-sm community-button" // Smaller button with custom class
            onClick={() => handleCardClick("/community")}
          >
            Visit the Community
          </button>
        </div>

        {/* Popular Community Conversations */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3 className="text-center mb-4">Popular Community Conversations</h3>
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/community/time-expired" className="text-decoration-none">
                  Time allotted has expired, please submit
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/certification-fee" className="text-decoration-none">
                  Is certification course fee applied on top of Coursera fee?
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/financial-aid" className="text-decoration-none">
                  Financial Aid for Multiple Courses
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/quiz-error" className="text-decoration-none">
                  Error message appeared in quiz
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/music-course" className="text-decoration-none">
                  Can You Recommend a Music Course?
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/career-change" className="text-decoration-none">
                  How difficult is it to change your career?
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/data-science-roadmap" className="text-decoration-none">
                  Roadmap in Data Science for Beginners
                </a>
              </li>
              <li className="list-group-item">
                <a href="/community/data-analyst-qa" className="text-decoration-none">
                  How to Become a Data Analyst: Q&A with IBM Instructors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}