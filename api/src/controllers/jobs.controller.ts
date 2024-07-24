import { Request, Response } from "express";
import Job from "../models/Job.model";

export const getJobs = async (req: Request, res: Response) => {
	const jobs = await Job.find();
	res.json(jobs);
};

export const getJob = async (req: Request, res: Response) => {
	const { id } = req.params;

	const job = await Job.findById(id);

	if (!job) {
		return res.status(404).json({ message: "Job not found" });
	}

	res.json({ status: "success", job });
};

export const createJob = async (req: Request, res: Response) => {
	const { title, description, company, location, salary } = req.body;

	const job = new Job({
		title,
		description,
		company,
		location,
		salary,
	});

	const newJob = await job.save();

	res.json({ status: "success", newJob });
};

export const updateJob = (req: Request, res: Response) => {
	res.send("PUT /jobs/:id");
};

export const deleteJob = (req: Request, res: Response) => {
	res.send("DELETE /jobs/:id");
};
