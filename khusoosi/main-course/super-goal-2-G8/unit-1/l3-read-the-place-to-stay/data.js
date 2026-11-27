const LESSON = {
  "n": 4,
  "slug": "l3-read-the-place-to-stay",
  "skill": "Reading",
  "title": "Read The Place to Stay",
  "goal": "Use written evidence to explain hostel cost and recommend suitable facilities.",
  "pages": [
    {
      "title": "Pick a place to stay",
      "photo": "stay",
      "prompt": "What matters more to this visitor: price, privacy, or a place to meet people?",
      "ar": "ما الأهم للزائر: السعر أو الخصوصية أو التعرّف إلى أشخاص؟"
    },
    {
      "title": "hostel",
      "ipa": "/ˈhɑː.stəl/",
      "ar": "نُزُل",
      "word": "hostel",
      "example": "We’re staying at a hostel.",
      "photo": "stay"
    },
    {
      "title": "shared room",
      "ipa": "/ʃerd ruːm/",
      "ar": "غرفة مشتركة",
      "word": "shared",
      "example": "We’re staying in a shared room.",
      "photo": "stay"
    },
    {
      "title": "Read for the main idea",
      "text": "Young travelers may have a low budget. A regular hotel can cost too much. A youth hostel gives them a cheaper place to stay.",
      "prompt": "Who might choose a hostel? Why?",
      "ar": "اقرأ وحدّد مَن قد يختار النُّزل ولماذا.",
      "help": "Young travelers with a low budget. Evidence: “a cheaper place to stay.”",
      "again": "Say the reason in your own words with because."
    },
    {
      "title": "Find the reason for the price",
      "text": "Rooms in hostels are often cheaper because guests share rooms and bathrooms.",
      "prompt": "Underline the reason, then say what guests usually share.",
      "ar": "حدّد سبب انخفاض السعر ثم اذكر ما يشترك فيه الضيوف.",
      "help": "“Because guests share rooms and bathrooms.” Because introduces the reason.",
      "again": "Explain the price without reading the complete line aloud."
    },
    {
      "title": "Read carefully · Most or some?",
      "text": "Many hostels have amenities such as internet access and laundry facilities. Some also have a kitchen where guests can cook.",
      "prompt": "Can we say all hostels have kitchens? Point to the word that helps you.",
      "ar": "هل كل النُّزل فيها مطبخ؟ أشر إلى الكلمة التي تدلّ على الإجابة.",
      "help": "No. “Some” tells us the claim is limited.",
      "again": "Say one thing the text does tell you about kitchens."
    },
    {
      "title": "Check a claim against the text",
      "prompt": "The article says: “Some hostels have kitchens.” Which claim goes too far?",
      "options": [
        "Certain hostels offer a kitchen.",
        "You can cook at every hostel.",
        "A kitchen is available at some hostels."
      ],
      "key": 1,
      "hint": "Every means all. The text only says some.",
      "retry": "Make a true statement beginning “Some hostels…”"
    },
    {
      "title": "Read for another benefit",
      "text": "Hostel guests can meet travelers from different cities and countries. Many hostels organize tours or activities. In the textbook, the Saudi association’s activities include competitions and community projects.",
      "prompt": "Find one reason a visitor might choose a hostel besides price.",
      "ar": "ابحث عن فائدة أخرى غير السعر.",
      "help": "Meeting people, joining tours or joining an activity. Point to the matching phrase.",
      "again": "Choose a different benefit and point to its evidence."
    },
    {
      "title": "Compare two places",
      "text": "Palm Hostel: shared rooms, a kitchen and walking tours. Hill Hostel: private rooms, laundry and internet access.",
      "prompt": "A visitor needs a kitchen and wants to meet people on a tour. Which hostel fits? Cite two details.",
      "ar": "اختر النُّزل المناسب اعتمادًا على دليلين.",
      "help": "Palm Hostel. Evidence: “a kitchen” and “walking tours.”",
      "again": "A new visitor needs privacy and a laundry room. Which hostel fits now?"
    },
    {
      "title": "Write one evidence line",
      "prompt": "On paper, write your recommendation and give two details that support it.",
      "ar": "اكتب توصية قصيرة مدعومة بدليلين.",
      "help": "I recommend Hill Hostel because it has private rooms and laundry.",
      "again": "Change the visitor’s requirements, then revise which details you use."
    },
    {
      "title": "Exit · Read a new listing",
      "text": "Bay Hostel offers shared rooms and a kitchen. Guests can join a Friday city tour. A laundry service is available at a shop nearby.",
      "prompt": "Can guests cook there? Is laundry inside the hostel? Prove both answers.",
      "ar": "أجب عن السؤالين وحدّد الدليل من النص.",
      "help": "Yes: “a kitchen.” No: “at a shop nearby.”",
      "again": "Explain which detail matters to a traveler who wants to explore the city."
    }
  ],
  "review": {
    "resources": [
      "hostel-ex",
      "shared-ex",
      "kitchen",
      "laundry"
    ],
    "listen": [
      {
        "id": "kitchen",
        "options": [
          "🍳",
          "🧺",
          "📶"
        ],
        "key": 0,
        "hint": "A kitchen is where guests cook."
      },
      {
        "id": "laundry",
        "options": [
          "📶",
          "🍳",
          "🧺"
        ],
        "key": 2,
        "hint": "A laundry room is used to wash clothes."
      }
    ],
    "oral": [
      [
        "Explain why a shared room can cost less.",
        "A shared room can cost less because several guests use it."
      ],
      [
        "Recommend a hostel for someone who wants to cook.",
        "Choose a hostel with a kitchen."
      ]
    ],
    "read": [
      {
        "prompt": "River Hostel offers a laundry room. Some rooms have a private bathroom. Which claim is supported?",
        "options": [
          "All rooms have private bathrooms.",
          "A laundry room is available.",
          "All bathrooms are shared."
        ],
        "key": 1,
        "hint": "It explicitly says “offers a laundry room”."
      },
      {
        "prompt": "City Hostel is near a museum. It organizes a Friday tour. Which detail suits a guest keen on local history?",
        "options": [
          "It is near a museum.",
          "All rooms have kitchens.",
          "There is a pool."
        ],
        "key": 0,
        "hint": "The museum is a named place in the text."
      }
    ],
    "write": [
      "Choose River Hostel or City Hostel for a fictional guest. Write one reason grounded in the information above.",
      "I recommend City Hostel because it is near a museum."
    ]
  }
};
const SOUNDS = {"hostel":"hostel","hostel-ex":"We’re staying at a hostel.","shared":"shared room","shared-ex":"We’re staying in a shared room.","kitchen":"This hostel has a shared kitchen.","laundry":"This hostel has a laundry room."};