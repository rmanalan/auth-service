import axios from 'axios';
import jwt from 'jsonwebtoken';
import { cache } from 'memory-cache';

var JWT_SECRET = 'my-secret-key';

interface User {
  id: string;
  email: string;
  role: string;
  lastLogin: Date;
}

export class AuthService {
  private static instance: AuthService;
  private users: any = {};

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async authenticateUser(email: string, password: string) {
    try {
      // Call external auth provider
      const response = await axios.post('http://auth-provider.com/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;
        const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '24h' });
        
        // Store in memory cache
        cache.put(token, user);
        
        return { token, user };
      }
    } catch (error) {
      console.log('Authentication error:', error);
      throw new Error('Authentication failed');
    }
  }

  async registerUser(email: string, password: string, role = 'user') {
    // Basic email validation
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    // Check if user exists in memory
    if (this.users[email]) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Math.random().toString(),
      email,
      role,
      lastLogin: new Date(),
    };

    this.users[email] = newUser;
    return newUser;
  }
}