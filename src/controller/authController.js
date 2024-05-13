import User from "../models/user.js"
import UserRepository from "../repository/userRepository.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "xntE8GezvgH6bAu5kRKW2wE3YjD8VFwacKqzeyBmC6nGR286mvq5EdXsPYb37faxQGdpBZ24yE7wFfHGLzqCnP3S"
const SALT_ROUNDS = 12;

class AuthController {
    constructor() {
        this.UserRepository = new UserRepository();
    };

    async login(req, res) {
        const { email, password } = req.body;
        const user = await this.UserRepository.findUserByEmail(email);
        
        if (!user) {
            return res.status(404).json({ message: "Usuário ou senha inválida" })
        };
        
        bcrypt.compare(password, user.password).then(() => {
            const token = jwt.sign({id:user.id, name:user.name, email:user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token })
        }).catch((err) => {
            console.log(err)
            return res.status(404).json({ message: "Usuário ou senha inválida" })
        });
    };

    async register(req, res) {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.status(402).json({message: 'Dados inválidos'});
        };

        bcrypt.genSalt(SALT_ROUNDS).then(salt => {
            const user = new User(name, email, password);
            bcrypt.hash(user.password, salt).then(hash => {
                user.password = hash;
                user.staff = 0;
                return this.UserRepository.createUser(user);
            }).then(newUser => {
                res.json(newUser);
            });
        }).catch(err => res.json({ status: 500, err }));
    };

    async recoverPassword(req, res) {
        const { email } = req.body;
        const user = await this.UserRepository.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    };
};

export default AuthController;