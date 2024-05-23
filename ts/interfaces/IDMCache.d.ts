import type { T } from 'ts';

export default interface IDMCache {
    findStudent(student: string): T.IDM.UserData[];

    findTeacher(teacher: string): T.IDM.UserData[];

    init(): Promise<void>;
}
