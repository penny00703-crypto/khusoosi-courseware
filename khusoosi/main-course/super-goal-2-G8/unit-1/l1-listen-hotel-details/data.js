const LESSON = {
  "n": 2,
  "slug": "l1-listen-hotel-details",
  "skill": "Listening",
  "title": "Listen for Hotel Details",
  "goal": "Record a guest’s country, room and floor, stay length, and reason for visiting.",
  "pages": [
    {
      "title": "Four details, one guest",
      "photo": "desk",
      "prompt": "Which details help the front desk find a booking?",
      "ar": "تعرّف إلى بلد الضيف، رقم الغرفة والطابق، مدة الإقامة، وسبب الزيارة."
    },
    {
      "title": "conference",
      "ipa": "/ˈkɑːn.fɚ.əns/",
      "ar": "مؤتمر",
      "word": "conference",
      "example": "I’m here for a conference.",
      "photo": "desk"
    },
    {
      "title": "Room, floor, or length of stay?",
      "lines": [
        [
          "Room 502 · five oh two"
        ],
        [
          "Fifth floor · 5th floor",
          "floor"
        ],
        [
          "Three nights · a length of stay",
          "nights"
        ],
        [
          "Room number ≠ floor number ≠ number of nights"
        ]
      ]
    },
    {
      "title": "Build a listening grid",
      "prompt": "On paper, draw four fields: Country | Room & floor | Nights | Reason.",
      "ar": "ارسم أربعة حقول. دوّن كلمات أو أرقامًا قصيرة.",
      "help": "Example entry: Jordan | 502 / 5th | 3 | conference",
      "again": "Point to the field for 5th. Then point to the field for conference."
    },
    {
      "title": "Follow the model",
      "sound": "model",
      "prompt": "Listen and read. Point to the field when you hear its information.",
      "ar": "استمع واقرأ. أشر إلى الحقل المناسب عند سماع المعلومة.",
      "help": "Jordan | 502 / 5th | 3 nights | conference. “Staying for” gives the length."
    },
    {
      "title": "Listen for the purpose",
      "sound": "listen-a",
      "prompt": "Follow the voice. Is the guest here for work, a conference, or a holiday?",
      "ar": "حدّد سبب الزيارة أولًا.",
      "help": "Holiday. “On vacation” means the trip is a holiday."
    },
    {
      "title": "Listen again for numbers",
      "sound": "listen-a",
      "prompt": "Record the room, floor and length. Then say them to your teacher.",
      "ar": "دوّن الغرفة والطابق والمدة. ثم قلها لمعلّمك.",
      "help": "Room 204 · second floor · four nights. Look for room, floor and for."
    },
    {
      "title": "Repair a listening note",
      "prompt": "A note says “Room 603 · six nights.” The guest said “sixth floor” and “two nights.” Which note works?",
      "options": [
        "603 · 6th floor · 2 nights",
        "603 · 2nd floor · 6 nights",
        "603 · 6th floor · 6 nights"
      ],
      "key": 0,
      "hint": "“Sixth” is the floor. “Two nights” is the length.",
      "retry": "Say the room, floor and length in separate phrases."
    },
    {
      "title": "Try a new guest",
      "sound": "listen-b",
      "prompt": "Fill all four fields, then show your notes.",
      "ar": "أكمل الحقول الأربعة ثم اعرض ملاحظاتك.",
      "help": "Oman | 603 / 6th | 2 | conference. If two numbers got mixed, read the noun after each number."
    },
    {
      "title": "Hear the shape of a question",
      "lines": [
        [
          "Are you here for the festival? ↗",
          "person"
        ],
        [
          "Where are you from? ↘",
          "person-2"
        ],
        [
          "A yes/no question often rises; a Wh question often falls."
        ]
      ]
    },
    {
      "title": "Report back to reception",
      "prompt": "Tell your teacher two details from the guest record. Then ask for a detail your teacher keeps back.",
      "ar": "اذكر معلومتين ثم اسأل معلّمك عن معلومة أخرى.",
      "help": "The guest is from Oman. He is staying for two nights. Which floor is his room on?",
      "again": "Your teacher changes the room and floor. Repeat the new information."
    },
    {
      "title": "Exit · Record one last arrival",
      "sound": "listen-c",
      "prompt": "Complete a fresh record. Tell your teacher which words gave you the purpose.",
      "ar": "أكمل البطاقة ثم اذكر الكلمات التي حدّدت سبب الزيارة.",
      "help": "Saudi Arabia | 401 / 4th | 5 | business. Evidence: “on business.”"
    }
  ],
  "review": {
    "resources": [
      "model",
      "nights",
      "floor"
    ],
    "listen": [
      {
        "id": "listen-d",
        "options": [
          "🇯🇴 · 306 · 2 🌙",
          "🇴🇲 · 802 · 5 🌙",
          "🇯🇴 · 306 · 5 🌙"
        ],
        "key": 0,
        "hint": "Listen for the country, room number and number before “nights”."
      },
      {
        "id": "listen-e",
        "options": [
          "802 · 2 🌙",
          "802 · 5 🌙",
          "208 · 5 🌙"
        ],
        "key": 1,
        "hint": "Notice “eight oh two” and “five nights”."
      }
    ],
    "oral": [
      [
        "Give a country, room and floor as a guest.",
        "I’m from Jordan. Room 306, on the third floor."
      ],
      [
        "Ask how long a guest is staying. Reply with a length.",
        "How long are you staying? For two nights."
      ]
    ],
    "read": [
      {
        "prompt": "Room 401 is on the fourth floor. Sara is staying for five nights. What belongs in “length of stay”?",
        "options": [
          "Fourth floor",
          "Five nights",
          "401"
        ],
        "key": 1,
        "hint": "Length is how long the guest stays."
      },
      {
        "prompt": "Nora is giving a talk at a conference. Is she on vacation?",
        "options": [
          "Yes, she is.",
          "No, she isn’t."
        ],
        "key": 1,
        "hint": "Her stated reason is the conference."
      }
    ],
    "write": [
      "Write a four-field record for a fictional guest. Read it back and check which numbers refer to the room and the stay.",
      "Oman | 802 / 8th floor | 5 nights | conference"
    ]
  }
};
const SOUNDS = {"conference":"conference","conference-ex":"I’m here for a conference.","floor":"Which floor is your room on? On the fifth floor.","nights":"How long are you staying? For three nights.","model":"I’m from Jordan. I’m in room five oh two, on the fifth floor. I’m staying for three nights. I’m here for a conference.","listen-a":"I’m from Egypt. I’m in room two oh four, on the second floor. I’m staying for four nights. I’m here on vacation.","listen-b":"I’m from Oman. I’m in room six oh three, on the sixth floor. I’m staying for two nights. I’m here for a conference.","person":"Are you here for the festival?","person-2":"Where are you from?","listen-c":"I’m from Saudi Arabia. I’m in room four oh one, on the fourth floor. I’m staying for five nights. I’m here on business.","listen-d":"I’m from Jordan. My room is three oh six, on the third floor. I’m staying for two nights. I’m here on vacation.","listen-e":"I’m from Oman. My room is eight oh two, on the eighth floor. I’m staying for five nights. I’m here for a conference."};