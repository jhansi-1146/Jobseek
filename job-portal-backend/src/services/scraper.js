import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY; // store in .env

export async function fetchJobs(query = "Software Engineer", location = "India") {
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: { query: `${query} in ${location}`, page: '1', num_pages: '1' },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city,
      salary: job.job_salary ?? "Not Mentioned",
      type: job.job_employment_type,
      skills: job.job_required_skills || [],
      url: job.job_apply_link
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return [];
  }
}
