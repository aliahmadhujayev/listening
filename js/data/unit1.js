/**
 * Basic IELTS Listening - Unit 1: Names and Places
 * Modulli tuzilma: Har bir mashq o'z audio fayli, topshiriq turi, to'g'ri javoblari va tapescriptiga ega.
 */

window.unit1Data = {
  id: "unit1",
  title: "Unit 1: Names and Places",
  description: "Familiarise yourself with the 26 English alphabetical letters, common abbreviations, personal names, cities, countries, and university subjects.",
  exercises: [
    {
      id: "u1_ex1",
      number: 1,
      part: "Part One: The Letters of the Alphabet",
      title: "Exercise 1: Identifying the letters of the alphabet",
      audio: "audio/01.mp3",
      instruction: "Listen to the recording and complete Section A, Section B and Section C below.",
      sections: [
        {
          type: "reference",
          title: "A. Listen to the recording and repeat these letters after the speaker",
          content: {
            capital: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
            small: "a b c d e f g h i j k l m n o p q r s t u v w x y z"
          }
        },
        {
          type: "fill_grid",
          title: "B. Listen to the recording and write down the letters (18 letters)",
          items: [
            { id: "b1", label: "1.", answer: ["P"] },
            { id: "b2", label: "2.", answer: ["I"] },
            { id: "b3", label: "3.", answer: ["F"] },
            { id: "b4", label: "4.", answer: ["H"] },
            { id: "b5", label: "5.", answer: ["J"] },
            { id: "b6", label: "6.", answer: ["K"] },
            { id: "b7", label: "7.", answer: ["O"] },
            { id: "b8", label: "8.", answer: ["M"] },
            { id: "b9", label: "9.", answer: ["R"] },
            { id: "b10", label: "10.", answer: ["L"] },
            { id: "b11", label: "11.", answer: ["W"] },
            { id: "b12", label: "12.", answer: ["T"] },
            { id: "b13", label: "13.", answer: ["U"] },
            { id: "b14", label: "14.", answer: ["X"] },
            { id: "b15", label: "15.", answer: ["S"] },
            { id: "b16", label: "16.", answer: ["A"] },
            { id: "b17", label: "17.", answer: ["B"] },
            { id: "b18", label: "18.", answer: ["E"] }
          ]
        },
        {
          type: "choice_grid",
          title: "C. Circle the letters you hear (Har bir qatorda eshitilgan harfni tanlang)",
          rows: [
            { id: "c1", label: "Row 1", options: ["B", "P", "E", "D", "G"], answer: "G" },
            { id: "c2", label: "Row 2", options: ["K", "F", "M", "X", "I"], answer: "F" },
            { id: "c3", label: "Row 3", options: ["A", "H", "N", "Z", "V"], answer: "H" },
            { id: "c4", label: "Row 4", options: ["C", "J", "L", "O", "W"], answer: "J" },
            { id: "c5", label: "Row 5", options: ["R", "T", "U", "Y", "S"], answer: "U" }
          ]
        }
      ],
      script: `Exercise 1: The Letters of the Alphabet
A. Listen to the recording and repeat these letters after the speaker:
Capital letters: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.
Small letters: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z.

B. Listen to the recording and write down the letters:
1. P  2. I  3. F  4. H  5. J  6. K  7. O  8. M  9. R  10. L  11. W  12. T  13. U  14. X  15. S  16. A  17. B  18. E.

C. Circle the letters you hear:
1. G (as in Good)
2. F (as in Fine)
3. H (as in Home)
4. J (as in Joy)
5. U (as in Unit)`
    },
    {
      id: "u1_ex2",
      number: 2,
      part: "Part One: The Letters of the Alphabet",
      title: "Exercise 2: Common abbreviations",
      audio: "audio/02.mp3",
      instruction: "Listen to some common abbreviations and write them down in the spaces provided.",
      hint: "Katta harflarda (masalan: BBC) yozing. To'liq ma'nosi tekshirilgandan so'ng ko'rsatiladi.",
      items: [
        { id: "ab1", label: "1.", answer: ["BBC"], meaning: "British Broadcasting Corporation" },
        { id: "ab2", label: "2.", answer: ["SOS"], meaning: "Save Our Souls (Emergency distress signal)" },
        { id: "ab3", label: "3.", answer: ["WHO"], meaning: "World Health Organization" },
        { id: "ab4", label: "4.", answer: ["TUC"], meaning: "Trades Union Congress" },
        { id: "ab5", label: "5.", answer: ["ECM"], meaning: "European Common Market" },
        { id: "ab6", label: "6.", answer: ["SDP"], meaning: "Social Democratic Party" },
        { id: "ab7", label: "7.", answer: ["ECE"], meaning: "Economic Commission for Europe" },
        { id: "ab8", label: "8.", answer: ["EEC"], meaning: "European Economic Community" },
        { id: "ab9", label: "9.", answer: ["IBA"], meaning: "Independent Broadcasting Authority" },
        { id: "ab10", label: "10.", answer: ["LEA"], meaning: "Local Education Authority" }
      ],
      script: `Exercise 2: Common abbreviations
Listen to some common abbreviations and write them down:
1. BBC - B-B-C (British Broadcasting Corporation)
2. SOS - S-O-S (Save Our Souls)
3. WHO - W-H-O (World Health Organization)
4. TUC - T-U-C (Trades Union Congress)
5. ECM - E-C-M (European Common Market)
6. SDP - S-D-P (Social Democratic Party)
7. ECE - E-C-E (Economic Commission for Europe)
8. EEC - E-E-C (European Economic Community)
9. IBA - I-B-A (Independent Broadcasting Authority)
10. LEA - L-E-A (Local Education Authority)`
    },
    {
      id: "u1_ex3",
      number: 3,
      part: "Part One: The Letters of the Alphabet",
      title: "Exercise 3: Names of places in Britain",
      audio: "audio/03.mp3",
      instruction: "Listen to the names of the places and write them down in the spaces provided.",
      hint: "Shahar nomlarini eshitib yozing (masalan: Edinburgh, London)",
      items: [
        { id: "pl1", label: "1.", answer: ["Edinburgh"] },
        { id: "pl2", label: "2.", answer: ["Glasgow"] },
        { id: "pl3", label: "3.", answer: ["Aberdeen"] },
        { id: "pl4", label: "4.", answer: ["Dundee"] },
        { id: "pl5", label: "5.", answer: ["Cardiff"] },
        { id: "pl6", label: "6.", answer: ["Swansea"] },
        { id: "pl7", label: "7.", answer: ["Newport"] },
        { id: "pl8", label: "8.", answer: ["Belfast"] },
        { id: "pl9", label: "9.", answer: ["Manchester"] },
        { id: "pl10", label: "10.", answer: ["Leeds"] },
        { id: "pl11", label: "11.", answer: ["Sheffield"] },
        { id: "pl12", label: "12.", answer: ["Leicester"] },
        { id: "pl13", label: "13.", answer: ["Liverpool"] },
        { id: "pl14", label: "14.", answer: ["Birmingham"] },
        { id: "pl15", label: "15.", answer: ["Nottingham"] },
        { id: "pl16", label: "16.", answer: ["Coventry"] },
        { id: "pl17", label: "17.", answer: ["Bristol"] },
        { id: "pl18", label: "18.", answer: ["Bradford"] },
        { id: "pl19", label: "19.", answer: ["London"] },
        { id: "pl20", label: "20.", answer: ["Brighton"] }
      ],
      script: `Exercise 3: Names of places
Listen to the names of the places in Britain:
1. Edinburgh
2. Glasgow
3. Aberdeen
4. Dundee
5. Cardiff
6. Swansea
7. Newport
8. Belfast
9. Manchester
10. Leeds
11. Sheffield
12. Leicester
13. Liverpool
14. Birmingham
15. Nottingham
16. Coventry
17. Bristol
18. Bradford
19. London
20. Brighton`
    },
    {
      id: "u1_ex4",
      number: 4,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 1: Dialogues & Questions",
      audio: "audio/04.mp3",
      instruction: "Listen to the conversations and answer the questions by filling in the blanks.",
      items: [
        {
          id: "d1",
          question: "1. A: What's Joseph's last name?<br>B: His last name is [blank].",
          answer: ["Miller"],
          displayAnswer: "Miller"
        },
        {
          id: "d2_first",
          question: "2. A: Sorry, what's your name again?<br>B: OK, my first name is [blank]...",
          answer: ["Maria"],
          displayAnswer: "Maria"
        },
        {
          id: "d2_last",
          question: "...and my last name is spelled [blank].",
          answer: ["Tanaka"],
          displayAnswer: "Tanaka"
        },
        {
          id: "d3_first",
          question: "3. A: Excuse me, what's her name?<br>B: [blank]...",
          answer: ["Sarah"],
          displayAnswer: "Sarah"
        },
        {
          id: "d3_last",
          question: "...and her last name is spelled [blank].",
          answer: ["Green"],
          displayAnswer: "Green"
        },
        {
          id: "d4",
          question: "4. A: What is Ms. Smith's first name?<br>B: It's spelled [blank].",
          answer: ["Elena"],
          displayAnswer: "Elena"
        },
        {
          id: "d5_name",
          question: "5. A: Who is the man in the middle?<br>B: He is my friend, [blank].",
          answer: ["Paulo"],
          displayAnswer: "Paulo"
        },
        {
          id: "d5_country",
          question: "A: Where is he from?<br>B: He is from [blank].",
          answer: ["Brazil"],
          displayAnswer: "Brazil"
        }
      ],
      script: `Exercise 1: Getting to Know Each Other
1. 
A: Hi Linda, I'm Joseph Miller. Everyone calls me Joe.
B: Nice to meet you, Joe. And what's your last name again?
A: It's Miller. It is spelled M-I-L-L-E-R.
B: Thanks.

2. 
A: Hello, my name is Maria Tanaka and I'm from the United States.
B: Sorry, what's your name again?
A: OK, my first name is Maria, M-A-R-I-A.
B: Thank you, Maria.
A: And my last name is spelled T-A-N-A-K-A.

3. 
A: Joe, this is my friend Sarah Green from Britain.
B: Excuse me, what is her name?
A: Sarah, S-A-R-A-H. And her last name is Green, G-R-E-E-N.

4. 
A: Excuse me, what is Ms. Smith's first name?
B: Her first name is Elena. E-L-E-N-A.

5. 
A: Who is the man in the middle?
B: He is my friend Paulo, P-A-U-L-O.
A: Is he from Mexico?
B: No, he is from Brazil, B-R-A-Z-I-L.`
    },
    {
      id: "u1_ex5",
      number: 5,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 2: People and Places on the Map of Britain",
      audio: "audio/05.mp3",
      instruction: "Look at the map of Britain. Listen to the recording and fill in each blank with a proper name.",
      image: "images/uk_map.svg",
      imageAlt: "Map of Great Britain and Ireland",
      items: [
        { id: "m1", text: "1. [blank] comes from Edinburgh.", answer: ["Kevin Smith", "Kevin"], displayAnswer: "Kevin Smith" },
        { id: "m2", text: "2. [blank] comes from Newcastle.", answer: ["Sue Jenkins", "Sue"], displayAnswer: "Sue Jenkins" },
        { id: "m3", text: "3. [blank] is from Liverpool.", answer: ["Peter White", "Peter"], displayAnswer: "Peter White" },
        { id: "m4", text: "4. [blank] is from Glasgow.", answer: ["Sally Green", "Sally"], displayAnswer: "Sally Green" },
        { id: "m5", text: "5. [blank] is from Cardiff.", answer: ["Richard Lee", "Richard"], displayAnswer: "Richard Lee" },
        { id: "m6", text: "6. [blank] teaches in London.", answer: ["Mary Snow", "Mary"], displayAnswer: "Mary Snow" },
        { id: "m7", text: "7. [blank] comes from Manchester University.", answer: ["Steve Hansen", "Steve"], displayAnswer: "Steve Hansen" },
        { id: "m8", text: "8. [blank] is from Belfast.", answer: ["James Smith", "James"], displayAnswer: "James Smith" },
        { id: "m9", text: "9. [blank] is from Nottingham University.", answer: ["Linda"], displayAnswer: "Linda" },
        { id: "m10", text: "10. [blank] is from Cambridge University.", answer: ["Chris"], displayAnswer: "Chris" }
      ],
      script: `Exercise 2: Map of Britain
1. My name is Kevin Smith, K-E-V-I-N, and I come from Edinburgh. Edinburgh is a very beautiful city. You are welcome to my city.
2. My name is Sue Jenkins, S-U-E, Sue. I come from Newcastle.
3. I'm Peter White, P-E-T-E-R, Peter, and I'm from Liverpool. Liverpool is one of Britain's major ports and has an important shipbuilding industry.
4. I'm Sally Green, S-A-L-L-Y, Sally, from Glasgow.
5. My name is Richard Lee, R-I-C-H-A-R-D, Richard, and I'm from Cardiff.
6. I'm Mary Snow, M-A-R-Y, Mary, and I teach in London.
7. Hello, my name is Steve Hansen from Manchester University.
8. My name is James Smith, and I am from Belfast.
9. I am Linda from Nottingham University.
10. Hi, I'm Chris from Cambridge University.`
    },
    {
      id: "u1_ex6",
      number: 6,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 3: What is your subject?",
      audio: "audio/06.mp3",
      instruction: "Listen to the self-introductions and complete the table about each person.",
      table: {
        headers: ["Name", "Where from", "Subject"],
        rows: [
          { name: "Charles (Example)", from: "Leeds", subject: "Music", isExample: true },
          {
            name: "Liz",
            from: { id: "t_liz_from", answer: ["Finland"], displayAnswer: "Finland" },
            subject: { id: "t_liz_sub", answer: ["Computer Science", "Computer"], displayAnswer: "Computer science" }
          },
          {
            name: "Chris",
            from: { id: "t_chris_from", answer: ["The United States", "United States", "USA", "US"], displayAnswer: "The United States" },
            subject: { id: "t_chris_sub", answer: ["Engineering"], displayAnswer: "Engineering" }
          },
          {
            name: "Paulo",
            from: { id: "t_paulo_from", answer: ["Japan"], displayAnswer: "Japan" },
            subject: { id: "t_paulo_sub", answer: ["English"], displayAnswer: "English" }
          }
        ]
      },
      script: `Exercise 3: What is your subject?
1. Charles: My name is Charles Chang from Leeds. I'm studying music here.
2. Liz: Elizabeth Sheen from Finland. You can call me Liz. It is spelled L-I-Z, easy to remember. I'm studying computer science.
3. Chris: Hi, I'm Chris, C-H-R-I-S, from the United States. I'm studying engineering.
4. Paulo: My name is Paulo White and I come from Japan, and I'm studying English.`
    },
    {
      id: "u1_ex7",
      number: 7,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 4: Introducing yourself",
      audio: "audio/07.mp3",
      instruction: "Listen to some self-introductions and complete the information cards about each person.",
      cards: [
        {
          person: 1,
          name: "Erica",
          avatar: "images/avatars/person1.svg",
          fields: [
            { id: "p1_name", label: "Name", answer: ["Erica"], displayAnswer: "Erica" },
            { id: "p1_do", label: "What does she do?", answer: ["Freshman", "College student", "Student"], displayAnswer: "Freshman / College student" },
            { id: "p1_from", label: "Where is she from?", answer: ["Leeds"], displayAnswer: "Leeds" },
            { id: "p1_sport", label: "What sport does she like?", answer: ["Swimming", "Sports"], displayAnswer: "Swimming" },
            { id: "p1_often", label: "How often?", answer: ["Once or twice a week", "Twice a week", "1 or 2 times a week"], displayAnswer: "Once or twice a week" }
          ]
        },
        {
          person: 2,
          name: "Martin Cheen",
          avatar: "images/avatars/person2.svg",
          fields: [
            { id: "p2_name", label: "Name", answer: ["Martin Cheen", "Martin", "Marty Chen"], displayAnswer: "Martin Cheen" },
            { id: "p2_do", label: "What does he do?", answer: ["Salesman"], displayAnswer: "Salesman" },
            { id: "p2_from", label: "Where is he from?", answer: ["York"], displayAnswer: "York" },
            { id: "p2_like", label: "What does he like?", answer: ["Music"], displayAnswer: "Music" },
            { id: "p2_work", label: "Where does he work?", answer: ["Department store", "Store", "Big department store"], displayAnswer: "Department store" },
            { id: "p2_week", label: "Where does he go at weekends?", answer: ["Concert", "Concerts"], displayAnswer: "Concerts" }
          ]
        },
        {
          person: 3,
          name: "Tim Russell",
          avatar: "images/avatars/person3.svg",
          fields: [
            { id: "p3_name", label: "Name", answer: ["Tim Russell", "Tim"], displayAnswer: "Tim Russell" },
            { id: "p3_do", label: "What does he do?", answer: ["College student", "Student"], displayAnswer: "College student" },
            { id: "p3_work", label: "How often does he work?", answer: ["At weekends", "Weekends", "Part-time"], displayAnswer: "Part-time at weekends" },
            { id: "p3_go", label: "Where does he plan to go?", answer: ["Europe"], displayAnswer: "Europe" },
            { id: "p3_when", label: "When does he plan to go?", answer: ["This summer", "Summer"], displayAnswer: "This summer" }
          ]
        },
        {
          person: 4,
          name: "Linda",
          avatar: "images/avatars/person4.svg",
          fields: [
            { id: "p4_name", label: "Name", answer: ["Linda"], displayAnswer: "Linda" },
            { id: "p4_do", label: "What does she do?", answer: ["High school student", "Student"], displayAnswer: "High school student" },
            { id: "p4_work", label: "Where does she work?", answer: ["Fast food restaurant", "Restaurant", "Hamburger Heaven"], displayAnswer: "Fast food restaurant (Hamburger Heaven)" },
            { id: "p4_go", label: "Where does she plan to go?", answer: ["University", "Good university", "College"], displayAnswer: "University" },
            { id: "p4_sunday", label: "How long does she work on Sundays?", answer: ["Part-time", "4 hours", "Four hours", "Part time"], displayAnswer: "Part-time (4 hours)" }
          ]
        },
        {
          person: 5,
          name: "Rita",
          avatar: "images/avatars/person5.svg",
          fields: [
            { id: "p5_name", label: "Name", answer: ["Rita"], displayAnswer: "Rita" },
            { id: "p5_do", label: "What does she do?", answer: ["Receptionist", "Receptionist at the BBC"], displayAnswer: "Receptionist" },
            { id: "p5_from", label: "Where is she from?", answer: ["Bristol"], displayAnswer: "Bristol" },
            { id: "p5_like", label: "What does she like to do after work?", answer: ["Go shopping", "Shopping", "Go shopping with friends"], displayAnswer: "Go shopping with friends" }
          ]
        },
        {
          person: 6,
          name: "Chris",
          avatar: "images/avatars/person6.svg",
          fields: [
            { id: "p6_name", label: "Name", answer: ["Chris"], displayAnswer: "Chris" },
            { id: "p6_do", label: "What does he do?", answer: ["Bank manager", "Manager"], displayAnswer: "Bank manager" },
            { id: "p6_from", label: "Where is he from?", answer: ["Leeds"], displayAnswer: "Leeds" },
            { id: "p6_like", label: "What does he like?", answer: ["Rock music", "Music"], displayAnswer: "Rock music" },
            { id: "p6_child", label: "How many children does he have?", answer: ["Two", "2", "Two children"], displayAnswer: "Two" }
          ]
        },
        {
          person: 7,
          name: "Sue",
          avatar: "images/avatars/person7.svg",
          fields: [
            { id: "p7_name", label: "Name", answer: ["Sue"], displayAnswer: "Sue" },
            { id: "p7_do", label: "What does she do?", answer: ["EFL teacher", "Teacher", "English teacher"], displayAnswer: "EFL teacher" },
            { id: "p7_from", label: "Where is she from?", answer: ["Manchester"], displayAnswer: "Manchester" },
            { id: "p7_work", label: "Where does she work?", answer: ["London International School", "International school"], displayAnswer: "London International School" },
            { id: "p7_like", label: "What does she like?", answer: ["Drama", "Theatre"], displayAnswer: "Drama" },
            { id: "p7_fav", label: "What's her favourite one?", answer: ["Hamlet"], displayAnswer: "Hamlet" }
          ]
        },
        {
          person: 8,
          name: "Richard Lee",
          avatar: "images/avatars/person8.svg",
          fields: [
            { id: "p8_name", label: "Name", answer: ["Richard Lee", "Richard"], displayAnswer: "Richard Lee" },
            { id: "p8_from", label: "Where is he from?", answer: ["Birmingham"], displayAnswer: "Birmingham" },
            { id: "p8_do", label: "What does he do?", answer: ["Doctor"], displayAnswer: "Doctor" },
            { id: "p8_work", label: "Where does he work?", answer: ["General Hospital", "Hospital"], displayAnswer: "General Hospital" },
            { id: "p8_like", label: "What does he like?", answer: ["Sports", "Sport"], displayAnswer: "Sports" },
            { id: "p8_sport", label: "What kind of sport does he like?", answer: ["Swimming and football", "Swimming, football", "Football", "Swimming"], displayAnswer: "Swimming, football" },
            { id: "p8_often", label: "How often?", answer: ["Twice a week", "2 times a week"], displayAnswer: "Twice a week" }
          ]
        }
      ],
      script: `Exercise 4: Introducing yourself
1. Hello, I'm Erica from Leeds. I'm a freshman in college. I like sports and I go swimming after school. I go about once or twice a week.
2. My name is Martin Cheen from York. I work as a salesman in a big department store. In my free time, I love music and often go to concerts at weekends.
3. I'm Tim Russell from Edinburgh. I'm a college student. College is very expensive, so I do a part-time job in a restaurant at weekends. I plan to visit Europe this summer.
4. Hi, I'm Linda. I am a high school student. I work part-time at Hamburger Heaven, a fast food restaurant. I work about 4 hours on Sundays to save money for university.
5. Hello, I'm Rita from Bristol. I'm a receptionist at the BBC. My job is to answer the phone and talk to people. After work, I like to go shopping with my friends.
6. My name is Chris from Leeds. I work as a bank manager. I really like rock music, and I have two children.
7. I'm Sue from Manchester. I'm an EFL teacher and I work at London International School. I love drama, and my favourite play is Hamlet.
8. I'm Richard Lee from Birmingham. I am a doctor at General Hospital. I like sports, especially swimming and football, which I do twice a week.`
    },
    {
      id: "u1_ex8",
      number: 8,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 5: Are you from Australia?",
      audio: "audio/08.mp3",
      instruction: "Listen to the conversation carefully. Fill in the table below as you listen.",
      table: {
        headers: ["Name", "Country", "Subject"],
        rows: [
          {
            name: "Rich",
            country: { id: "ex5_rich_c", answer: ["United States", "USA", "The United States", "US"], displayAnswer: "United States" },
            subject: { id: "ex5_rich_s", answer: ["Social Science", "Social Sciences"], displayAnswer: "Social Science" }
          },
          {
            name: "Maria",
            country: { id: "ex5_maria_c", answer: ["New Zealand"], displayAnswer: "New Zealand" },
            subject: { id: "ex5_maria_s", answer: ["Chemistry"], displayAnswer: "Chemistry" }
          }
        ]
      },
      script: `Exercise 5: Are you from Australia?
Rich: Hi, my name is Rich from the United States. Are you from Australia?
Maria: No, I'm from New Zealand.
Rich: And what are you studying?
Maria: I'm studying Chemistry. And what are you studying here?
Rich: I'm studying Social Science.`
    },
    {
      id: "u1_ex9",
      number: 9,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 6: Personal Details of Students",
      audio: "audio/09.mp3",
      instruction: "Listen to the conversations and complete the information about each person.",
      forms: [
        {
          title: "Person 1",
          items: [
            { id: "e6_p1_fn", label: "First Name", value: "Linda", isFixed: true },
            { id: "e6_p1_ln", label: "Last Name", answer: ["Mandel"], displayAnswer: "Mandel" },
            { id: "e6_p1_co", label: "Country", answer: ["Brazil"], displayAnswer: "Brazil" },
            { id: "e6_p1_su", label: "Subject", answer: ["Business"], displayAnswer: "Business" }
          ]
        },
        {
          title: "Person 2",
          items: [
            { id: "e6_p2_fn", label: "First Name", value: "Joseph", isFixed: true },
            { id: "e6_p2_ln", label: "Last Name", answer: ["Block"], displayAnswer: "Block" },
            { id: "e6_p2_co", label: "Country", answer: ["Finland"], displayAnswer: "Finland" },
            { id: "e6_p2_su", label: "Subject", answer: ["Engineering"], displayAnswer: "Engineering" }
          ]
        },
        {
          title: "Person 3",
          items: [
            { id: "e6_p3_fn", label: "First Name", answer: ["Elena", "Shirley"], displayAnswer: "Elena" },
            { id: "e6_p3_ln", label: "Last Name", value: "Maclain", isFixed: true },
            { id: "e6_p3_co", label: "Country", answer: ["Mexico", "Germany"], displayAnswer: "Mexico" },
            { id: "e6_p3_su", label: "Subject", answer: ["English"], displayAnswer: "English" }
          ]
        }
      ],
      script: `Exercise 6: Personal Details
1. 
A: What's your name?
B: My first name is Linda.
A: And your last name?
B: It's Mandel, M-A-N-D-E-L.
A: Where are you from?
B: I'm from Brazil. And I study Business here.

2. 
A: Hello, I'm Joseph.
B: What's your surname, Joseph?
A: Block, B-L-O-C-K.
B: Are you from Britain?
A: No, I'm from Finland. I'm studying Engineering.

3. 
A: Excuse me, what is your name?
B: My name is Elena Maclain, M-A-C-L-A-I-N.
A: Where are you from?
B: I am from Mexico, and I study English.`
    },
    {
      id: "u1_ex10",
      number: 10,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 7: The maps of some countries",
      audio: "audio/10.mp3",
      instruction: "Look at the maps of some countries and fill in the forms below.",
      image: "images/world_countries.svg",
      imageAlt: "Maps of Japan, Australia, Brazil, Mexico, Germany, Italy, France",
      forms: [
        {
          title: "1. Ms. Hee",
          items: [
            { id: "e7_1_fn", label: "First name", answer: ["Su"], displayAnswer: "Su" },
            { id: "e7_1_co", label: "Country", answer: ["Japan"], displayAnswer: "Japan" },
            { id: "e7_1_na", label: "Nationality", answer: ["Japanese"], displayAnswer: "Japanese" }
          ]
        },
        {
          title: "2. Mr. Smith",
          items: [
            { id: "e7_2_fn", label: "First name", answer: ["Charlie"], displayAnswer: "Charlie" },
            { id: "e7_2_co", label: "Country", answer: ["Mexico"], displayAnswer: "Mexico" },
            { id: "e7_2_na", label: "Nationality", answer: ["Mexican"], displayAnswer: "Mexican" }
          ]
        },
        {
          title: "3. Registration Card",
          items: [
            { id: "e7_3_sn", label: "Surname", answer: ["Maclain"], displayAnswer: "Maclain" },
            { id: "e7_3_fn", label: "First name", answer: ["Shirley"], displayAnswer: "Shirley" },
            { id: "e7_3_co", label: "Country", answer: ["Germany"], displayAnswer: "Germany" },
            { id: "e7_3_la", label: "Language", answer: ["German"], displayAnswer: "German" },
            { id: "e7_3_ti", label: "When to use computer", answer: ["Next Monday 9 am", "Next Monday", "Monday 9 am", "9 am"], displayAnswer: "Next Monday, 9 am" }
          ]
        },
        {
          title: "4. Student Form",
          items: [
            { id: "e7_4_ln", label: "Last name", answer: ["Beatty"], displayAnswer: "Beatty" },
            { id: "e7_4_fn", label: "First name", answer: ["Emilio"], displayAnswer: "Emilio" },
            { id: "e7_4_co", label: "Country", answer: ["Italy"], displayAnswer: "Italy" },
            { id: "e7_4_na", label: "Nationality", answer: ["Italian"], displayAnswer: "Italian" }
          ]
        },
        {
          title: "5. Library Form",
          items: [
            { id: "e7_5_ln", label: "Last name", answer: ["White"], displayAnswer: "White" },
            { id: "e7_5_fn", label: "First name", answer: ["Marti"], displayAnswer: "Marti" },
            { id: "e7_5_co", label: "Country", answer: ["France"], displayAnswer: "France" },
            { id: "e7_5_la", label: "Language", answer: ["French"], displayAnswer: "French" }
          ]
        }
      ],
      script: `Exercise 7: The maps of some countries
1. Ms. Hee:
A: Good morning. Are you Ms. Hee?
B: Yes, Su Hee, S-U.
A: Are you from Korea?
B: No, I come from Japan. I am Japanese.

2. Mr. Smith:
A: Hello, Mr. Smith. What is your first name?
B: Charlie, C-H-A-R-L-I-E.
A: Where are you from?
B: I am from Mexico. I'm Mexican.

3. Registration:
Surname: Maclain, M-A-C-L-A-I-N. First name: Shirley, S-H-I-R-L-E-Y.
Country: Germany. Native language: German.
When would you like to book the computer? Next Monday at 9 am.

4. Student Form:
Last name: Beatty, B-E-A-T-T-Y. First name: Emilio, E-M-I-L-I-O.
From: Italy. Nationality: Italian.

5. Library Form:
Last name: White. First name: Marti, M-A-R-T-I.
From: France. Language: French.`
    },
    {
      id: "u1_ex11",
      number: 11,
      part: "Part Two: Getting to Know Each Other",
      title: "Exercise 8: That sounds interesting!",
      audio: "audio/11.mp3",
      instruction: "Listen to the conversation carefully. Fill in the table below as you listen.",
      table: {
        headers: ["Name", "Where from", "Subject"],
        rows: [
          {
            name: "Ann",
            from: { id: "e8_ann_from", answer: ["Canada"], displayAnswer: "Canada" },
            subject: { id: "e8_ann_sub", answer: ["Biology"], displayAnswer: "Biology" }
          },
          {
            name: "Shirley",
            from: { id: "e8_shirley_from", answer: ["Edinburgh", "UK", "Britain", "Scotland"], displayAnswer: "Edinburgh (UK)" },
            subject: { id: "e8_shirley_sub", answer: ["Engineering"], displayAnswer: "Engineering" }
          },
          {
            name: "Linda",
            from: { id: "e8_linda_from", answer: ["Leeds", "UK", "Britain"], displayAnswer: "Leeds (UK)" },
            subject: { id: "e8_linda_sub", answer: ["Arts", "Art"], displayAnswer: "Arts" }
          }
        ]
      },
      script: `Exercise 8: That sounds interesting!
Listen to the conversation between Ann, Shirley, and Linda:
Ann: Hi everyone, I'm Ann from Canada. I'm studying Biology.
Shirley: Nice to meet you! I'm Shirley from Edinburgh in the UK, and my subject is Engineering.
Linda: Hello! I'm Linda from Leeds, also in the UK. I'm studying Arts.
Ann: Wow, engineering and arts, that sounds really interesting!`
    }
  ]
};
