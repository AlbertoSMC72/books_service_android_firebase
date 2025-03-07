import { Request, Response } from "express";
import { UserService } from "../services/users";

export class UserController {

    static async getUser(req: Request, res: Response) : Promise<void>{
        try {
            const userId = parseInt(req.params.id);
            const user = await UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener usuario" });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, firebaseToken } = req.body;
            const userId = await UserService.createUser(username, email, password, firebaseToken);
            res.status(201).json({ id: userId, message: "Usuario creado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al crear usuario" });
        }
    }

    static async updateUser(req: Request, res: Response) : Promise<void>{
        try {
            const userId = parseInt(req.params.id);
            const { username, email, firebaseToken } = req.body;
            const success = await UserService.updateUser(userId, username, email, firebaseToken);
            if (!success) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return
            }
            res.json({ message: "Usuario actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar usuario" });
        }
    }

    static async deleteUser(req: Request, res: Response) : Promise<void>{
        try {
            const userId = parseInt(req.params.id);
            const success = await UserService.deleteUser(userId);
            if (!success) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return
            }
            res.json({ message: "Usuario eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar usuario" });
        }
    }

    static async login(req: Request, res: Response) : Promise<void>{
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Error al iniciar sesión" });
        }
    }
}
