const LESSON = {
  "n": 5,
  "slug": "l4-write-a-registration-form",
  "skill": "Writing",
  "title": "Write a Hotel Registration Form",
  "goal": "Design, fill and revise a registration form, then conduct a short check-in with it.",
  "pages": [
    {
      "title": "A form a receptionist can use",
      "photo": "desk",
      "prompt": "Name three details a hotel needs to prepare a room.",
      "ar": "اذكر ثلاث معلومات يحتاجها الفندق لتحضير الغرفة."
    },
    {
      "title": "Make the request polite",
      "lines": [
        [
          "I want a room. → I’d like to make a reservation.",
          "polite-model"
        ],
        [
          "Spell your last name. → Could you spell your last name, please?",
          "polite"
        ],
        [
          "Give me your passport. → May I see your passport, please?"
        ]
      ]
    },
    {
      "title": "Match questions with form fields",
      "lines": [
        [
          "What day are you arriving? → Arrival date",
          "arrive"
        ],
        [
          "How long are you staying? → Length of stay"
        ],
        [
          "How many guests is the room for? → Number of guests",
          "guest"
        ]
      ]
    },
    {
      "title": "Choose the correct field",
      "prompt": "“I’m arriving on Friday.” Where does Friday belong?",
      "options": [
        "Length of stay",
        "Arrival date",
        "Number of guests"
      ],
      "key": 1,
      "hint": "Arrival date answers “What day?” Length answers “How long?”",
      "retry": "Now place “three nights” in the right field."
    },
    {
      "title": "Plan your hotel form",
      "prompt": "Choose a hotel name. Make fields for first name, surname, arrival, nights, guest count and email.",
      "ar": "اختر اسم الفندق واكتب ستة حقول واضحة.",
      "help": "Cedar Hotel | First name | Last name | Arrival date | Nights | Guests | Email",
      "again": "Check that a visitor can tell arrival apart from length of stay."
    },
    {
      "title": "Read the guest card",
      "text": "Noor Salem arrives on Friday. She is staying for three nights. The room is for two guests. Use noor@example.com.",
      "prompt": "Find the six facts. Then turn the page and fill the form using the card.",
      "ar": "استخرج البيانات الستّ، ثم انقلها إلى استمارتك.",
      "help": "Noor / Salem / Friday / 3 nights / 2 guests / noor@example.com.",
      "again": "Which field would contain “Monday” if her arrival changed?"
    },
    {
      "title": "Complete the form on paper",
      "text": "Noor Salem · Friday · three nights · two guests · noor@example.com",
      "prompt": "Fill in your six named fields. Hold your writing up to the camera.",
      "ar": "املأ الحقول ثم اعرض الاستمارة على الكاميرا.",
      "help": "First name Noor; surname Salem; arrival Friday; nights 3; guests 2; email noor@example.com.",
      "again": "Circle one entry your teacher double-checks."
    },
    {
      "title": "Find and repair a mix-up",
      "prompt": "A draft puts “three nights” under Arrival and “Friday” under Nights. Rewrite the two entries.",
      "ar": "صحّح موضعي تاريخ الوصول ومدة الإقامة.",
      "help": "Arrival: Friday. Nights: 3.",
      "again": "Now record Monday and two nights for a new guest."
    },
    {
      "title": "Ask before you fill a blank",
      "prompt": "Leave the guest count blank. Ask the visitor a polite question and write the answer.",
      "ar": "اترك خانة عدد الضيوف فارغة. اسأل الضيف بلطف ودوّن الإجابة.",
      "help": "How many guests is the room for? It’s for two guests.",
      "again": "Swap roles. Ask for the last-name spelling, then note the spelling."
    },
    {
      "title": "Check and revise the whole form",
      "prompt": "Check the spelling of the name, the two numbers and the email. If a field is unclear, change its label.",
      "ar": "راجع تهجئة الاسم والعددين والبريد، وعدّل أي عنوان غير واضح.",
      "help": "Check one field at a time: first name → last name → arrival → nights → guests → email.",
      "again": "Show the revised form and explain one improvement."
    },
    {
      "title": "Exit · Register someone new",
      "prompt": "Your teacher is a new guest. Ask for two details from your form, write both answers and read them back.",
      "ar": "اسأل الضيف الجديد عن معلومتين، ودوّن الإجابتين ثم اقرأهما.",
      "help": "What day are you arriving? How many guests is the room for?",
      "again": "Change the day and guest count. Correct your paper and confirm them aloud."
    }
  ],
  "review": {
    "resources": [
      "polite-model",
      "polite",
      "arrive",
      "dates",
      "guests"
    ],
    "listen": [
      {
        "id": "dates",
        "options": [
          "FRI · 3 🌙",
          "MON · 3 🌙",
          "FRI · 2 🌙"
        ],
        "key": 0,
        "hint": "Listen for the day and the number before nights."
      },
      {
        "id": "guests",
        "options": [
          "👤",
          "👥",
          "👥 + 👤"
        ],
        "key": 1,
        "hint": "How many guests does the speaker say?"
      }
    ],
    "oral": [
      [
        "Ask politely for the visitor’s surname spelling.",
        "Could you spell your last name, please?"
      ],
      [
        "Ask for the arrival date and then the room size.",
        "What day are you arriving? How many guests is the room for?"
      ]
    ],
    "read": [
      {
        "prompt": "“May I see your passport, please?” What makes it polite?",
        "options": [
          "It gives an order.",
          "It asks with May I and please."
        ],
        "key": 1,
        "hint": "May I and please signal a polite request."
      },
      {
        "prompt": "A guest arrives Tuesday, stays four nights and books for two people. Which entry is correct?",
        "options": [
          "Arrival: four nights",
          "Guests: four",
          "Length: four nights"
        ],
        "key": 2,
        "hint": "Length means the number of nights."
      }
    ],
    "write": [
      "Make a six-field hotel registration card for a fictional guest. Add a polite question. Recheck arrival, nights and guests.",
      "First name: Omar · Last name: Ali · Arrival: Sunday · Nights: 2 · Guests: 1 · Email: omar@example.com. What day are you arriving?"
    ]
  }
};
const SOUNDS = {"polite-model":"I’d like to make a reservation.","polite":"Could you spell your last name, please?","arrive":"What day are you arriving?","guest":"How many guests is the room for?","dates":"I’m arriving on Friday and staying for three nights.","guests":"The room is for two guests."};