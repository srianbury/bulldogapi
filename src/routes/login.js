import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
    const user = await verifyLogin(req);

    if(user){
        jwt.sign({ user }, 'scrtky', (err, token) => {
            if(!err){
                res.json({ user, token });
            } else {
                res.status(500).json({ err });
            }
        });
    } else {
        res.status(401).json({
            error: 'Username and password do not match.'
        });
    }
});

async function verifyLogin(req){
    const { username: givenUname, password: givenPwd } = req.body;
    const user = await req.context.models.User.findByLogin(givenUname);
    const { username: dbUname, password: dbPwd } = await user;

    return givenPwd===dbPwd ? user : null;
}

export default router;