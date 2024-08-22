entity Teams {
    key ID           : String(10);
        name         : String(100);
        headOfTeam   : Personnels:ID;
        toPersonnels : Association to many Personnels
                           on toPersonnels.toTeam = $self;
        toHeadOfTeam : Association to one Personnels
                           on toHeadOfTeam.ID = $self.headOfTeam;
        toSkills     : Association to many Skills
                           on toSkills.ID = $self.ID;
}

entity Personnels {
    key ID        : UUID;
        firstName : String(50);
        lastName  : String(50);
        email     : String(100);
        userRole  : String(1);
        teamID    : Teams:ID;
        toTeam    : Association to one Teams
                        on toTeam.ID = $self.teamID;
        toSkills  : Association to many PersonnelSkills
                        on toSkills.personnel = $self;
}

entity Skills {
    key ID           : UUID;
        name         : String(100);
        description  : String(500);
        fieldID      : UUID;
        toField      : Association to Fields
                           on toField.ID = $self.fieldID;
        toTeams      : Association to Teams
                           on toTeams.ID = $self.ID;
        toPersonnels : Association to many PersonnelSkills
                           on toPersonnels.skill = $self;
}

entity Fields {
    key ID          : UUID;
        name        : String(100);
        description : String(500);
        toSkills    : Association to many Skills on toSkills.ID = $self.ID;
}


entity PersonnelSkills {
    key personnel        : Association to Personnels;
    key skill            : Association to Skills;
        proficiencyLevel : Integer enum {
            expert         = 5;
            highCompetence = 4;
            experienced    = 3;
            lowCompetence  = 2;
            learning       = 1;
        };
}

type ResultRow {
    EmployeeName: String;
    TeamName: String;
    skillName : array of String;
}