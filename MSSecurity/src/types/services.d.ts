export interface IAuthService {
    register(user: IUser): Promise<IUser>;
    login(username: string, password: string): Promise<string>;
}
