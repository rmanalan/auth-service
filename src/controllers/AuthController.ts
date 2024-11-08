import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    try {
      const result = await this.authService.authenticateUser(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  public async register(req: Request, res: Response) {
    const { email, password, role } = req.body;

    try {
      const user = await this.authService.registerUser(email, password, role);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}