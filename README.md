# snacks

This is where we talk about Snacks.
And share our favorite snacks with our friends.

Get ready, its gonna be a crunch of a good time.

Built with

Node.js
Express
React (hooks/context api)
React Testing Library
Amazon s3
SQL Database
Passport JS

Component Structure:

All components:
    xApp
    xMain Container (only stateful component) 
        xNavBar
          xSnack Add Box (modal)
            (stars?)
          xLoginModal Box (modal)
            xSign in Form 
              or
            xSign Up Form 
    Logo Container (conditional on signed in)
        Logo
    Seach Container
        Search Input?
        Filters
    Snack View Container (either default return or user's snacks with their provided filters)
        Snackbox
            Image
            Stats
            Edit Button?