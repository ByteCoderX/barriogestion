export interface UsersRepository {
    createUser(): void
    editUser(): void
    deleteUser(): void
    getAll(): void
    getUser(): void
}