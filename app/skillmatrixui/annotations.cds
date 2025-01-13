using {SkillMatrix} from '../../srv/data-provider';

annotate SkillMatrix.Skills with @(UI: {
    SelectionFields: [
        ID,
        hubID
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: name
        },
        {
            $Type: 'UI.DataField',
            Value: description
        }

    ],
});


annotate SkillMatrix.Personnels with @(UI: {
    SelectionFields: [
        ID
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: fullName
        },
        {
            $Type: 'UI.DataField',
            Value: country
        },
        {
            $Type: 'UI.DataField',
            Value: userRole
        },
        {
            $Type: 'UI.DataField',
            Value: email
        }
    ],
});