export interface ICreateUserObj {
    _id: string;
    firstname: string;
    lastname: string;
    skills: IUserSkills[];
}

export interface IUserSkills {
    name: string;
    rank: number;
}
