/**
 * Basic IELTS Listening - Unit 2: Numbers
 * Qismlar:
 * Part 1: Cardinals (Ex 1 to Ex 11)
 * Part 2: Ordinals (Ex 1 to Ex 3)
 * Part 3: Decimal Fractions & Percentages (Ex 1 to Ex 5)
 * Part 4: Money (Ex 1 to Ex 5)
 * Part 5: Time (Ex 1 to Ex 4)
 * Part 6: The Telephone (Ex 1 to Ex 5)
 * Part 7: Dates (Ex 1 to Ex 5)
 */

window.unit2Data = {
  id: "unit2",
  title: "Unit 2: Numbers",
  description: "Practise listening to and writing figures, telephone numbers, fractions, percentages, prices, times, and dates accurately in English.",
  exercises: [
    // PART 1: CARDINALS
    {
      id: "u2_ex1",
      number: 1,
      part: "Part One: Cardinals",
      title: "Exercise 1: Reading the numbers",
      audio: "audio/13.mp3",
      instruction: "Listen to the following numbers and repeat them after the speaker.",
      sections: [
        {
          type: "reference",
          title: "Numbers to repeat",
          content: {
            capital: "13, 18, 7, 20, 23, 31, 54, 39",
            small: "71, 14, 40, 58, 60, 67, 85, 97"
          }
        }
      ],
      script: `Exercise 1: Reading the numbers
Listen to the following numbers and repeat them after the speaker:
13, 18, 7, 20, 23, 31, 54, 39,
71, 14, 40, 58, 60, 67, 85, 97.`
    },
    {
      id: "u2_ex2",
      number: 2,
      part: "Part One: Cardinals",
      title: "Exercise 2: Number dictation",
      audio: "audio/14.mp3",
      instruction: "Listen to the following numbers and write them down in figures.",
      hint: "Raqamlarni eshitib yozing (masalan: 14, 17)",
      items: [
        { id: "u2_n1", label: "1.", answer: ["14"] },
        { id: "u2_n2", label: "2.", answer: ["17"] },
        { id: "u2_n3", label: "3.", answer: ["21"] },
        { id: "u2_n4", label: "4.", answer: ["24"] },
        { id: "u2_n5", label: "5.", answer: ["26"] },
        { id: "u2_n6", label: "6.", answer: ["35"] },
        { id: "u2_n7", label: "7.", answer: ["49"] },
        { id: "u2_n8", label: "8.", answer: ["55"] },
        { id: "u2_n9", label: "9.", answer: ["98"] },
        { id: "u2_n10", label: "10.", answer: ["42"] },
        { id: "u2_n11", label: "11.", answer: ["66"] },
        { id: "u2_n12", label: "12.", answer: ["73"] },
        { id: "u2_n13", label: "13.", answer: ["88"] },
        { id: "u2_n14", label: "14.", answer: ["57"] }
      ],
      script: `Exercise 2: Number dictation
1. 14   2. 17   3. 21   4. 24   5. 26   6. 35   7. 49
8. 55   9. 98   10. 42  11. 66  12. 73  13. 88  14. 57`
    },
    {
      id: "u2_ex3",
      number: 3,
      part: "Part One: Cardinals",
      title: "Exercise 3: Ticking the numbers you hear",
      audio: "audio/15.mp3",
      instruction: "You will hear someone reading the numbers. Write down the numbers you hear.",
      items: [
        { id: "u2_t1", label: "1.", answer: ["5", "five"] },
        { id: "u2_t2", label: "2.", answer: ["53"] },
        { id: "u2_t3", label: "3.", answer: ["99"] },
        { id: "u2_t4", label: "4.", answer: ["14"] },
        { id: "u2_t5", label: "5.", answer: ["27"] },
        { id: "u2_t6", label: "6.", answer: ["62"] }
      ],
      script: `Exercise 3: Ticking the numbers you hear
Listen to the numbers: 5, 53, 99, 14, 27, 62.`
    },
    {
      id: "u2_ex4",
      number: 4,
      part: "Part One: Cardinals",
      title: "Exercise 4: Identifying the missing number",
      audio: "audio/16.mp3",
      instruction: "Listen to the numbers. One of the numbers in the box is NOT in the recording. Which number is it?",
      hint: "Qutidagi sonlar: 6, 96, 49, 11, 13, 78, 19, 18, 57, 83, 24, 75, 64, 51, 25, 33, 22, 91",
      items: [
        {
          id: "u2_missing_num",
          question: "Put your answer here (Eshitilmagan sonni yozing): [blank]",
          answer: ["78"],
          displayAnswer: "78"
        }
      ],
      script: `Exercise 4:
The speaker reads out: 6, 96, 49, 11, 13, 19, 18, 57, 83, 24, 75, 64, 51, 25, 33, 22, 91.
The missing number is 78.`
    },
    {
      id: "u2_ex5",
      number: 5,
      part: "Part One: Cardinals",
      title: "Exercise 5: Number practice in sentences",
      audio: "audio/17.mp3",
      instruction: "Listen carefully and write the numbers in figures, not words.",
      items: [
        { id: "np1", text: "1. The sweater costs [blank] pounds.", answer: ["46"], displayAnswer: "46" },
        { id: "np2", text: "2. Tom bought [blank] books yesterday.", answer: ["13"], displayAnswer: "13" },
        { id: "np3", text: "3. Mary is [blank] years old.", answer: ["26"], displayAnswer: "26" },
        { id: "np4", text: "4. Janet was [blank] minutes late.", answer: ["40"], displayAnswer: "40" },
        { id: "np5", text: "5. There are [blank] students in my class.", answer: ["29"], displayAnswer: "29" },
        { id: "np6", text: "6. My grandfather has [blank] grandchildren.", answer: ["18"], displayAnswer: "18" },
        { id: "np7", text: "7. Bill wears size [blank].", answer: ["43"], displayAnswer: "43" },
        { id: "np8", text: "8. The temperature was [blank] °C yesterday.", answer: ["38"], displayAnswer: "38" },
        { id: "np9", text: "9. The train arrived at [blank] o'clock.", answer: ["12"], displayAnswer: "12" },
        { id: "np10", text: "10. I got [blank] on my English test.", answer: ["87"], displayAnswer: "87" }
      ],
      script: `Exercise 5: Number practice
1. The sweater costs 46 pounds.
2. Tom bought 13 books yesterday.
3. Mary is 26 years old.
4. Janet was 40 minutes late.
5. There are 29 students in my class.
6. My grandfather has 18 grandchildren.
7. Bill wears size 43.
8. The temperature was 38 °C yesterday.
9. The train arrived at 12 o'clock.
10. I got 87 on my English test.`
    },
    {
      id: "u2_ex6",
      number: 6,
      part: "Part One: Cardinals",
      title: "Exercise 6: Discriminating between teens and tens",
      audio: "audio/18.mp3",
      instruction: "Listen carefully and circle the correct numbers in each sentence.",
      sections: [
        {
          type: "choice_grid",
          title: "Select the number spoken in each sentence",
          rows: [
            { id: "tnt1", label: "1. (50 - 15) books", options: ["50", "15"], answer: "15" },
            { id: "tnt2", label: "2. (13 - 30) King's Road", options: ["13", "30"], answer: "30" },
            { id: "tnt3", label: "3. (40 - 14) minutes late", options: ["40", "14"], answer: "14" },
            { id: "tnt4", label: "4. (16 - 60) hours", options: ["16", "60"], answer: "16" },
            { id: "tnt5", label: "5. (17 - 70) minutes", options: ["17", "70"], answer: "70" },
            { id: "tnt6", label: "6. (19 - 90) pounds lost", options: ["19", "90"], answer: "19" },
            { id: "tnt7", label: "7. (80 - 18) pounds coat", options: ["80", "18"], answer: "80" },
            { id: "tnt8", label: "8. (5062 - 1562) Green Street", options: ["5062", "1562"], answer: "5062" },
            { id: "tnt9", label: "9. (3040 - 1340) Farm Street", options: ["3040", "1340"], answer: "1340" },
            { id: "tnt10", label: "10. (14 - 40) CDs bought", options: ["14", "40"], answer: "40" }
          ]
        }
      ],
      script: `Exercise 6: Discriminating between teens and tens
1. The student from New York bought 15 new books last week.
2. My uncle George lives at 30 King's Road.
3. Mr. Johnson was 14 minutes late for his lecture.
4. It took 16 hours to finish his work.
5. Mary finished the test in 70 minutes.
6. My friend Alan lost 19 pounds on the first day of class.
7. I paid 80 pounds for that coat.
8. He lives at 5062 Green Street, York.
9. Her address is 1340 Farm Street, Brighton.
10. We bought 40 CDs last month.`
    },
    {
      id: "u2_ex7",
      number: 7,
      part: "Part One: Cardinals",
      title: "Exercise 9: Circulation of British newspapers",
      audio: "21.mp3",
      instruction: "Listen to the recording and write down the circulation figures in the correct rows.",
      table: {
        headers: ["Newspaper Name", "Circulation (Feb - July 1994)"],
        rows: [
          { name: "The Observer", from: { id: "np_c1", answer: ["495483", "495,483"], displayAnswer: "495,483" }, subject: { id: "none1", answer: [""] } },
          { name: "The Independent", from: { id: "np_c2", answer: ["275447", "275,447"], displayAnswer: "275,447" }, subject: { id: "none2", answer: [""] } },
          { name: "The Guardian", from: { id: "np_c3", answer: ["400856", "400,856"], displayAnswer: "400,856" }, subject: { id: "none3", answer: [""] } },
          { name: "Financial Times", from: { id: "np_c4", answer: ["296634", "296,634"], displayAnswer: "296,634" }, subject: { id: "none4", answer: [""] } },
          { name: "Sunday Express", from: { id: "np_c5", answer: ["1544404", "1,544,404"], displayAnswer: "1,544,404" }, subject: { id: "none5", answer: [""] } },
          { name: "Daily Express", from: { id: "np_c6", answer: ["1358246", "1,358,246"], displayAnswer: "1,358,246" }, subject: { id: "none6", answer: [""] } },
          { name: "The Sun", from: { id: "np_c7", answer: ["4101988", "4,101,988"], displayAnswer: "4,101,988" }, subject: { id: "none7", answer: [""] } },
          { name: "Daily Mirror", from: { id: "np_c8", answer: ["2496076", "2,496,076"], displayAnswer: "2,496,076" }, subject: { id: "none8", answer: [""] } }
        ]
      },
      script: `Exercise 9: Circulation of British newspapers (1994)
The Observer: 495,483
The Independent: 275,447
The Guardian: 400,856
Financial Times: 296,634
Sunday Express: 1,544,404
Daily Express: 1,358,246
The Sun: 4,101,988
Daily Mirror: 2,496,076`
    },
    {
      id: "u2_ex8",
      number: 8,
      part: "Part One: Cardinals",
      title: "Exercise 10: Britain's Main Airports Traffic",
      audio: "audio/22.mp3",
      instruction: "Listen to the recording and write down the numbers in the correct columns.",
      table: {
        headers: ["Airport", "Miles", "Km", "Passengers per year"],
        rows: [
          {
            name: "Heathrow",
            from: { id: "ap_h_m", answer: ["20"], displayAnswer: "20" },
            subject: { id: "ap_h_k", answer: ["33"], displayAnswer: "33" },
            country: { id: "ap_h_p", answer: ["28 million", "28"], displayAnswer: "28 million" }
          },
          {
            name: "Gatwick",
            from: { id: "ap_g_m", answer: ["30"], displayAnswer: "30" },
            subject: { id: "ap_g_k", answer: ["50"], displayAnswer: "50" },
            country: { id: "ap_g_p", answer: ["10 million", "10"], displayAnswer: "10 million" }
          }
        ]
      },
      script: `Exercise 10: Airport distances and passenger traffic
Heathrow: 20 miles (33 km) from London, 28 million passengers per year.
Gatwick: 30 miles (50 km) from London, 10 million passengers per year.`
    },

    // PART 2: ORDINALS
    {
      id: "u2_ex9",
      number: 9,
      part: "Part Two: Ordinals",
      title: "Exercise 3: Practice with Ordinal Numbers",
      audio: "audio/27.mp3",
      instruction: "Listen carefully and circle the correct ordinal number in each sentence.",
      sections: [
        {
          type: "choice_grid",
          title: "Select the correct ordinal number heard",
          rows: [
            { id: "ord1", label: "1. Floor", options: ["6th", "5th"], answer: "6th" },
            { id: "ord2", label: "2. Place in tennis", options: ["1st", "4th"], answer: "1st" },
            { id: "ord3", label: "3. Marathon position", options: ["22nd", "27th"], answer: "27th" },
            { id: "ord4", label: "4. Birthday", options: ["25th", "29th"], answer: "25th" },
            { id: "ord5", label: "5. Row seat", options: ["21st", "23rd"], answer: "23rd" },
            { id: "ord6", label: "6. Meeting date", options: ["3rd", "1st"], answer: "3rd" },
            { id: "ord7", label: "7. Street", options: ["15th", "50th"], answer: "15th" },
            { id: "ord8", label: "8. Anniversary", options: ["45th", "55th"], answer: "45th" },
            { id: "ord9", label: "9. State in America", options: ["5th", "50th"], answer: "50th" },
            { id: "ord10", label: "10. Final exam", options: ["25th", "26th"], answer: "26th" }
          ]
        }
      ],
      script: `Exercise 3: Practice with Ordinals
1. My office is on the 6th floor.
2. The team from Shanghai won the 1st place in the tennis match.
3. Jim was the 27th in the last marathon race.
4. Mary's birthday is on the 25th of September.
5. Our seats are in the 23rd row.
6. The meeting will be on the 3rd of April.
7. The theatre is on the 15th Street.
8. People celebrated the 45th anniversary of the school last year.
9. Alaska was the 50th state in America.
10. The final exam is on the 26th of June.`
    },

    // PART 4: MONEY
    {
      id: "u2_ex10",
      number: 10,
      part: "Part Four: Money",
      title: "Exercise 1: How much is this?",
      audio: "audio/34.mp3",
      instruction: "Listen to the recording and write down the price for each item.",
      hint: "Narxlarni raqam va funt belgisi bilan yozing (masalan: 120 yoki £120)",
      items: [
        { id: "pr_cd", label: "1. CD player:", answer: ["120", "£120", "120 pounds"], displayAnswer: "£120" },
        { id: "pr_bike", label: "2. Bicycle:", answer: ["90", "£90", "90 pounds"], displayAnswer: "£90" },
        { id: "pr_tv", label: "3. TV set:", answer: ["269", "£269", "269 pounds"], displayAnswer: "£269" },
        { id: "pr_cam", label: "4. Camera:", answer: ["199", "£199", "199 pounds"], displayAnswer: "£199" },
        { id: "pr_rad", label: "5. Radio:", answer: ["49", "£49", "49 pounds"], displayAnswer: "£49" },
        { id: "pr_bin", label: "6. Binoculars:", answer: ["69", "£69", "69 pounds"], displayAnswer: "£69" }
      ],
      script: `Part Four: Exercise 1: How much is this?
1. The CD player costs £120.
2. The bicycle is £90.
3. The TV set is £269.
4. The camera costs £199.
5. The radio is £49.
6. The binoculars cost £69.`
    },

    // PART 5: TIME
    {
      id: "u2_ex11",
      number: 11,
      part: "Part Five: Time",
      title: "Exercise 2: What time does the next train leave?",
      audio: "audio/40.mp3",
      instruction: "Look at the times below. Tick the appropriate time as you listen to the recording.",
      sections: [
        {
          type: "choice_grid",
          title: "Select the spoken train departure time",
          rows: [
            { id: "tt1", label: "Train 1", options: ["14:14", "14:40"], answer: "14:40" },
            { id: "tt2", label: "Train 2", options: ["12:15", "12:50"], answer: "12:15" },
            { id: "tt3", label: "Train 3", options: ["16:13", "16:30"], answer: "16:13" },
            { id: "tt4", label: "Train 4", options: ["22:13", "22:30"], answer: "22:30" },
            { id: "tt5", label: "Train 5", options: ["18:14", "18:40"], answer: "18:14" }
          ]
        }
      ],
      script: `Part Five: Exercise 2: Train departures
1. The train leaves at 14:40.
2. The next train departs at 12:15.
3. The afternoon train is at 16:13.
4. The late evening train is at 22:30.
5. The train arrives at 18:14.`
    },

    // PART 6: THE TELEPHONE
    {
      id: "u2_ex12",
      number: 12,
      part: "Part Six: The Telephone",
      title: "Exercise 2: Making an appointment",
      audio: "audio/44.mp3",
      instruction: "You will hear three dialogues on the telephone making appointments. Complete the notes below.",
      forms: [
        {
          title: "Dialogue 1: Note for Mr. Watson",
          items: [
            { id: "tel1_name", label: "Visitor Name", answer: ["Richard Priest", "Richard"], displayAnswer: "Richard Priest" },
            { id: "tel1_day", label: "Day", answer: ["Monday", "Next Monday"], displayAnswer: "Monday" },
            { id: "tel1_time", label: "Time", answer: ["10:15", "10.15", "quarter past ten"], displayAnswer: "10:15" },
            { id: "tel1_phone", label: "Telephone number", answer: ["421 7896", "4217896"], displayAnswer: "421 7896" }
          ]
        },
        {
          title: "Dialogue 2: Note for Dr. Jenkinson",
          items: [
            { id: "tel2_name", label: "Visitor Name", answer: ["Rita Harper", "Rita"], displayAnswer: "Rita Harper" },
            { id: "tel2_day", label: "Day", answer: ["Friday", "This Friday"], displayAnswer: "Friday" },
            { id: "tel2_time", label: "Time", answer: ["2:40", "2.40", "twenty to three"], displayAnswer: "2:40" },
            { id: "tel2_phone", label: "Telephone number", answer: ["563 2860", "5632860"], displayAnswer: "563 2860" }
          ]
        },
        {
          title: "Dialogue 3: Note for Professor Hansen",
          items: [
            { id: "tel3_name", label: "Visitor Name", answer: ["David Bell", "David"], displayAnswer: "David Bell" },
            { id: "tel3_day", label: "Day", answer: ["Tuesday", "Next Tuesday"], displayAnswer: "Tuesday" },
            { id: "tel3_time", label: "Time", answer: ["3:30", "3.30", "half past three"], displayAnswer: "3:30" },
            { id: "tel3_phone", label: "Telephone number", answer: ["859 7783", "8597783"], displayAnswer: "859 7783" }
          ]
        }
      ],
      script: `Part Six: Exercise 2: Making an appointment
Dialogue 1:
Note for Mr. Watson: Richard Priest is coming to see you on Monday at 10:15. Telephone: 421 7896.

Dialogue 2:
Note for Dr. Jenkinson: Rita Harper is coming to see you on Friday at 2:40. Telephone: 563 2860.

Dialogue 3:
Note for Professor Hansen: David Bell is coming to see you on Tuesday at 3:30. Telephone: 859 7783.`
    },

    // PART 7: DATES
    {
      id: "u2_ex13",
      number: 13,
      part: "Part Seven: Dates",
      title: "Exercise 3: When does school start?",
      audio: "audio/50.mp3",
      instruction: "Listen to the recording and tick the correct answers.",
      sections: [
        {
          type: "choice_grid",
          title: "Select the correct dates heard",
          rows: [
            { id: "dt1", label: "1. Mother arrives", options: ["Tuesday, 14th May", "Thursday, 14th May", "Thursday, 4th May"], answer: "Thursday, 14th May" },
            { id: "dt2", label: "2. Holiday date", options: ["23rd March", "21st March", "25th March"], answer: "23rd March" },
            { id: "dt3", label: "3. Exams begin", options: ["21st June", "25th June", "26th June"], answer: "21st June" },
            { id: "dt4", label: "4. School starts", options: ["5th July", "15th July", "13th July"], answer: "5th July" }
          ]
        }
      ],
      script: `Part Seven: Exercise 3: Important Dates
1. When does your mother arrive? On Thursday, 14th May.
2. When are you going on holiday? On 23rd March.
3. When do the exams begin? On 21st June.
4. When does school start? On 5th July.`
    },
    {
      id: "u2_ex14",
      number: 14,
      part: "Part Seven: Dates",
      title: "Exercise 4: Great Names in British History",
      audio: "audio/51.mp3",
      instruction: "Listen to the recording and write down the years of birth and death for each historical figure.",
      table: {
        headers: ["Name", "Birth Year", "Death Year"],
        rows: [
          {
            name: "Henry VIII",
            from: { id: "h_b", answer: ["1491"], displayAnswer: "1491" },
            subject: { id: "h_d", answer: ["1547"], displayAnswer: "1547" }
          },
          {
            name: "Queen Elizabeth I",
            from: { id: "e_b", answer: ["1533"], displayAnswer: "1533" },
            subject: { id: "e_d", answer: ["1603"], displayAnswer: "1603" }
          },
          {
            name: "William Shakespeare",
            from: { id: "s_b", answer: ["1564"], displayAnswer: "1564" },
            subject: { id: "s_d", answer: ["1616"], displayAnswer: "1616" }
          },
          {
            name: "Queen Victoria",
            from: { id: "v_b", answer: ["1819"], displayAnswer: "1819" },
            subject: { id: "v_d", answer: ["1901"], displayAnswer: "1901" }
          },
          {
            name: "Sir Winston Churchill",
            from: { id: "c_b", answer: ["1874"], displayAnswer: "1874" },
            subject: { id: "c_d", answer: ["1965"], displayAnswer: "1965" }
          }
        ]
      },
      script: `Part Seven: Exercise 4: Great Names in British History
Henry VIII: Born in 1491, died in 1547.
Queen Elizabeth I: Born in 1533, died in 1603.
William Shakespeare: Born in 1564, died in 1616.
Queen Victoria: Born in 1819, died in 1901.
Sir Winston Churchill: Born in 1874, died in 1965.`
    }
  ]
};
