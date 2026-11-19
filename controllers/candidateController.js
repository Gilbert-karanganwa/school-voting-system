const db = require("../config/db");
//add candidate

exports.candidate=(req,res)=>{
const {candidate_name,position,trade,profile}
=req.body;
db.query("INSERT INTO candidates(candidate_name,position,trade,profile)values(?,?,?,?)",
[candidate_name,position,trade,profile],
(err)=>{
    if(err)res.status(500).json({message:" failed to addcandidate"});
    else res.status(201).json({message:"candidate added successfull"});
});



}
//delete candidate
exports.deletecandidate = (req, res) => {

    const { candidate_id } = req.params;

    // CHECK IF CANDIDATE EXISTS FIRST
    const checkSql =
    "SELECT * FROM candidates WHERE candidate_id = ?";

    db.query(checkSql, [candidate_id], (checkErr, checkResult) => {

        if(checkErr){

            return res.status(500).json({
                success:false,
                message:"Database checking error",
                error:checkErr.message
            });

        }

        // IF NO CANDIDATE FOUND
        if(checkResult.length === 0){

            return res.status(404).json({
                success:false,
                message:"Candidate not found"
            });

        }

        // DELETE CANDIDATE
        const deleteSql =
        "DELETE FROM candidates WHERE candidate_id = ?";

        db.query(deleteSql, [candidate_id], (deleteErr, deleteResult) => {

            if(deleteErr){

                return res.status(500).json({
                    success:false,
                    message:"Failed to delete candidate",
                    error:deleteErr.message
                });

            }

            return res.status(200).json({

                success:true,
                message:"Candidate deleted successfully",

                deletedCandidate:{
                    candidate_id:candidate_id,
                    candidate_name:checkResult[0].candidate_name,
                    position:checkResult[0].position,
                    trade:checkResult[0].trade
                }

            });

        });

    });

};
// update candidate
exports.updatecandidate = (req, res) => {
    const { candidate_id } = req.params;
    const { candidate_name, position, trade, profile } = req.body;
    const sql = `UPDATE candidates SET candidate_name=?, position=?, trade=?, profile=? WHERE candidate_id=?`;
    
    db.query(sql, [candidate_name, position, trade, profile, candidate_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "candidate updated successfully" });
    });
};

// get all candidates
exports.getcandidates = (req, res) => {
    const sql = `SELECT * FROM candidates`;
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// get candidate by id
exports.getcandidateById = (req, res) => {
    const { candidate_id } = req.params;
    const sql = `SELECT * FROM candidates WHERE candidate_id = ?`;
    
    db.query(sql, [candidate_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); 
        if (results.length === 0) return res.status(404).json({ message: "candidate not found" });
        res.status(200).json(results[0]);
    });
};
