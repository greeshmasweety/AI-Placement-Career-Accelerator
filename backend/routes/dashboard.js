import { Router } from "express";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import InterviewSession from "../models/InterviewSession.js";
import Roadmap from "../models/Roadmap.js";
import Activity from "../models/Activity.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// GET /api/dashboard/stats — the four stat cards + progress chart data
router.get("/stats", protect, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [latestResume, interviews, roadmaps] = await Promise.all([
      ResumeAnalysis.findOne({ user: userId }).sort("-createdAt"),
      InterviewSession.find({ user: userId, status: "completed" }).sort(
        "createdAt"
      ),
      Roadmap.find({ user: userId }),
    ]);

    const interviewsTaken = interviews.length;
    const averageScore = interviewsTaken
      ? Math.round(
          interviews.reduce((s, i) => s + (i.overallScore || 0), 0) /
            interviewsTaken
        )
      : 0;

    // Roadmap progress = done topics / total topics across all roadmaps
    let doneTopics = 0;
    let totalTopics = 0;
    for (const rm of roadmaps) {
      for (const phase of rm.phases) {
        for (const t of phase.topics) {
          totalTopics++;
          if (t.done) doneTopics++;
        }
      }
    }
    const roadmapProgress = totalTopics
      ? Math.round((doneTopics / totalTopics) * 100)
      : 0;

    // Progress-over-time chart: ATS scores + interview scores by date
    const resumeHistory = await ResumeAnalysis.find({ user: userId })
      .sort("createdAt")
      .select("atsScore createdAt");

    const progress = [
      ...resumeHistory.map((r) => ({
        date: r.createdAt,
        ats: r.atsScore,
      })),
      ...interviews.map((i) => ({
        date: i.createdAt,
        interview: i.overallScore,
      })),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      atsScore: latestResume?.atsScore ?? null,
      interviewsTaken,
      averageScore,
      roadmapProgress,
      progress,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/dashboard/activities — recent activity feed
router.get("/activities", protect, async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.user._id })
      .sort("-createdAt")
      .limit(Number(req.query.limit) || 10);
    res.json(activities);
  } catch (err) {
    next(err);
  }
});

export default router;
