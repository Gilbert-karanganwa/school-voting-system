const db = require("../config/db");

exports.advertise=(req,res)=>{
   const {candidate_name,position,candidate_trade,student_code}=req.body;
  db.query("INSERT INTO advertised(candidate_name,position,candidate_trade,student_code)values(?,?,?,?)",
    [candidate_name,position,candidate_trade,student_code],
(err)=>{
    if(err)res.status(500).json({message:"insert failed"});
    else res.status(201).json({message:"candidate advertised"});
});



}
exports.getAdvertised = (req, res) => {
    db.query("SELECT * FROM advertised", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};