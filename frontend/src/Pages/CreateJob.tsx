// src/components/JobPostForm.tsx
import React, { useState } from "react";

const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, salary, company, location });
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="salary" className="text-lg font-medium mb-2">
            Job Salary
          </label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-lg font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="text-lg font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="px-3 bg-gradient-to-r from-indigo-500 via-purple-500 to to-pink-500 text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
