// MongoDB Document Blueprint for big data space analytics
const mongoose = require('mongoose');

const SpaceAnalyticsSchema = new mongoose.Schema({
    astronautName: { type: String, required: true },
    flightVector: { type: String, required: true },
    warpBudget: String,
    telemetryTimestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpaceAnalytics', SpaceAnalyticsSchema);
