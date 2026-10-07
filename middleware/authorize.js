export function authorizeModification(req, res, next){
    if(req.user.role === "parent" || (req.user.role === "child" && req.params.userId == req.user.id)){
        next(); //parent can change anything, children can change their own details
    }
    else{
        //can't change other users' details if not a parent
        return res.status(403).json({"error": "Access denied"})
    }
}