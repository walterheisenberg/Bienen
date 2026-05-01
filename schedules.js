// Emojis für den ICS-Kalnder
const emojiMap = {
    Zucht: "🐝👑",
    TuB: "🐝🔀",
    Kö_24Tg_sperren_OS: "🐝🚧",
    Kö_17Tg_sperren_Fangwabe: "🐝🪤"
};

// Zeitpläne
const schedules = {
    Zucht: [
        { offset: 0, task: 'Bildung des Sammelbrutablegers', selectable: true, additionalText: 'Bildung eines Sammelbrutablegers (= weiselloses Pflegevolk)' },
        { offset: 9, task: 'Zellen brechen, umlarven', selectable: true, additionalText: 'Zellen brechen\nungelarvt:\nangenommen:' },
        { offset: 14, task: 'Zellen verschulen, Brutschrank', selectable: false, additionalText: 'Königinnenzellen verschulen (und Futterwaben aufsetzen)' },
        { offset: 19, task: 'Zellen schlupfreif', selectable: false, additionalText: 'Zellen sind schlupfreif und können Begattungsvölkchen zugehängt werden' },
        { offset: 21, task: 'Schlupf der Königinnen', selectable: true, additionalText: 'Königinnen schlüpfen' },
        { offset: 22, task: 'Begattungsvölkchen bilden', selectable: true, additionalText: 'Begattungsvölkchen bilden. Die Begattungsvölkchen werden außerhalb des Flugkreises des Pflegevolkes aufgestellt und mit OS eingesprüht.' },
        { offset: 24, task: 'Anlieferung Belegstelle', selectable: true, additionalText: 'Nach 3 Tagen Dunkelhaft werden die Begattungskästchen auf die Belegstelle gebracht.' },
        { offset: 38, task: 'Begattungskontrolle', selectable: false, additionalText: 'Die Begattung wird kontrolliert. Die Begattungskästchen werden von der Belegstelle geholt.' }
    ],

    TuB: [
        { offset: 0, task: 'TuB Start, FL bilden', selectable: true, additionalText: 'Flugling bilden. Die Königin kommt in den HR auf den alten Boden.' },
        { offset: 2, task: 'FL behandeln, füttern', selectable: true, additionalText: 'Flugling mit OS behandeln, Bei Bedarf ca. 3L Flüssigfutter geben.' },
        { offset: 23, task: 'BR einengen, OS behandeln', selectable: true, additionalText: 'Brutling einengen und mit mit OS behandeln. Bei Bedarf Futterwaben zuhängen.' },
        { offset: 30, task: 'BR auf Eilage kontrollieren', selectable: true, additionalText: 'BR auf Eilage kontrollieren. Bei Bedarf Futterwaben zuhängen. Falls die Königin nicht begattet wurde, den Brutling vor den Flugling abkehren und Waben untersetzen.' }
    ],

    Kö_24Tg_sperren_OS: [
        { offset: 0, task: 'Kö sperren', selectable: true, additionalText: 'Die Königin in einen Käfig sperren' },
        { offset: 9, task: 'Nachschaffung kontrollieren', selectable: true, additionalText: 'Im Volk auf Nachschaffungszellen kontrollieren. Die gesamte Brut ist verdeckelt' },
        { offset: 24, task: 'Kö frei geben', selectable: true, additionalText: 'Die Königin freilassen und mit mit OS behandeln. Bei Bedarf Futterwaben zuhängen.' }
    ],

    Kö_17Tg_sperren_Fangwabe: [
        { offset: 0, task: 'Kö sperren', selectable: true, additionalText: 'Die Königin in einen Käfig sperren' },
        { offset: 9, task: 'Nachschaffung kontrollieren', selectable: true, additionalText: 'Im Volk auf Nachschaffungszellen kontrollieren. Die gesamte Brut ist verdeckelt' },
        { offset: 17, task: 'Kö frei geben, Fangwabe geben', selectable: true, additionalText: 'Die Königin freilassen und eine Fangwabe mit offener Brut einhängen. Bei Bedarf Futterwaben zuhängen.' },
        { offset: 28, task: 'Fangwabe entnehmen', selectable: true, additionalText: 'Die Fangwabe ist verdeckelt. Entnehmen und ggf. einschmelzen.' }
    ]
};
