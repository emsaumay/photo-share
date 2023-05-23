const UserData = [
  {
    id: 1,
    name: 'Alice',
    age: 32,
    city: 'New York',
    occupation: 'Software Engineer',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    place: 5,
    places: [
      { id: 0,name: 'Los Angeles', image: '', caption: 'A beautiful city in California' },
      { id: 1,name: 'Miami', image: '', caption: 'A popular beach destination in Florida' },
      { id: 2,name: 'San Francisco', image: '', caption: 'A hilly city known for the Golden Gate Bridge' },
      { id: 3,name: 'Las Vegas', image: '', caption: 'A city known for its casinos and entertainment' },
      { id: 4,name: 'Seattle', image: '', caption: 'A city known for its coffee and rainy weather' }
    ]
  },
  {
    id: 2,
    name: 'Bob',
    age: 27,
    city: 'San Francisco',
    occupation: 'Data Scientist',
    image: 'https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
    place: 2,
    places: [
      { id: 0, name: 'Seattle', image: '', caption: 'A city known for its coffee and rainy weather' },
      { id: 1, name: 'Portland', image: '', caption: 'A city known for its food and beer' }
    ]
  },
  {
    id: 3,
    name: 'Charlie',
    age: 45,
    city: 'London',
    occupation: 'Marketing Manager',
    image: 'https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?b=1&s=612x612&w=0&k=20&c=t7Z7NBXf5t7jWqoFxsH7B3bgrO3_BznOOhqEXWywjOc=',
    place: 7,
    places: [
      { id: 0,name: 'Paris', image: '', caption: 'The City of Light and the Eiffel Tower' },
      { id: 1,name: 'Rome', image: '', caption: 'The Eternal City and the Colosseum' },
      { id: 2,name: 'Barcelona', image: '', caption: 'The city of Gaudi and Sagrada Familia' },
      { id: 3,name: 'Berlin', image: '', caption: 'A city of history, culture, and nightlife' },
      { id: 4,name: 'Amsterdam', image: '', caption: 'A city of canals, bikes, and museums' },
      { id: 5,name: 'Prague', image: '', caption: 'A city of castles, bridges, and beer' },
      { id: 6,name: 'Vienna', image: '', caption: 'A city of classical music, coffeehouses, and palaces' }
    ]
  }]

module.exports = UserData