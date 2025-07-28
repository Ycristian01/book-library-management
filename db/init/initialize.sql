DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INTEGER,
  isbn VARCHAR(13) CHECK (char_length(isbn) = 13),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_isbn UNIQUE (isbn)
);

INSERT INTO
  books (title, author, year, isbn)
VALUES
  ('Carrie', 'Stephen King', 1974, '9780307743664'),
  (
    'The Shining',
    'Stephen King',
    1977,
    '9780307743657'
  ),
  ('It', 'Stephen King', 1986, '9781501142970'),
  (
    'Pet Sematary',
    'Stephen King',
    1983,
    '9780743412285'
  ),
  ('Misery', 'Stephen King', 1987, '9781501143106'),
  (
    'The Stand',
    'Stephen King',
    1978,
    '9780307743688'
  ),
  (
    'Doctor Sleep',
    'Stephen King',
    2013,
    '9781476727653'
  ),
  ('Revival', 'Stephen King', 2014, '9781476770383'),
  (
    'Salem''s Lot',
    'Stephen King',
    1975,
    '9780307743671'
  ),
  (
    'Gerald''s Game',
    'Stephen King',
    1992,
    '9781501194962'
  ),
  (
    'The Call of Cthulhu',
    'H.P. Lovecraft',
    1928,
    '9780486209453'
  ),
  (
    'The Shadow over Innsmouth',
    'H.P. Lovecraft',
    1936,
    '9780486272723'
  ),
  (
    'At the Mountains of Madness',
    'H.P. Lovecraft',
    1936,
    '9780812502123'
  ),
  (
    'The Dunwich Horror',
    'H.P. Lovecraft',
    1929,
    '9780345329455'
  ),
  (
    'The Colour Out of Space',
    'H.P. Lovecraft',
    1927,
    '9780143122333'
  ),
  (
    'The Whisperer in Darkness',
    'H.P. Lovecraft',
    1931,
    '9780143122357'
  ),
  (
    'The Dreams in the Witch House',
    'H.P. Lovecraft',
    1933,
    '9780143122340'
  ),
  (
    'The Thing on the Doorstep',
    'H.P. Lovecraft',
    1937,
    '9780143122364'
  ),
  (
    'The Rats in the Walls',
    'H.P. Lovecraft',
    1924,
    '9780143122371'
  ),
  (
    'The Shadow Out of Time',
    'H.P. Lovecraft',
    1936,
    '9780143122388'
  ),
  (
    'Hellbound Heart',
    'Clive Barker',
    1986,
    '9780061452888'
  ),
  (
    'Books of Blood, Vol. 1',
    'Clive Barker',
    1984,
    '9780425083899'
  ),
  (
    'Books of Blood, Vol. 2',
    'Clive Barker',
    1984,
    '9780425083905'
  ),
  (
    'Books of Blood, Vol. 3',
    'Clive Barker',
    1985,
    '9780425083912'
  ),
  ('Cabal', 'Clive Barker', 1988, '9780671684268'),
  (
    'Weaveworld',
    'Clive Barker',
    1987,
    '9780671508762'
  ),
  ('Imajica', 'Clive Barker', 1991, '9780061091988'),
  (
    'The Great and Secret Show',
    'Clive Barker',
    1989,
    '9780061091995'
  ),
  (
    'Everville',
    'Clive Barker',
    1994,
    '9780061092008'
  ),
  ('Galilee', 'Clive Barker', 1998, '9780061092039'),
  (
    'The Haunting of Hill House',
    'Shirley Jackson',
    1959,
    '9780143039983'
  ),
  (
    'We Have Always Lived in the Castle',
    'Shirley Jackson',
    1962,
    '9780143039976'
  ),
  (
    'Hangsaman',
    'Shirley Jackson',
    1951,
    '9780143107057'
  ),
  (
    'The Bird''s Nest',
    'Shirley Jackson',
    1954,
    '9780143107064'
  ),
  (
    'Ghost Story',
    'Peter Straub',
    1979,
    '9780425185500'
  ),
  (
    'Shadowland',
    'Peter Straub',
    1980,
    '9780451166610'
  ),
  (
    'Floating Dragon',
    'Peter Straub',
    1983,
    '9780425075894'
  ),
  (
    'House of Leaves',
    'Mark Z. Danielewski',
    2000,
    '9780375703768'
  ),
  (
    'Haunted',
    'Chuck Palahniuk',
    2005,
    '9780385509480'
  ),
  (
    'The Troop',
    'Nick Cutter',
    2014,
    '9781476717715'
  ),
  ('The Deep', 'Nick Cutter', 2015, '9781501104213'),
  (
    'Whispers in the Dark',
    'T. E. Grau',
    2015,
    '9781943910016'
  ),
  (
    'A Head Full of Ghosts',
    'Paul Tremblay',
    2015,
    '9780062363236'
  ),
  (
    'The Cabin at the End of the World',
    'Paul Tremblay',
    2018,
    '9780062679108'
  ),
  (
    'The Fisherman',
    'John Langan',
    2016,
    '9781614981387'
  ),
  (
    'The Ballad of Black Tom',
    'Victor LaValle',
    2016,
    '9780765387868'
  ),
  (
    'The Silence',
    'Tim Lebbon',
    2015,
    '9781781168821'
  ),
  (
    'The Ritual',
    'Adam Nevill',
    2011,
    '9780330514965'
  ),
  (
    'Last Days',
    'Adam Nevill',
    2013,
    '9781250041285'
  ),
  (
    'No One Gets Out Alive',
    'Adam Nevill',
    2014,
    '9781447240912'
  ),
  (
    'Apartment 16',
    'Adam Nevill',
    2010,
    '9780330514966'
  ),
  ('Dead Sea', 'Brian Keene', 2007, '9780843959281'),
  (
    'City of the Dead',
    'Brian Keene',
    2005,
    '9780843956389'
  ),
  (
    'The Rising',
    'Brian Keene',
    2003,
    '9780843952015'
  ),
  (
    'Dark Hollow',
    'Brian Keene',
    2006,
    '9780843957027'
  ),
  ('Ghoul', 'Brian Keene', 2007, '9780843961444'),
  (
    'The Girl Next Door',
    'Jack Ketchum',
    1989,
    '9780843955436'
  ),
  (
    'Off Season',
    'Jack Ketchum',
    1980,
    '9780843955078'
  ),
  ('Red', 'Jack Ketchum', 1995, '9780843955085'),
  (
    'The Woman',
    'Jack Ketchum',
    2010,
    '9780843963943'
  ),
  (
    'Peaceable Kingdom',
    'Jack Ketchum',
    2003,
    '9780843955405'
  );