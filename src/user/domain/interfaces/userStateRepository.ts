import {UserStatePort} from 'user/domain/use-cases/login';

export interface UserStateRepository extends UserStatePort {
    getUser: () => { name: string, lastName: string } | undefined;
    getIsLoading: () => boolean;
}
