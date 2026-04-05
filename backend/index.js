const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use('/images', express.static('public'));

// ---------------------------------------------------------------------
// Dummy course data
const courses = [
    {
        id: 1,
        image: 'http://localhost:5000/images/first_aid.png',
        courseTitle: 'Basic First Aid',
        numModules: 15,
        duration: '15 hours 30 mins',
        expiryDate: '05-08-2027',
        description: 'Learn the fundamentals of first aid, including wound care, CPR basics, and emergency response.',
        modules: [
        {
            moduleId: 1,
            title: 'Introduction to First Aid',
            pages: [
            {
                pageId: 1,
                title: 'Overview',
                sections: [
                { type: 'text', content: 'Welcome to Basic First Aid.' },
                { type: 'quiz', question: 'What is the emergency number?', options: ['911', '999'], answer: '999' }
                ]
            },
            {
                pageId: 2,
                title: 'Safety Guidelines',
                sections: [] 
            }
            ]
        }
        ]
    },
    {
        id: 2,
        image: 'http://localhost:5000/images/cpr.png',
        courseTitle: 'CPR Training',
        numModules: 10,
        duration: '8 hours',
        expiryDate: '2026-06-30',
        description: 'Focused training on CPR techniques for adults, children, and infants.',
        modules: [
        {
            moduleId: 1,
            title: 'Introduction to First Aid',
            pages: [
            {
                pageId: 1,
                title: 'Overview',
                sections: [
                { type: 'text', content: 'Welcome to Basic First Aid.' },
                { type: 'quiz', question: 'What is the emergency number?', options: ['911', '999'], answer: '999' }
                ]
            },
            {
                pageId: 2,
                title: 'Safety Guidelines',
                sections: [] 
            }
            ]
        }
        ]
    }
];

// Route to get all courses
app.get('/api/courses', (req,res)=>{
    res.json(courses);
});

// Route to get a single courses by ID
app.get('/api/courses/:id', (req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));

    if(!course){
        return res.status(404).json({message: 'Course not found.'});
    }
    res.json(course);
});

// ---------------------------------------------------------------------
// Dummy todo data
const todos = [
  { id: 1, title: "Finish Module 1", course: "Basic First Aid" },
  { id: 2, title: "Finish Module 2", course: "CPR Training" }
];

// Route to get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});
// ---------------------------------------------------------------------

// Start Over
const PORT =5000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})