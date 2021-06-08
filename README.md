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
    Snack View Container (Stateful: fetch return (snack data))
        Search Container (receives snack data state, function for fetch)
          Search Input
          Filters
        SnackBoxContainer
        Snackbox (pass props to each box)
          Image
          Stats
          Edit Button?