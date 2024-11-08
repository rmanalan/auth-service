import { AuthService } from '../src/services/AuthService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = AuthService.getInstance();
  });

  test('should register a new user', async () => {
    const user = await authService.registerUser('test@example.com', 'password123');
    expect(user.email).toBe('test@example.com');
  });

  test('should authenticate user', async () => {
    const result = await authService.authenticateUser('test@example.com', 'password123');
    expect(result.token).toBeDefined();
  });
});