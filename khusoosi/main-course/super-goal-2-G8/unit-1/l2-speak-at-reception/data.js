const LESSON = {
  "n": 3,
  "slug": "l2-speak-at-reception",
  "skill": "Speaking",
  "title": "Speak at Reception",
  "goal": "Handle a check-in, ask a follow-up question and give a usable direction.",
  "pages": [
    {
      "title": "Take the front desk",
      "photo": "desk",
      "prompt": "Welcome a guest. Find out whether they have a booking.",
      "ar": "رحّب بالضيف واسأله إن كان لديه حجز."
    },
    {
      "title": "reservation",
      "ipa": "/ˌrez.ɚˈveɪ.ʃən/",
      "ar": "حجز",
      "word": "reservation",
      "example": "I have a reservation.",
      "photo": "desk"
    },
    {
      "title": "Make and answer a be question",
      "lines": [
        [
          "You are here for the festival."
        ],
        [
          "Are you here for the festival?",
          "person"
        ],
        [
          "Yes, I am. / No, I’m not."
        ],
        [
          "He is here on business. → Is he here on business? → Yes, he is."
        ]
      ]
    },
    {
      "title": "Choose the question word",
      "lines": [
        [
          "Who → person · What → information"
        ],
        [
          "When → time · Where → place"
        ],
        [
          "Why → reason · How → manner or condition"
        ],
        [
          "Where are you from?",
          "person-2"
        ]
      ]
    },
    {
      "title": "Ask for a missing detail",
      "prompt": "The booking has a surname and room number. Ask for the guest’s city, then ask the reason for the trip.",
      "ar": "اسأل عن المدينة ثم سبب الزيارة.",
      "help": "Where are you from? Why are you here?",
      "again": "Ask for the arrival day rather than the city."
    },
    {
      "title": "Keep the conversation polite",
      "lines": [
        [
          "Welcome: Can I help you? / Nice to meet you."
        ],
        [
          "Hand over a key: Here you are."
        ],
        [
          "Thank: Thank you. → You’re welcome."
        ],
        [
          "Apologize: I’m sorry. → That’s all right."
        ],
        [
          "Close: Have a nice stay. / Goodbye."
        ]
      ]
    },
    {
      "title": "Check in a guest",
      "prompt": "Start the greeting, ask for the last name and spelling, then find out whether the guest is on vacation.",
      "ar": "ابدأ بالتحية، اطلب اسم العائلة وتهجئته، ثم اسأل إن كان الضيف في إجازة.",
      "help": "Good afternoon. What’s your last name? Could you spell it, please? Are you here on vacation?",
      "again": "Swap roles. Use a new name and answer with a purpose other than vacation."
    },
    {
      "title": "Read directions from the lobby plan",
      "lines": [
        [
          "Next to / beside · Across from · Between"
        ],
        [
          "On the left/right · Near / far from"
        ],
        [
          "The café is across from the reception desk.",
          "across"
        ],
        [
          "The bookshop is between the café and the elevators.",
          "between"
        ]
      ]
    },
    {
      "title": "Guide a visitor",
      "map": true,
      "prompt": "Your teacher asks for the bookshop. Give a direction using two landmarks.",
      "ar": "دلّ معلّمك على المكتبة باستعمال معلمين على الخريطة.",
      "help": "It’s between the café and the elevators.",
      "again": "Swap roles. Ask where the café is. Use “across from” in the reply."
    },
    {
      "title": "Repair the question",
      "prompt": "Ask about two guests. “___ they here for the festival?”",
      "options": [
        "Is",
        "Are",
        "Am"
      ],
      "key": 1,
      "hint": "Two guests → they → are. In a question, put are before they.",
      "retry": "Change “They are from Oman” into a question and give a short answer."
    },
    {
      "title": "Introduce the guest",
      "prompt": "Introduce your guest to your teacher, then use a polite closing.",
      "ar": "عرّف بالضيف ثم اختم الحوار بعبارة مهذّبة.",
      "help": "This is Noor Salem. She’s here on vacation. Have a nice stay.",
      "again": "Swap roles and introduce a guest from a different country."
    },
    {
      "title": "Exit · Solve a new check-in",
      "map": true,
      "prompt": "A guest has a reservation and wants the elevators. Find the name, confirm the visit, then give directions.",
      "ar": "تحقّق من اسم الضيف وسبب الزيارة ثم دلّه على المصاعد.",
      "help": "Could you spell your last name? Are you here for the festival? The elevators are near the lounge.",
      "again": "The guest now wants the lounge. Give a fresh direction."
    }
  ],
  "review": {
    "resources": [
      "reservation-ex",
      "person",
      "across",
      "between"
    ],
    "listen": [
      {
        "id": "across",
        "options": [
          "map-across",
          "map-near",
          "map-between"
        ],
        "key": 0,
        "hint": "Across from means on the opposite side."
      },
      {
        "id": "between",
        "options": [
          "map-near",
          "map-between",
          "map-across"
        ],
        "key": 1,
        "hint": "Between places one landmark in the middle."
      }
    ],
    "oral": [
      [
        "Welcome a guest and ask for a surname.",
        "Good afternoon. Could you spell your last name, please?"
      ],
      [
        "Give directions from a reception desk to a café.",
        "The café is across from reception."
      ]
    ],
    "read": [
      {
        "prompt": "Two visitors arrive. Which question fits?",
        "options": [
          "Are they here on vacation?",
          "Is they here on vacation?"
        ],
        "key": 0,
        "hint": "They takes are."
      },
      {
        "prompt": "A guest says “Thank you for your help.” What fits?",
        "options": [
          "I’m sorry.",
          "You’re welcome."
        ],
        "key": 1,
        "hint": "Respond to thanks with “You’re welcome.”"
      }
    ],
    "write": [
      "Write and revise a four-line check-in. Include a be question and a direction.",
      "A: Are you here on vacation? B: Yes, I am. Where are the elevators? A: They’re near the lounge. B: Thank you."
    ]
  }
};
const SOUNDS = {"reservation":"reservation","reservation-ex":"I have a reservation.","person":"Are you here for the festival?","person-2":"Where are you from?","across":"The café is across from the reception desk.","between":"The bookshop is between the café and the elevators."};