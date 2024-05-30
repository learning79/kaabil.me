const navItems = [
  { text: 'Home', id: 'home'},
  { text: 'What we do', id: 'whatWeDo' },
  { text: 'How it works', id: 'howItWorks' },
  { 
    text: 'Get Started',
    button: true, // Add a button property to indicate it's a button
    link: '/dashboard' // Add a link property with the destination URL
  },
];

export default navItems;
