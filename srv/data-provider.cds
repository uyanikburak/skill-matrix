using {
    Personnels      as DBPersonnels,
    PersonnelSkills as DBPersonnelSkills,
    Skills          as DBSkills,
    Teams           as DBTeams,
    Fields          as DBFields,
    ResultRow       as TypeResultRow,
    SkillPair       as TypeSkillPair
} from '../db/data-models';


service SkillMatrix {

    entity Personnels      as projection on DBPersonnels;
    entity PersonnelSkills as projection on DBPersonnelSkills;
    entity Teams           as projection on DBTeams;
    entity Skills          as projection on DBSkills;
    entity Fields          as projection on DBFields;
    function getSkillMatrix() returns TypeResultRow;
}
