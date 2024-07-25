import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Job {
	id: string;
	title: string;
	description: string;
	location: string;
	salary: string;
	company: string;
}

const UpdateJob = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState("");
	const [location, setLocation] = useState("");
	const [company, setCompany] = useState("");

	useEffect(() => {
		console.log("Fetching job with id: ", id);
		const fetchJob = async () => {
			try {
				const response = await fetch(`/api/v1/jobs/${id}`);
				const data = await response.json();

				setTitle(data.job.title);
				setDescription(data.job.description);
				setSalary(data.job.salary);
				setLocation(data.job.location);
				setCompany(data.job.company);
			} catch (error) {
				console.error("Error fetching job:", error);
			}
		};

		fetchJob();
	}, [id]);

	const handleJobUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		const job = { title, description, salary, location, company };

		try {
			const response = await fetch(`/api/v1/jobs/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(job),
			});
			const data = await response.json();
			console.log("Job Updated Successfully " + data);
		} catch (err) {
			console.log("Error while updating job " + err);
		}

		navigate("/jobs");
	};

	return (
		<div className="w-full p-6 bg-gray-100 shadow-md rounded-md">
			<h1 className="text-2xl font-bold mb-4 text-center">Create Job Post</h1>
			<form onSubmit={handleJobUpdate} className="space-y-4">
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

				<div className="flex justify-center">
					<button
						type="submit"
						className="px-3 bg-gradient-to-r from-indigo-500 via-purple-500 to to-pink-500 text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
					>
						Post Job
					</button>
				</div>
			</form>
		</div>
	);
};
export default UpdateJob;
