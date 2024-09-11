# Kamper - Camping Website

Kamper is a web application for discovering and booking campsites, as well as renting camping gear.

## Features

- Browse and search for campsites
- View detailed information about each campsite
- Rent camping gear
- User accounts with profiles and bookings
- Campsite owners can list and manage their properties
- Dark Mode!

## Pages

1. Home - Landing page with featured campsites and call-to-action buttons
2. Browse Campsites - Grid view of available campsites with filters
3. Campsite Details - Individual campsite page with photos, description, and booking options
4. Rent Camp Gears - Page to browse and rent camping equipment
5. User Account - Dashboard for managing profile, bookings, and listings

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run start`

## Contribution Breakdown

### Tharindu
    + Interfaces: 
        Landing Page
        Browse Campsites
        Dark mode toggle
        Campsite Details
        Image Uploader
    
    + Features: 
        Campsite CRUD operations
            - Create a campsite and diplay on the browse page and single campsite details page
            - Update a campsite using the same form as the create form
            - Delete a campsite from the database
            - Handle multiple images for a campsite and selecting a cover image
            
    + Database:
        Creating a cloud hosted MongoDB database (Free)

    + Other:
        Utilizing GitHub for better Code-Team coordination and organization
            

### Naveen
    + Interfaces:
        
    + Features:

    + Other:

### Ravidu
    + Interfaces:
        Booking Page
        Bookings Page
        Booking Widget
        Booking Dates Component

    + Features:
        Booking Campsite CRUD operations
            - Create a booking widget for placing bookings on campsites.
            - Allow customers to update only their phone number and maximum number of guests.
            - Enable deletion of booked campsites from the database.
            - Display all bookings made by the logged-in user in the "My Bookings" section.
            
    + Other:
        Implement validation criteria to ensure users cannot book past dates, exceed the maximum number of guests, etc.

### Praneesh
    + Interfaces:

    + Features:

    + Other:

### Raheem
    + Interfaces:

    + Features:

    + Other:

## License

This project is licensed under the OUROWNPROJECT License - a group project of 5 computer science undergraduates at the University of Colombo School of Computing.
