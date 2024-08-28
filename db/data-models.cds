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

entity Hubs {
    key ID   : UUID;
        name : String(100);
}


entity Personnels {
    key ID        : UUID;
        firstName : String(50);
        lastName  : String(50);
        country   : Countries:code;
        fullName  : String = (
            firstName || ' ' || lastName
        ) stored;
        email     : String(100);
        userRole  : String(1);
        teamID    : Teams:ID;
        hubID     : Hubs:ID;
        toTeam    : Association to one Teams
                        on toTeam.ID = $self.teamID;
        toHub     : Association to one Hubs
                        on toHub.ID = $self.hubID;
        toSkills  : Association to many PersonnelSkills
                        on toSkills.personnel = $self;
}

entity Skills {
    key ID           : UUID;
        name         : String(100);
        description  : String(500);
        hubID        : UUID;
        toHubs      : Association to Hubs
                           on toHubs.ID = $self.hubID;
        toTeams      : Association to Teams
                           on toTeams.ID = $self.ID;
        toPersonnels : Association to many PersonnelSkills
                           on toPersonnels.skill = $self;
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
            noCompetence   = 0;
        };
}

type ResultRow {
    EmployeeName : String;
    TeamName     : String;
    SkillPairs   : array of SkillPair;
}

type SkillPair {
    SkillName        : array of String;
    ProficiencyLevel : Integer null;
}

entity Countries {
    key code     : String(2);
        name     : String(80);
        timezone : TIMEZONES:TIMEZONE_NAME;
};

@cds.persistence.exists
entity TIMEZONES {
    key TIMEZONE_NAME : String(64);
};
