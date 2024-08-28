using {
    Personnels      as DBPersonnels,
    PersonnelSkills as DBPersonnelSkills,
    Skills          as DBSkills,
    Teams           as DBTeams,
    Hubs            as DBHubs,
    ResultRow       as TypeResultRow,
    SkillPair       as TypeSkillPair
} from '../db/data-models';


service SkillMatrix {
    @cds.redirection.target
    entity Personnels      as projection on DBPersonnels;

    entity PersonnelSkills as projection on DBPersonnelSkills;
    entity Teams           as projection on DBTeams;
    entity Skills          as projection on DBSkills;
    entity Hubs            as projection on DBHubs;
    function getSkillMatrix() returns String;

    entity SkillMatrix     as
        select from DBPersonnels {
            key DBPersonnels.ID,
                DBPersonnels.fullName,
                DBPersonnels.country,
                DBPersonnels.toHub.name                 as hubName,
            key DBPersonnels.toSkills.skill.name        as skillName,
                DBPersonnels.toSkills.skill.toHubs.name as skillsHubName,
                DBPersonnels.toSkills.proficiencyLevel
        }

}
