import { ApplicationService, connect, Service, Request, TypedRequest, utils, run } from '@sap/cds';
import {IFields, IPersonnelSkills, IPersonnels,ISkills,ITeams, IResultRow} from "./types/data.types"
export default class SkillMatrix extends ApplicationService {
    async init(): Promise<void> {
        const { Personnels, PersonnelSkills, Skills, Teams } = this.entities;

        this.on('getSkillMatrix', async (): Promise<IResultRow[]> => {
            // Fetch data from the relevant entities
            const personnels: IPersonnels[] = await SELECT.from(Personnels).columns('ID', 'firstName', 'lastName', 'teamID');
            const personnelSkills: IPersonnelSkills[] = await SELECT.from(PersonnelSkills).columns('personnel_ID', 'skill_ID', 'proficiencyLevel');
            const skills: ISkills[] = await SELECT.from(Skills).columns('ID', 'name');
            const teams: ITeams[] = await SELECT.from(Teams).columns('ID', 'name');
    
            // Pivot logic
            const result: IResultRow[] = [];
    
            personnels.forEach(person => {
                const team = teams.find(t => t.ID === person.teamID);
                const employeeSkills = personnelSkills.filter(ps => ps.personnel_ID === person.ID);
    
                const row: IResultRow = {
                    EmployeeName: `${person.firstName} ${person.lastName}`,
                    TeamName: team ? team.name : 'No Team'
                };
    
                skills.forEach(skill => {
                    const personnelSkill = employeeSkills.find(ps => ps.skill_ID === skill.ID);
                    row[skill.name] = personnelSkill ? personnelSkill.proficiencyLevel : null;
                });
    
                result.push(row);
            });
    
            return result;
        });

        return super.init();
    }
}