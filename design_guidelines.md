# Course Registration System - Design Guidelines

## Design Approach

**System-Based with Educational Platform Inspiration**
Following Material Design principles with inspiration from modern learning platforms (Coursera, Udemy, Canvas). Focus on clarity, accessibility, and efficient task completion while maintaining visual appeal.

## Core Design Elements

### Typography
- **Primary Font**: Inter or Roboto (Google Fonts)
- **Headings**: 
  - H1: 2.5rem, font-weight 700 (page titles)
  - H2: 2rem, font-weight 600 (section headers)
  - H3: 1.5rem, font-weight 600 (course titles)
- **Body Text**: 1rem, font-weight 400, line-height 1.6
- **Small Text**: 0.875rem for metadata (instructor, seats)
- **Buttons**: 0.9375rem, font-weight 500, uppercase for primary actions

### Layout System
**Spacing Units**: Use Tailwind-equivalent spacing of **4, 8, 12, 16, 24, 32**
- Container max-width: 1200px with 16px horizontal padding
- Section padding: 32px vertical on mobile, 48px on desktop
- Card spacing: 16px padding, 24px between cards
- Form inputs: 12px padding, 8px vertical spacing between fields

### Component Library

**Navigation Bar**
- Fixed top position with slight shadow
- Logo/title on left, navigation links centered/right
- "Admin Mode" toggle prominently displayed (switch component)
- Height: 64px with 16px horizontal padding
- Navigation items: Equal spacing, hover state with subtle underline

**Course Cards** (Grid Display)
- 3-column grid on desktop, 2-column tablet, 1-column mobile
- Card structure: Image placeholder at top (180px height), title, instructor, description (2-line clamp), seats available badge, action button at bottom
- Elevated shadow on hover
- "Seats Available" badge: Small pill in top-right corner with number
- Clear visual distinction between available (green accent) and full courses (gray)

**Hero Section**
- Full-width banner (400px height on desktop)
- Gradient overlay with centered text
- Headline: "Discover Your Next Course" or similar
- Subtext describing the platform
- Search bar integrated into hero (800px max-width, centered)

**My Courses Section**
- List view with horizontal cards
- Each registration shows: Course thumbnail, title, instructor, registration date, "Unregister" button
- Empty state: Centered illustration placeholder with "No courses registered yet" message

**Admin Panel**
- Table view for course management
- Columns: Course Title, Instructor, Total Seats, Available Seats, Actions (Edit/Delete icons)
- "Add New Course" button prominently placed at top
- Edit/Delete actions use icon buttons (pencil, trash)

**Modal Dialogs**
- Centered overlay with backdrop blur
- Form fields: Title, Description (textarea), Instructor, Total Seats (number input)
- Two-button layout: Cancel (secondary) and Save/Add (primary)
- Modal width: 600px max, responsive on mobile

**Confirmation Dialogs**
- Smaller modal (400px max-width)
- Clear warning message
- Two-button layout: Cancel and Confirm (destructive red for delete actions)

**Search/Filter Bar**
- Sticky below navigation when scrolling
- Search input with icon, filter dropdown for instructor
- Clean, minimal design with subtle border

**Footer**
- Simple informational footer
- Copyright, links (About, Contact, Terms)
- Height: 80px, centered content

### Visual Enhancements
- **Card Shadows**: Subtle elevation (0 2px 8px rgba(0,0,0,0.1))
- **Hover Effects**: Lift cards slightly on hover, brighten buttons
- **Transitions**: 200ms ease for all interactive elements
- **Borders**: 1px solid with subtle gray, rounded corners 8px for cards, 4px for buttons
- **Icons**: Material Icons via CDN for all action buttons and metadata

### Accessibility
- Minimum touch target: 48x48px for all interactive elements
- Form labels clearly associated with inputs
- Focus states: 2px outline with appropriate contrast
- ARIA labels for icon-only buttons
- Semantic HTML structure throughout

### Images
**Hero Image**: 
- Full-width banner image showing diverse students or learning environment
- Placement: Top of home page, 400px height
- Style: Gradient overlay (dark to transparent) for text legibility

**Course Thumbnails**: 
- Placeholder images (300x180px) representing subject matter
- Grid display in course catalog
- Consistent aspect ratio across all cards

### Responsive Breakpoints
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grid)
- Desktop: > 1024px (3-column grid, full layout)

### State Management Display
- Loading states: Skeleton screens for course cards
- Empty states: Centered icon + message for no courses/registrations
- Error states: Inline error messages with icon
- Success feedback: Toast notifications (top-right, auto-dismiss after 3s)

**Key Principle**: Create a professional, education-focused interface that balances information density with visual breathing room. Prioritize task completion efficiency while maintaining modern aesthetic standards.