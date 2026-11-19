const db = require("../config/db");

exports.election = (req, res) => {
    const { voter_code, candidate_voted, position, candidate_trade } = req.body;

    // Step 1: Check if the student code exists in the authorized voters table
    const checkVoterSql = "SELECT * FROM voters WHERE student_code = ?";
    
    db.query(checkVoterSql, [voter_code], (voterErr, voterResults) => {
        if (voterErr) {
            return res.status(500).json({ message: "Database verification error" });
        }

        // If the code is not found in the database table
        if (voterResults.length === 0) {
            return res.status(403).json({ message: "Not allowed to vote: Student registration code not found." });
        }

        // Step 2: The student code is valid, process the secure ballot insertion
        const insertVoteSql = "INSERT INTO election(voter_code, candidate_voted, position, candidate_trade) VALUES (?, ?, ?, ?)";
        
        db.query(insertVoteSql, [voter_code, candidate_voted, position, candidate_trade], (insertErr) => {
            if (insertErr) {
                return res.status(500).json({ message: "Failed to securely log ballot submission" });
            }
            return res.status(201).json({ message: "Election ballot processed successfully!" });
        });
    });
};
