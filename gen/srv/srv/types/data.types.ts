export interface ITeams {
    ID: string;
    name: string;
    headOfTeam: string;
}

export interface IPersonnels {
    ID: string;
    firstName: string;
    lastName: string;
    email: string;
    userRole: string;
    teamID: string;
}

export interface ISkills {
    ID: string;
    name: string;
    description: string;
    fieldID: string;
}

export interface IFields {
    ID: string;
    name: string;
    description:string;
}


export interface IPersonnelSkills {
    proficiencyLevel: number; 
    personnel_ID: string;
    skill_ID: string;
}

export interface ISkillPair {
    skillName: string[];
    proficiencyLevel: number;
}

export interface IResultRow {
    employeeName: string;
    teamName: string;
    skillPairs: ISkillPair[];
}