import express from "express";
import cors from "cors";

import trendingRoutes from "./routes/trending.js";
import skillsRoutes from "./routes/skills.js";
import matcherRoutes from "./routes/matcher.js";
import recommendationsRoutes from "./routes/recommendations.js";

const app = express();
app.use(cors());
app.use(express.json());

// Static charts (saved by generateCharts.js)
app.use("/charts", express.static("public/charts"));

// Routes
app.use("/api/trending", trendingRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/matcher", matcherRoutes);
app.use("/api/recommendations", recommendationsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
