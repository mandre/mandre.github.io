// https://github.com/moby/moby/blob/master/pkg/namesgenerator/names-generator.go
(function() {
  var LEFT = ["admiring", "adoring", "affectionate", "agitated", "amazing", "angry", "awesome", "blissful", "boring", "brave", "clever", "cocky", "compassionate", "competent", "condescending", "confident", "cranky", "dazzling", "determined", "distracted", "dreamy", "eager", "ecstatic", "elastic", "elated", "elegant", "eloquent", "epic", "fervent", "festive", "flamboyant", "focused", "friendly", "frosty", "gallant", "gifted", "goofy", "gracious", "happy", "hardcore", "heuristic", "hopeful", "hungry", "infallible", "inspiring", "jolly", "jovial", "keen", "kind", "laughing", "loving", "lucid", "mystifying", "modest", "musing", "naughty", "nervous", "nifty", "nostalgic", "objective", "optimistic", "peaceful", "pedantic", "pensive", "practical", "priceless", "quirky", "quizzical", "relaxed", "reverent", "romantic", "sad", "serene", "sharp", "silly", "sleepy", "stoic", "stupefied", "suspicious", "tender", "thirsty", "trusting", "unruffled", "upbeat", "vibrant", "vigilant", "vigorous", "wizardly", "wonderful", "xenodochial", "youthful", "zealous", "zen"];

  var RIGHT = {
    "albattani": "Muhammad ibn Jābir al-Ḥarrānī al-Battānī was a founding father of astronomy.",
    "allen": "Frances E. Allen, became the first female IBM Fellow in 1989. In 2006, she became the first female recipient of the ACM's Turing Award.",
    "almeida": "June Almeida - Scottish virologist who took the first pictures of the rubella virus.",
    "agnesi": "Maria Gaetana Agnesi - Italian mathematician, philosopher, theologian and humanitarian. She was the first woman to write a mathematics handbook and the first woman appointed as a Mathematics Professor at a University.",
    "archimedes": "Archimedes was a physicist, engineer and mathematician who invented too many things to list them here.",
    "ardinghelli": "Maria Ardinghelli - Italian translator, mathematician and physicist.",
    "aryabhata": "Aryabhata - Ancient Indian mathematician-astronomer during 476-550 CE.",
    "austin": "Wanda Austin - Wanda Austin is the President and CEO of The Aerospace Corporation, a leading architect for the US security space programs.",
    "babbage": "Charles Babbage invented the concept of a programmable computer.",
    "banach": "Stefan Banach - Polish mathematician, was one of the founders of modern functional analysis.",
    "bardeen": "John Bardeen co-invented the transistor.",
    "bartik": "Jean Bartik, born Betty Jean Jennings, was one of the original programmers for the ENIAC computer.",
    "bassi": "Laura Bassi, the world's first female professor.",
    "beaver": "Hugh Beaver, British engineer, founder of the Guinness Book of World Records.",
    "bell": "Alexander Graham Bell - an eminent Scottish-born scientist, inventor, engineer and innovator who is credited with inventing the first practical telephone.",
    "benz": "Karl Friedrich Benz - a German automobile engineer. Inventor of the first practical motorcar.",
    "bhabha": 'Homi J Bhabha - was an Indian nuclear physicist, founding director, and professor of physics at the Tata Institute of Fundamental Research. Colloquially known as "father of Indian nuclear programme".',
    "bhaskara": "Bhaskara II - Ancient Indian mathematician-astronomer whose work on calculus predates Newton and Leibniz by over half a millennium.",
    "blackwell": "Elizabeth Blackwell - American doctor and first American woman to receive a medical degree.",
    "bohr": "Niels Bohr is the father of quantum theory.",
    "booth": "Kathleen Booth, she's credited with writing the first assembly language.",
    "borg": "Anita Borg - Anita Borg was the founding director of the Institute for Women and Technology (IWT).",
    "bose": "Satyendra Nath Bose - He provided the foundation for Bose–Einstein statistics and the theory of the Bose–Einstein condensate.",
    "boyd": "Evelyn Boyd Granville - She was one of the first African-American woman to receive a Ph.D. in mathematics; she earned it in 1949 from Yale University.",
    "brahmagupta": "Brahmagupta - Ancient Indian mathematician during 598-670 CE who gave rules to compute with zero.",
    "brattain": "Walter Houser Brattain co-invented the transistor.",
    "brown": "Emmett Brown invented time travel.",
    "carson": "Rachel Carson - American marine biologist and conservationist, her book Silent Spring and other writings are credited with advancing the global environmental movement.",
    "chandrasekhar": "Subrahmanyan Chandrasekhar - Astrophysicist known for his mathematical theory on different stages and evolution in structures of the stars. He has won nobel prize for physics.",
    "shannon": "laude Shannon - The father of information theory and founder of digital circuit design theory.",
    "clarke": "Joan Clarke - Bletchley Park code breaker during the Second World War who pioneered techniques that remained top secret for decades. Also an accomplished numismatist.",
    "colden": "Jane Colden - American botanist widely considered the first female American botanist.",
    "cori": "Gerty Theresa Cori - American biochemist who became the third woman—and first American woman—to win a Nobel Prize in science, and the first woman to be awarded the Nobel Prize in Physiology or Medicine. Cori was born in Prague.",
    "cray": "Seymour Roger Cray was an American electrical engineer and supercomputer architect who designed a series of computers that were the fastest in the world for decades.",
    "curran": "Joan Curran was a Welsh scientist who developed radar and invented chaff, a radar countermeasure. Samuel Curran was an Irish physicist who worked alongside his wife during WWII and invented the proximity fuse.",
    "curie": "Marie Curie discovered radioactivity.",
    "darwin": "Charles Darwin established the principles of natural evolution.",
    "davinci": "Leonardo Da Vinci invented too many things to list here.",
    "dijkstra": "Edsger Wybe Dijkstra was a Dutch computer scientist and mathematical scientist.",
    "dubinsky": "Donna Dubinsky - played an integral role in the development of personal digital assistants (PDAs) serving as CEO of Palm, Inc. and co-founding Handspring.",
    "easley": "Annie Easley - She was a leading member of the team which developed software for the Centaur rocket stage and one of the first African-Americans in her field.",
    "edison": "Thomas Alva Edison, prolific inventor.",
    "einstein": "Albert Einstein invented the general theory of relativity.",
    "elion": "Gertrude Elion - American biochemist, pharmacologist and the 1988 recipient of the Nobel Prize in Medicine.",
    "engelbart": "Douglas Engelbart gave the mother of all demos.",
    "euclid": "Euclid invented geometry.",
    "euler": "Leonhard Euler invented large parts of modern mathematics.",
    "fermat": "Pierre de Fermat pioneered several aspects of modern mathematics.",
    "fermi": "Enrico Fermi invented the first nuclear reactor.",
    "feynman": "Richard Feynman was a key contributor to quantum mechanics and particle physics.",
    "franklin": "Benjamin Franklin is famous for his experiments in electricity and the invention of the lightning rod.",
    "galileo": "Galileo was a founding father of modern astronomy, and faced politics and obscurantism to establish scientific truth.",
    "gates": 'William Henry "Bill" Gates III is an American business magnate, philanthropist, investor, computer programmer, and inventor.',
    "goldberg": "Adele Goldberg, was one of the designers and developers of the Smalltalk language.",
    "goldstine": "Adele Goldstine, born Adele Katz, wrote the complete technical description for the first electronic digital computer, ENIAC.",
    "goldwasser": "Shafi Goldwasser is a computer scientist known for creating theoretical foundations of modern cryptography. Winner of 2012 ACM Turing Award.",
    "golick": "James Golick, all around gangster.",
    "goodall": "Jane Goodall - British primatologist, ethologist, and anthropologist who is considered to be the world's foremost expert on chimpanzees.",
    "haibt": "Lois Haibt - American computer scientist, part of the team at IBM that developed FORTRAN.",
    "hamilton": "Margaret Hamilton - Director of the Software Engineering Division of the MIT Instrumentation Laboratory, which developed on-board flight software for the Apollo space program.",
    "hawking": "Stephen Hawking pioneered the field of cosmology by combining general relativity and quantum mechanics.",
    "heisenberg": "Werner Heisenberg was a founding father of quantum mechanics.",
    "hermann": "Grete Hermann was a German philosopher noted for her philosophical work on the foundations of quantum mechanics.",
    "heyrovsky": "Jaroslav Heyrovský was the inventor of the polarographic method, father of the electroanalytical method, and recipient of the Nobel Prize in 1959. His main field of work was polarography.",
    "hodgkin": "Dorothy Hodgkin was a British biochemist, credited with the development of protein crystallography. She was awarded the Nobel Prize in Chemistry in 1964.",
    "hoover": "Erna Schneider Hoover revolutionized modern communication by inventing a computerized telephone switching method.",
    "hopper": 'Grace Hopper developed the first compiler for a computer programming language and  is credited with popularizing the term "debugging" for fixing computer glitches.',
    "hugle": "Frances Hugle, she was an American scientist, engineer, and inventor who contributed to the understanding of semiconductors, integrated circuitry, and the unique electrical principles of microscopic materials.",
    "hypatia": "Hypatia - Greek Alexandrine Neoplatonist philosopher in Egypt who was one of the earliest mothers of mathematics.",
    "jackson": "Mary Jackson, American mathematician and aerospace engineer who earned the highest title within NASA's engineering department.",
    "jang": "Yeong-Sil Jang was a Korean scientist and astronomer during the Joseon Dynasty; he invented the first metal printing press and water gauge.",
    "jennings": "Betty Jennings - one of the original programmers of the ENIAC.",
    "jepsen": "Mary Lou Jepsen, was the founder and chief technology officer of One Laptop Per Child (OLPC), and the founder of Pixel Qi.",
    "johnson": "Katherine Coleman Goble Johnson - American physicist and mathematician contributed to the NASA.",
    "joliot": "Irène Joliot-Curie - French scientist who was awarded the Nobel Prize for Chemistry in 1935. Daughter of Marie and Pierre Curie.",
    "jones": "Karen Spärck Jones came up with the concept of inverse document frequency, which is used in most search engines today.",
    "kalam": "A. P. J. Abdul Kalam - is an Indian scientist aka Missile Man of India for his work on the development of ballistic missile and launch vehicle technology.",
    "kare": "Susan Kare, created the icons and many of the interface elements for the original Apple Macintosh in the 1980s, and was an original employee of NeXT, working as the Creative Director.",
    "keller": "Mary Kenneth Keller, Sister Mary Kenneth Keller became the first American woman to earn a PhD in Computer Science in 1965.",
    "kepler": "Johannes Kepler, German astronomer known for his three laws of planetary motion.",
    "khorana": "Har Gobind Khorana - Indian-American biochemist who shared the 1968 Nobel Prize for Physiology.",
    "kilby": "Jack Kilby invented silicone integrated circuits and gave Silicon Valley its name.",
    "kirch": "Maria Kirch - German astronomer and first woman to discover a comet.",
    "knuth": 'Donald Knuth - American computer scientist, author of "The Art of Computer Programming" and creator of the TeX typesetting system.',
    "kowalevski": "Sophie Kowalevski - Russian mathematician responsible for important original contributions to analysis, differential equations and mechanics.",
    "lalande": "Marie-Jeanne de Lalande - French astronomer, mathematician and cataloguer of star.",
    "lamarr": "Hedy Lamarr - Actress and inventor. The principles of her work are now incorporated into modern Wi-Fi, CDMA and Bluetooth technology.",
    "lamport": "Leslie B. Lamport - American computer scientist. Lamport is best known for his seminal work in distributed systems and was the winner of the 2013 Turing Award.",
    "leakey": "Mary Leakey - British paleoanthropologist who discovered the first fossilized Proconsul skull.",
    "leavitt": "Henrietta Swan Leavitt - she was an American astronomer who discovered the relation between the luminosity and the period of Cepheid variable stars.",
    "lewin": "aniel Lewin -  Mathematician, Akamai co-founder, soldier, 9/11 victim-- Developed optimization techniques for routing traffic on the internet. Died attempting to stop the 9-11 hijackers.",
    "lichterman": "Ruth Lichterman - one of the original programmers of the ENIAC.",
    "liskov": "Barbara Liskov - co-developed the Liskov substitution principle. Liskov was also the winner of the Turing Prize in 2008.",
    "lovelace": "Ada Lovelace invented the first algorithm.",
    "lumiere": "Auguste and Louis Lumière - the first filmmakers in history.",
    "mahavira": "Mahavira - Ancient Indian mathematician during 9th century AD who discovered basic algebraic identities.",
    "mayer": "Maria Mayer - American theoretical physicist and Nobel laureate in Physics for proposing the nuclear shell model of the atomic nucleus.",
    "mccarthy": "John McCarthy invented LISP.",
    "mcclintock": "Barbara McClintock - a distinguished American cytogeneticist, 1983 Nobel Laureate in Physiology or Medicine for discovering transposons.",
    "mclean": "Malcolm McLean invented the modern shipping container.",
    "mcnulty": "Kay McNulty - one of the original programmers of the ENIAC.",
    "meitner": "Lise Meitner - Austrian/Swedish physicist who was involved in the discovery of nuclear fission. The element meitnerium is named after her.",
    "meninsky": "Carla Meninsky, was the game designer and programmer for Atari 2600 games Dodge 'Em and Warlords.",
    "mestorf": "Johanna Mestorf - German prehistoric archaeologist and first female museum director in Germany.",
    "minsky": "Marvin Minsky - Pioneer in Artificial Intelligence, co-founder of the MIT's AI Lab, won the Turing Award in 1969.",
    "mirzakhani": "Maryam Mirzakhani - an Iranian mathematician and the first woman to win the Fields Medal.",
    "morse": "Samuel Morse - contributed to the invention of a single-wire telegraph system based on European telegraphs and was a co-developer of the Morse code.",
    "murdock": "Ian Murdock - founder of the Debian project.",
    "neumann": "John von Neumann - todays computer architectures are based on the von Neumann architecture.",
    "newton": "Isaac Newton invented classic mechanics and modern optics.",
    "nightingale": "Florence Nightingale, more prominently known as a nurse, was also the first female member of the Royal Statistical Society and a pioneer in statistical graphics.",
    "nobel": "Alfred Nobel - a Swedish chemist, engineer, innovator, and armaments manufacturer (inventor of dynamite).",
    "noether": "Emmy Noether, German mathematician. Noether's Theorem is named after her.",
    "northcutt": "Poppy Northcutt. Poppy Northcutt was the first woman to work as part of NASA’s Mission Control.",
    "noyce": "Robert Noyce invented silicone integrated circuits and gave Silicon Valley its name.",
    "panini": "Panini - Ancient Indian linguist and grammarian from 4th century CE who worked on the world's first formal system.",
    "pare": "Ambroise Pare invented modern surgery.",
    "pasteur": "Louis Pasteur discovered vaccination, fermentation and pasteurization.",
    "payne": "Cecilia Payne-Gaposchkin was an astronomer and astrophysicist who, in 1925, proposed in her Ph.D. thesis an explanation for the composition of stars in terms of the relative abundances of hydrogen and helium.",
    "perlman": "Radia Perlman is a software designer and network engineer and most famous for her invention of the spanning-tree protocol (STP).",
    "pike": "Rob Pike was a key contributor to Unix, Plan 9, the X graphic system, utf-8, and the Go programming language.",
    "poincare": "Henri Poincaré made fundamental contributions in several fields of mathematics.",
    "poitras": "Laura Poitras is a director and producer whose work, made possible by open source crypto tools, advances the causes of truth and freedom of information by reporting disclosures by whistleblowers such as Edward Snowden.",
    "ptolemy": "Claudius Ptolemy - a Greco-Egyptian writer of Alexandria, known as a mathematician, astronomer, geographer, astrologer, and poet of a single epigram in the Greek Anthology.",
    "raman": "C. V. Raman - Indian physicist who won the Nobel Prize in 1930 for proposing the Raman effect.",
    "ramanujan": "Srinivasa Ramanujan - Indian mathematician and autodidact who made extraordinary contributions to mathematical analysis, number theory, infinite series, and continued fractions.",
    "ride": "Sally Kristen Ride was an American physicist and astronaut. She was the first American woman in space, and the youngest American astronaut.",
    "montalcini": "Rita Levi-Montalcini - Won Nobel Prize in Physiology or Medicine jointly with colleague Stanley Cohen for the discovery of nerve growth factor.",
    "ritchie": "Dennis Ritchie - co-creator of UNIX and the C programming language.",
    "roentgen": "Wilhelm Conrad Röntgen - German physicist who was awarded the first Nobel Prize in Physics in 1901 for the discovery of X-rays (Röntgen rays).",
    "rosalind": "Rosalind Franklin - British biophysicist and X-ray crystallographer whose research was critical to the understanding of DNA.",
    "saha": "Meghnad Saha - Indian astrophysicist best known for his development of the Saha equation, used to describe chemical and physical conditions in stars.",
    "sammet": "Jean E. Sammet developed FORMAC, the first widely used computer language for symbolic manipulation of mathematical formulas.",
    "shaw": "Carol Shaw - Originally an Atari employee, Carol Shaw is said to be the first female video game designer.",
    "shirley": 'Dame Stephanie "Steve" Shirley - Founded a software company in 1962 employing women working from home.',
    "shockley": "William Shockley co-invented the transistor.",
    "sinoussi": "Françoise Barré-Sinoussi - French virologist and Nobel Prize Laureate in Physiology or Medicine; her work was fundamental in identifying HIV as the cause of AIDS.",
    "snyder": "Betty Snyder - one of the original programmers of the ENIAC.",
    "spence": "Frances Spence - one of the original programmers of the ENIAC.",
    "stallman": "Richard Matthew Stallman - the founder of the Free Software movement, the GNU project, the Free Software Foundation, and the League for Programming Freedom. He also invented the concept of copyleft to protect the ideals of this movement, and enshrined this concept in the widely-used GPL (General Public License) for software.",
    "stonebraker": "Michael Stonebraker is a database research pioneer and architect of Ingres, Postgres, VoltDB and SciDB. Winner of 2014 ACM Turing Award.",
    "swanson": "Janese Swanson (with others) developed the first of the Carmen Sandiego games. She went on to found Girl Tech.",
    "swartz": "Aaron Swartz was influential in creating RSS, Markdown, Creative Commons, Reddit, and much of the internet as we know it today. He was devoted to freedom of information on the web.",
    "swirles": "Bertha Swirles was a theoretical physicist who made a number of contributions to early quantum theory.",
    "tesla": "Nikola Tesla invented the AC electric system and every gadget ever used by a James Bond villain.",
    "thompson": "Ken Thompson - co-creator of UNIX and the C programming language.",
    "torvalds": "Linus Torvalds invented Linux and Git.",
    "turing": "Alan Turing was a founding father of computer science.",
    "varahamihira": "Varahamihira - Ancient Indian mathematician who discovered trigonometric formulae during 505-587 CE.",
    "visvesvaraya": "Sir Mokshagundam Visvesvaraya - is a notable Indian engineer.  He is a recipient of the Indian Republic's highest honour, the Bharat Ratna, in 1955. On his birthday, 15 September is celebrated as Engineer's Day in India in his memory.",
    "volhard": "Christiane Nüsslein-Volhard - German biologist, won Nobel Prize in Physiology or Medicine in 1995 for research on the genetic control of embryonic development.",
    "wescoff": "Marlyn Wescoff - one of the original programmers of the ENIAC.",
    "wiles": "Andrew Wiles - Notable British mathematician who proved the enigmatic Fermat's Last Theorem.",
    "williams": "Roberta Williams, did pioneering work in graphical adventure games for personal computers, particularly the King's Quest series.",
    "wilson": "Sophie Wilson designed the first Acorn Micro-Computer and the instruction set for ARM processors.",
    "wing": "Jeannette Wing - co-developed the Liskov substitution principle.",
    "wozniak": "Steve Wozniak invented the Apple I and Apple II.",
    "wright": "The Wright brothers, Orville and Wilbur - credited with inventing and building the world's first successful airplane and making the first controlled, powered and sustained heavier-than-air human flight.",
    "yalow": "Rosalyn Sussman Yalow - Rosalyn Sussman Yalow was an American medical physicist, and a co-winner of the 1977 Nobel Prize in Physiology or Medicine for development of the radioimmunoassay technique.",
    "yonath": "Ada Yonath - an Israeli crystallographer, the first woman from the Middle East to win a Nobel prize in the sciences."
  };

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  var random_idx = function(length) {
    return Math.floor(Math.random() * length);
  }

  var sample = function(array) {
    return array[random_idx(array.length)];
  };

  var generate = function() {
    return sample(LEFT).capitalize() + " " + sample(Object.keys(RIGHT)).capitalize();
  };

  var generate_with_desc = function() {
    var index = random_idx(Object.keys(RIGHT).length);
    var name = (Object.keys(RIGHT))[index]
    return "<span title=\"" + RIGHT[name].replace(/\"/g,"&quot;") + "\">" + sample(LEFT).capitalize() + " " + name.capitalize() + "</span>";
  };

  var checkbox = document.querySelector('#sidebar-checkbox');

  checkbox.addEventListener("change", function(event) {
    if (checkbox.checked) {
      var desc = document.querySelector('#description');
      desc.innerHTML = generate_with_desc()
    }
  });

}).call(this);
