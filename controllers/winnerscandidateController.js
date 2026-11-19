const db = require('../config/db');

// Add a winner
exports.addWinner = (req, res) => {
    const { fullname, position, score, total_voters, profile } = req.body;
    const sql = `INSERT INTO winners (fullname, position, score, total_voters, profile) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [fullname, position, score, total_voters, profile], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Winner added successfully", winnerId: result.insertId });
    });
};

// Get all winners
exports.getWinners = (req, res) => {
    const sql = `SELECT * FROM winners`;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Get single winner by ID
exports.getWinnerById = (req, res) => {
    const { winner_id } = req.params;
    const sql = `SELECT * FROM winners WHERE winner_id = ?`;
    
    db.query(sql, [winner_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Winner not found" });
        res.status(200).json(results[0]);
    });
};

// Update a winner
exports.updateWinner = (req, res) => {
    const { winner_id } = req.params;
    const { fullname, position, score, total_voters, profile } = req.body;
    const sql = `UPDATE winners SET fullname=?, position=?, score=?, total_voters=?, profile=? WHERE winner_id=?`;
    
    db.query(sql, [fullname, position, score, total_voters, profile, winner_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Winner updated successfully" });
    });
};

// Delete a winner
exports.deleteWinner = (req, res) => {
    const { winner_id } = req.params;
    const sql = `DELETE FROM winners WHERE winner_id = ?`;
    
    db.query(sql, [winner_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Winner deleted successfully" });
    });
};
