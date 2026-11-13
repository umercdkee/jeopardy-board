// Question format
// - question: one sentence (or a fill-in ending in ":"), no line breaks or options.
// - code:     optional snippet, shown left-aligned in a monospace block.
// - options:  optional list of exactly four choices, shown as A) to D).
// - answer:   the option letter ("A" to "D") when options are given,
//             otherwise the full answer text.

type BaseQuestion = {
  points: number;
  question: string;
  code?: string;
};

export type QuestionType =
  | (BaseQuestion & { options: [string, string, string, string]; answer: "A" | "B" | "C" | "D" })
  | (BaseQuestion & { options?: undefined; answer: string });

type Data = {
  categories: string[];
  questions: QuestionType[][];
};

const juniors: Data = {
  categories: [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Biology",
    "Environmental Studies",
    "Chemistry",
    "Mystery",
  ],
  questions: [
    // Computer Science
    [
      {
        points: 10,
        question: "Which logic gate gives an output of 1 only when both of its inputs are 1?",
        options: [
          "OR",
          "NOT",
          "XOR",
          "AND",
        ],
        answer: "D",
      },
      {
        points: 20,
        question: "What is the output of this Python code?",
        code: "x = 5\nx += 3\nx *= 2\nprint(x)",
        options: [
          "13",
          "16",
          "18",
          "10",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "What is the result of adding the binary numbers 1011 and 0110?",
        options: [
          "10001",
          "10011",
          "11001",
          "10101",
        ],
        answer: "A",
      },
      {
        points: 40,
        question: "What is the hexadecimal equivalent of the 4-bit binary number 1111?",
        options: [
          "1",
          "4",
          "F",
          "16",
        ],
        answer: "C",
      },
      {
        points: 50,
        question: "Age = 20, HasID = FALSE and IsVip = FALSE are given as inputs. What happens when this pseudocode is run?",
        code: "IF (Age >= 18) OR (HasID = TRUE AND IsVip = TRUE)",
        options: [
          "Error is generated as inputs are out of range",
          "Conditions are not satisfied",
          "Conditions are satisfied",
          "Wrong syntax",
        ],
        answer: "C",
      },
      {
        points: 60,
        question: "How many stars (*) does this pseudocode print?",
        code: "FOR i ← 1 TO 4\n    FOR j ← 1 TO i\n        PRINT \"*\"\n    ENDFOR\nENDFOR",
        options: [
          "4",
          "10",
          "8",
          "16",
        ],
        answer: "B",
      },
    ],
    // Mathematics
    [
      {
        points: 10,
        question: "Evaluate $(-3)^2 - 3^2$.",
        options: [
          "0",
          "18",
          "$-18$",
          "9",
        ],
        answer: "A",
      },
      {
        points: 20,
        question: "A bag contains 3 red balls and 7 blue balls. A ball is drawn at random and not replaced. A second ball is drawn. What is the probability that the second ball is red, given that the first ball drawn was red?",
        options: [
          "$\\dfrac{3}{10}$",
          "$\\dfrac{2}{9}$",
          "$\\dfrac{3}{9}$",
          "$\\dfrac{2}{10}$",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "Solve $\\sqrt{x^2} = 9$.",
        options: [
          "$+9,\\ -9$",
          "$+9$",
          "$-9$",
          "Neither of the above",
        ],
        answer: "A",
      },
      {
        points: 40,
        question: "A 13 m ladder leans against a vertical wall, with its foot 5 m from the base of the wall. How high up the wall does the ladder reach?",
        options: [
          "8 m",
          "12 m",
          "14 m",
          "18 m",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "For what values of $k$ does the equation $2x^2 + kx + 8 = 0$ have equal roots?",
        options: [
          "$k = \\pm 4$",
          "$k = \\pm 8$",
          "$k = 4$",
          "$k = 8$",
        ],
        answer: "B",
      },
      {
        points: 60,
        question: "Find the compound interest on Rs. 10,000 for 2 years at 10% per annum, compounded yearly.",
        options: [
          "Rs. 2,100",
          "Rs. 2,000",
          "Rs. 2,200",
          "Rs. 12,100",
        ],
        answer: "A",
      },
    ],
    // Physics
    [
      {
        points: 10,
        question: "A 12 V battery is connected across a 4 Ω resistor. What current flows through the resistor?",
        options: [
          "3 A",
          "8 A",
          "16 A",
          "48 A",
        ],
        answer: "A",
      },
      {
        points: 20,
        question: "A car travels 10 km East, turns around, and travels 10 km West in 20 minutes. What is the car’s average velocity in km/h?",
        options: [
          "−60 km/h",
          "0 km/h",
          "1 km/h",
          "60 km/h",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "A stone is dropped from rest. What is its speed after 3 seconds of free fall?",
        options: [
          "10 m/s",
          "20 m/s",
          "30 m/s",
          "45 m/s",
        ],
        answer: "C",
      },
      {
        points: 40,
        question: "A 1000 W heater is used to warm 2 kg of water by 10 °C. How long does it take, assuming no heat is lost? (specific heat capacity of water = 4200 J/kg°C)",
        options: [
          "42 s",
          "168 s",
          "84 s",
          "8.4 s",
        ],
        answer: "C",
      },
      {
        points: 50,
        question: "Two resistors of 4 Ω and 6 Ω are connected in parallel across an ideal 12 V battery. Which resistor dissipates more power?",
        options: [
          "4 Ω",
          "6 Ω",
          "Same for both resistors as they are in parallel",
          "Resistors do not dissipate power",
        ],
        answer: "A",
      },
      {
        points: 60,
        question: "An object is placed 15 cm in front of a diverging (concave) lens with a focal length of 10 cm. Is the image real or virtual, and is it inverted or upright?",
        options: [
          "Real, Inverted",
          "Real, Upright",
          "Virtual, Inverted",
          "Virtual, Upright",
        ],
        answer: "D",
      },
    ],
    // Biology
    [
      {
        points: 10,
        question: "Which of the following describes the bonds found in one molecule of water?",
        options: [
          "Hydrogen",
          "Nonpolar covalent",
          "Polar covalent",
          "Ionic",
        ],
        answer: "C",
      },
      {
        points: 20,
        question: "A protein’s tertiary structure is most strongly influenced by:",
        options: [
          "ATP synthetase",
          "Embedding in the plasma membrane",
          "Ionic and hydrogen bonds between R groups",
          "The quaternary structure",
        ],
        answer: "C",
      },
      {
        points: 30,
        question: "Excess secretion from this gland can cause a person to be thin, hyperactive, always hungry and irritable. Which gland is it?",
        options: [
          "Adrenal cortex",
          "Thyroid",
          "Anterior pituitary",
          "Adrenal medulla",
        ],
        answer: "B",
      },
      {
        points: 40,
        question: "Which of the following is NOT a characteristic of transfer RNA (tRNA)?",
        options: [
          "It travels from the nucleus to the cytoplasm in eukaryotes",
          "It is attached to an amino acid at its 5′ end",
          "Its three-dimensional structure is roughly L-shaped",
          "It can be used repeatedly",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "What is water loss through the stomata of a plant called?",
        options: [
          "Condensation",
          "Liquidation",
          "Transpiration",
          "Exchange",
        ],
        answer: "C",
      },
      {
        points: 60,
        question: "In early experiments in the mid-1900s, the source and fate of oxygen involved in photosynthesis was mostly determined through experiments that used:",
        options: [
          "Animals in closed containers that would die unless a plant was introduced into the container",
          "A heavy isotope of oxygen as a tracer",
          "Fluorescent labeling of various enzymes and organic products",
          "Simple accounting of the atomic mass of all the reactants and products",
        ],
        answer: "B",
      },
    ],
    // Environmental Studies
    [
      {
        points: 10,
        question: "What forms when streams enter bodies of standing water, undergo an abrupt loss of velocity, and drop their load of sediment?",
        options: [
          "Alluvial fans",
          "Talus cones",
          "Vasnes",
          "Deltas",
        ],
        answer: "D",
      },
      {
        points: 20,
        question: "Which of the following do geothermal power plants use to generate electricity?",
        options: [
          "Coal",
          "Steam",
          "Sunlight",
          "Pressurized water",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "Named in honor of the English lawyer and amateur meteorologist who explained it, what is the name for the thermal circulation consisting of rising air near the equator and sinking air near 30° latitude?",
        options: [
          "Rossby wave",
          "Ferrel cell",
          "Hadley cell",
          "Christopher cell",
        ],
        answer: "C",
      },
      {
        points: 40,
        question: "What is a major function of a refractory?",
        options: [
          "Conducting heat",
          "Providing heat insulation",
          "Supplying essential reactants for smelting",
          "Supplying flux material for slag formation",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "Chemical weathering of feldspars, such as orthoclase and plagioclase, produces hydrous aluminium silicates. What are these known as?",
        options: [
          "Evaporites",
          "Clay minerals",
          "Precipitates",
          "Carbonates",
        ],
        answer: "B",
      },
      {
        points: 60,
        question: "All of the following are formed by deposition EXCEPT:",
        options: [
          "Sea stack",
          "Beach",
          "Sandbar",
          "Spit",
        ],
        answer: "A",
      },
    ],
    // Chemistry
    [
      {
        points: 10,
        question: "Sulfur forms the following compounds: SO₂, SCl₂ and SO₃²⁻. Which form of hybridization is NOT represented by these molecules?",
        options: [
          "sp",
          "sp²",
          "sp³",
          "None of these",
        ],
        answer: "A",
      },
      {
        points: 20,
        question: "Which of the following is least related to the strength of a covalent bond?",
        options: [
          "Vibrational frequency",
          "Bond order",
          "Bond length",
          "Bond direction",
        ],
        answer: "D",
      },
      {
        points: 30,
        question: "Which of the following scientists hypothesized that particles could have wave-like properties?",
        options: [
          "Planck",
          "Heisenberg",
          "Einstein",
          "de Broglie",
        ],
        answer: "D",
      },
      {
        points: 40,
        question: "An amine is a class of compounds that contains a:",
        options: [
          "Sulfur and hydrogen group",
          "Nitrogen and oxygen group",
          "Nitrogen and hydrogen group",
          "Carbon and sulfur group",
        ],
        answer: "C",
      },
      {
        points: 50,
        question: "Which is the correct name for N₂O₃?",
        options: [
          "Dinitrogen oxide",
          "Dinitrogen dioxide",
          "Dinitrogen trioxide",
          "Dinitrogen tetroxide",
        ],
        answer: "C",
      },
      {
        points: 60,
        question: "Which of the following is the theoretical end of a titration?",
        options: [
          "End point",
          "Indicator point",
          "Equivalence point",
          "Standardization point",
        ],
        answer: "C",
      },
    ],
    // Mystery
    [
      {
        points: 10,
        question: "Known as the “Human Computer” of India, she set a world record by mentally multiplying two 13-digit numbers in just 28 seconds. Name her.",
        options: [
          "Janaki Ammal",
          "Shakuntala Devi",
          "Kalpana Chawla",
          "Asima Chatterjee",
        ],
        answer: "B",
      },
      {
        points: 20,
        question: "Who was the first Indian-origin woman to travel into space aboard the Space Shuttle Columbia in 1997?",
        options: [
          "Sunita Williams",
          "Shawna Pandya",
          "Kalpana Chawla",
          "Sirisha Bandla",
        ],
        answer: "C",
      },
      {
        points: 30,
        question: "Born in Lahore, this Pakistani-American astrophysicist serves as the Dean of Science at MIT and helped detect gravitational waves. Name her.",
        options: [
          "Dr. Nergis Mavalvala",
          "Dr. Tasneem Zehra Husain",
          "Dr. Perween Rahman",
          "Dr. Abha Sur",
        ],
        answer: "A",
      },
      {
        points: 40,
        question: "Which pioneering botanist cross-bred sugarcane varieties in the 1930s to make them sweeter and suit India’s tropical climate?",
        options: [
          "Asima Chatterjee",
          "Anna Mani",
          "Archana Sharma",
          "Janaki Ammal",
        ],
        answer: "D",
      },
      {
        points: 50,
        question: "Who holds the distinction of being the first Pakistani woman to earn a PhD in Theoretical Physics / String Theory?",
        options: [
          "Dr. Nergis Mavalvala",
          "Dr. Tasneem Zehra Husain",
          "Dr. Samina Shah",
          "Dr. Azra Raza",
        ],
        answer: "B",
      },
      {
        points: 60,
        question: "She was the first woman to earn a Doctorate of Science from an Indian university (1944) for developing plant-based drugs to treat malaria. Who was she?",
        options: [
          "Kamala Sohonie",
          "Asima Chatterjee",
          "Rajeshwari Chatterjee",
          "Raman Parimala",
        ],
        answer: "B",
      },
    ],
  ],
};

const seniors: Data = {
  categories: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Biology",
    "Environmental Studies",
    "Mystery",
  ],
  questions: [
    // Mathematics
    [
      {
        points: 10,
        question: "What is the value of $\\cos 60^\\circ$?",
        options: [
          "0",
          "$\\dfrac{1}{2}$",
          "$\\dfrac{\\sqrt{3}}{2}$",
          "1",
        ],
        answer: "B",
      },
      {
        points: 20,
        question: "If $h(x) = x^2 - 3x + 2$, what is the value of $h(3)$?",
        options: [
          "1",
          "2",
          "3",
          "4",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "What is the sum of the interior angles of a hexagon?",
        options: [
          "540°",
          "600°",
          "720°",
          "900°",
        ],
        answer: "C",
      },
      {
        points: 40,
        question: "If $y = x^3 + 2x^2 - 5x + 1$, what is $\\dfrac{d^2y}{dx^2}$?",
        options: [
          "$6x + 4$",
          "$6x + 2$",
          "$6x - 5$",
          "$6x$",
        ],
        answer: "A",
      },
      {
        points: 50,
        question: "A circle has the equation $x^2 + y^2 - 6x + 8y + 9 = 0$. What is its radius?",
        options: [
          "2",
          "3",
          "4",
          "5",
        ],
        answer: "C",
      },
      {
        points: 60,
        question: "Evaluate $\\displaystyle\\lim_{x \\to 0} \\frac{1 - \\cos 4x}{x^2}$.",
        options: [
          "4",
          "8",
          "16",
          "2",
        ],
        answer: "B",
      },
    ],
    // Physics
    [
      {
        points: 10,
        question: "What is the SI unit of electrical resistance?",
        options: [
          "Ampere",
          "Volt",
          "Ohm",
          "Watt",
        ],
        answer: "C",
      },
      {
        points: 20,
        question: "Which color of the visible light spectrum has the highest frequency and shortest wavelength?",
        options: [
          "Red",
          "Green",
          "Yellow",
          "Violet",
        ],
        answer: "D",
      },
      {
        points: 30,
        question: "What is the net work done on an object moving at a constant speed along a circular track for exactly one complete revolution?",
        options: [
          "Maximum positive work",
          "Maximum negative work",
          "Zero work",
          "Equal to the centripetal force multiplied by the circumference",
        ],
        answer: "C",
      },
      {
        points: 40,
        question: "A sound wave travels through water with a frequency of 500 Hz and a wavelength of 3.0 meters. What is the speed of the sound wave in water?",
        options: [
          "1,000 m/s",
          "1,500 m/s",
          "3,000 m/s",
          "4,500 m/s",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "An electron and a proton are accelerated from rest through the exact same potential difference V. How do their de Broglie wavelengths compare?",
        options: [
          "The de Broglie wavelength of the electron is greater because of its smaller mass",
          "The de Broglie wavelength of the proton is greater because of its larger mass",
          "Their de Broglie wavelengths are identical because they experience the same electrostatic force",
          "The de Broglie wavelength of the electron is zero",
        ],
        answer: "A",
      },
      {
        points: 60,
        question: "According to Wien's Displacement Law, if the absolute temperature (T) of a blackbody radiator is doubled, what happens to the wavelength at which the maximum spectral emission occurs ($\\lambda_{\\max}$)?",
        options: [
          "It doubles",
          "It quadruples",
          "It is halved",
          "It remains unchanged",
        ],
        answer: "C",
      },
    ],
    // Chemistry
    [
      {
        points: 10,
        question: "Which of the following is a noble gas?",
        options: [
          "Nitrogen",
          "Chlorine",
          "Neon",
          "Hydrogen",
        ],
        answer: "C",
      },
      {
        points: 20,
        question: "How many moles are present in 36 g of water (H₂O, M = 18 g/mol)?",
        options: [
          "1",
          "2",
          "3",
          "18",
        ],
        answer: "B",
      },
      {
        points: 30,
        question: "For the exothermic reaction $\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}$, which change increases the equilibrium yield of $\\mathrm{NH_3}$?",
        options: [
          "Increasing the temperature",
          "Increasing the pressure",
          "Removing the catalyst",
          "Removing $\\mathrm{N_2}$ from the mixture",
        ],
        answer: "B",
      },
      {
        points: 40,
        question: "An 80 g sample of a radioactive isotope has a half-life of 5 days. How much remains after 15 days?",
        options: [
          "40 g",
          "20 g",
          "10 g",
          "5 g",
        ],
        answer: "C",
      },
      {
        points: 50,
        question: "50 mL of 0.20 M HCl is mixed with 50 mL of 0.10 M NaOH. What is the pH of the resulting solution?",
        options: [
          "1.0",
          "1.3",
          "1.7",
          "2.0",
        ],
        answer: "B",
      },
      {
        points: 60,
        question: "Ionization energy generally increases across a period, yet the first ionization energy of oxygen (1314 kJ/mol) is lower than that of nitrogen (1402 kJ/mol). Which explanation is correct?",
        options: [
          "Oxygen has a larger atomic radius than nitrogen, so its outer electrons are held less tightly",
          "Oxygen has a lower nuclear charge than nitrogen",
          "In oxygen, one 2p orbital holds a paired electron, and the inter-electronic repulsion in that orbital makes the electron easier to remove than from nitrogen’s stable half-filled 2p subshell",
          "Oxygen’s electrons are removed from a 2s orbital, which is higher in energy than 2p",
        ],
        answer: "C",
      },
    ],
    // Computer Science
    [
      {
        points: 10,
        question: "Which service translates a domain name into an IP address?",
        options: [
          "DHCP",
          "DNS",
          "FTP",
          "HTTP",
        ],
        answer: "B",
      },
      {
        points: 20,
        question: "What is the output of an XOR gate when both inputs are 1?",
        options: [
          "0",
          "1",
          "Undefined",
          "Depends on clock",
        ],
        answer: "A",
      },
      {
        points: 30,
        question: "A binary search is performed on the sorted list [3, 7, 11, 15, 19, 23, 27]. What is the minimum number of comparisons required to find the value 23 using the standard binary search algorithm?",
        options: [
          "1",
          "2",
          "3",
          "4",
        ],
        answer: "B",
      },
      {
        points: 40,
        question: "During compilation, which phase converts source code into tokens such as keywords, identifiers and operators?",
        options: [
          "Syntax Analysis",
          "Lexical Analysis",
          "Code Generation",
          "Code Optimisation",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "What is the time complexity of this algorithm in Big-O notation?",
        code: "FOR i ← 1 TO n\n    j ← 1\n    WHILE j < n\n        j ← j * 2\n    ENDWHILE\nENDFOR",
        options: [
          "$O(n)$",
          "$O(n^2)$",
          "$O(n \\log n)$",
          "$O(\\log n)$",
        ],
        answer: "C",
      },
      {
        points: 60,
        question: "What is the output of this pseudocode?",
        code: "FUNCTION mystery(n)\n    IF n = 0 THEN\n        RETURN 1\n    ELSE IF n = 1 THEN\n        RETURN 2\n    ELSE\n        RETURN mystery(n-1) + 2 * mystery(n-2) + n\n    ENDIF\nEND FUNCTION\n\nOUTPUT mystery(4)",
        answer: "29",
      },
    ],
    // Biology
    [
      {
        points: 10,
        question: "Which of these molecules is the main product of photosynthesis, used by plants in respiration?",
        options: [
          "Glucose",
          "ATP",
          "Starch",
          "Cellulose",
        ],
        answer: "A",
      },
      {
        points: 20,
        question: "Why is the wall of the left ventricle thicker than that of the right ventricle?",
        options: [
          "It holds more blood than the right ventricle",
          "It contains valves that need extra muscle",
          "It pumps deoxygenated blood to the lungs",
          "It pumps blood at higher pressure around the whole body",
        ],
        answer: "D",
      },
      {
        points: 30,
        question: "What is the main force that moves water up the xylem in a tall tree?",
        options: [
          "Root pressure only",
          "Cohesion and tension created by transpiration",
          "Active transport by xylem vessels",
          "Osmosis through the xylem walls",
        ],
        answer: "B",
      },
      {
        points: 40,
        question: "A drawing of a cell measures 45 mm across. The actual cell is 15 µm across. What is the magnification?",
        options: [
          "×300",
          "×30,000",
          "×3,000",
          "×0.003",
        ],
        answer: "C",
      },
      {
        points: 50,
        question: "During the mitotic cell cycle, in which phase do sister chromatids separate and move to opposite poles?",
        options: [
          "Metaphase",
          "Anaphase",
          "Prophase",
          "Telophase",
        ],
        answer: "B",
      },
      {
        points: 60,
        question: "A fully turgid plant cell has a solute potential of −0.9 MPa. It is placed in a solution with a water potential of −0.5 MPa. What happens?",
        options: [
          "Water leaves the cell, because the cell’s water potential (0 MPa) is higher than the solution’s",
          "Water enters the cell, because its pressure potential is positive",
          "There is no net movement of water, because the cell is turgid",
          "Water enters the cell, because its solute potential is more negative",
        ],
        answer: "A",
      },
    ],
    // Environmental Studies
    [
      {
        points: 10,
        question: "Which natural material is primarily used to manufacture paper products?",
        options: [
          "Glass",
          "Plastic",
          "Wood (Trees)",
          "Aluminum",
        ],
        answer: "C",
      },
      {
        points: 20,
        question: "What term is used to describe a community of living organisms (like plants and animals) interacting with one another and their physical surroundings?",
        options: [
          "Ecosystem",
          "Population",
          "Biosphere",
          "Biome",
        ],
        answer: "A",
      },
      {
        points: 30,
        question: "What is the primary ecological role of decomposers, such as fungi and bacteria, in a food web?",
        options: [
          "Producing food using sunlight and water",
          "Consuming living plants to control their growth",
          "Breaking down dead organic matter and recycling nutrients back into the soil",
          "Providing energy directly to apex predators",
        ],
        answer: "C",
      },
      {
        points: 40,
        question: "What environmental term measures the total area of biologically productive land and water required collectively to produce all the resources a population consumes and to absorb its wastes?",
        options: [
          "Carbon footprint",
          "Ecological footprint",
          "Biocapacity index",
          "Environmental load displacement",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "What term describes the standard rate at which atmospheric temperature decreases with an increase in altitude within the troposphere?",
        options: [
          "Environmental lapse rate",
          "Adiabatic gradient",
          "Thermal inversion index",
          "Barometric decay constant",
        ],
        answer: "A",
      },
      {
        points: 60,
        question: "In aquatic toxicology and wastewater management, what does the acronym BOD stand for, and what does a high BOD reading typically signify?",
        options: [
          "Biological Ozone Demand; high atmospheric pollution",
          "Biochemical Oxygen Demand; high organic pollution and depleted dissolved oxygen",
          "Basic Organic Decomposition; rapid soil nutrient renewal",
          "Benthic Organism Density; high structural biodiversity",
        ],
        answer: "B",
      },
    ],
    // Mystery
    [
      {
        points: 10,
        question: "At what young age did Arfa Karim become the world's youngest Microsoft Certified Professional (MCP) in 2004?",
        answer: "9 years old",
      },
      {
        points: 20,
        question: "Though born in Germany, Dr. Ruth Pfau became a national hero in Pakistan and was given a state funeral in 2017 for dedicating 55 years of her life to nearly eradicating which disease from the country?",
        answer: "Leprosy",
      },
      {
        points: 30,
        question: "At the time of independence in 1947, there was a severe shortage of female medical professionals, with barely over 100 female doctors in the region. To address this crisis, the government established Pakistan's first-ever exclusive women's medical college in Lahore. What is the name of this historic institution?",
        options: [
          "Lady Willingdon Medical College",
          "Fatima Jinnah Medical College",
          "Begum Ra'ana Liaquat Ali Khan Medical College",
          "Lady Aitchison Medical College",
        ],
        answer: "B",
      },
      {
        points: 40,
        question: "What is the name of Pakistan's annual women-only tech competition launched by the digital engineering firm 10Pearls, in which hundreds of female developers, QA professionals and UX/UI designers take part across cities like Karachi, Lahore and Islamabad?",
        options: [
          "Women in Tech PK",
          "Women Tech Quest (WTQ)",
          "Tech Karo",
          "CodeGirls",
        ],
        answer: "B",
      },
      {
        points: 50,
        question: "In 2020, Pakistani-American astrophysicist Dr. Nergis Mavalvala made history by becoming the first woman appointed to which major leadership role?",
        options: [
          "Dean of the MIT School of Science",
          "Director-General of CERN",
          "Chair of Astrophysics at Caltech",
          "Chief Scientist at NASA",
        ],
        answer: "A",
      },
      {
        points: 60,
        question: "Dr. Nergis Mavalvala’s research group heavily focuses on macroscopic quantum mechanics and the generation of what specific optical state to dramatically reduce quantum noise in gravitational wave detectors?",
        options: [
          "Bose-Einstein condensates of photons",
          "Rydberg polariton lattices",
          "Chiral soliton waves",
          "Squeezed states of light",
        ],
        answer: "D",
      },
    ],
  ],
};

function transpose<T>(matrix: T[][]): (T | undefined)[][] {
  if (!matrix || matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = Math.max(...matrix.map((r) => r.length));
  const result: (T | undefined)[][] = Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => matrix[r][c])
  );
  return result;
}

export const juniorsData = {
  categories: juniors.categories,
  questions: transpose(juniors.questions) as QuestionType[][],
};

export const seniorsData = {
  categories: seniors.categories,
  questions: transpose(seniors.questions) as QuestionType[][],
};
