# N-Back Cognitive Game

## Play The Game 

[https://trp02.github.io/nback.github.io/](https://trp02.github.io/nback.github.io/) 
Note: Make sure pop ups are allowed. 
![Game Preview](https://github.com/abastola0/SoftwareFoundations/assets/41137160/ed5c0e8d-dbf2-42b0-9e2e-e0073a9a85b3.png)

*Image preview of the game*

## Table of Contents
- [Game Description](#game-description)
- [Objective and Rules](#objective-and-rules)
- [Technology Stack](#technology-stack)
- [Setup and Deployment](#setup-and-deployment)
- [Credits](#credits)
- [Reflection](#reflection)

### Game Description

#### Introduction
N-back is a renowned cognitive task, often utilized in psychological and cognitive experiments. Traditionally, it involves the display of characters, urging the player to remember and identify characters presented ‘n’ steps back in the sequence. Although an effective cognitive assessment tool, its bare-bones design often lacks the engagement and excitement sought by typical game players.

#### The Problem
The traditional N-back task, while valuable for cognitive research, may seem unengaging due to its lack of graphical attributes, goals, and varying difficulty levels. The monotony of characters and repetitive gameplay can diminish the user’s interest and engagement over time.

#### The Solution
Our team has identified and addressed these issues by incorporating engaging elements and varying difficulty levels to enhance the user experience. By transforming the characters into a diverse array of animal icons and integrating ascending difficulty levels, we've instilled a more game-like quality to captivate players' interest.

### Objective and Rules

#### Core Objective
Players aim to maximize correct responses while minimizing errors. They are challenged to recall and identify characters presented ‘n’ steps back in the sequence amidst increasing difficulty levels.

#### Gameplay Mechanics
Players are prompted with animal characters and must swiftly decide if the current character matches the one displayed ‘n’ steps earlier. The difficulty escalates by increasing the ‘n’ value or reducing response time, imposing greater cognitive load.

### Technology Stack

The game is built with:

- HTML
- CSS
- JavaScript

These technologies ensure compatibility, easy maintenance, and a broad base of developer knowledge.

### Setup and Deployment

The game is deployed using Ngrok. Follow these steps to set it up:

1. Download and install Ngrok from the official [website](https://ngrok.com/).
2. Initialize the N-Back game on your local server.
3. Run Ngrok, specifying the port number to create a secure tunnel to your localhost.
4. Share the generated public URL for remote access.

### Credits

We would like to extend our gratitude to:

- W3Schools, for the CSS code that enhanced our game’s visual appeal.
- Ngrok, for enabling a secure and efficient local server exposure.

### Reflection

The topic of the first meeting was deciding on the game. There were several options and games that we explored but the one we settled on was n-back. There are several examples of N back online but we wanted to create a version with our own twist. We also wanted to make the game easy to understand as the ones we found online were rather complicated and took quite a bit of time to fully understand.  There were several ways to put our own twist and the one we decided to go with was decreasing time and giving users the option to choose difficulty.
Our first challenge was adding a level of complexity to the game while keeping a simple, user friendly interface. After going through several options yes/no system was the best one we could think of that is simple yet engaging. 

Deciding on the difficulty levels and corresponding levels for the difficulty segments was another roadblock. The goal was to make the game harder with the levels while keeping it possible to play for normal humans. Even 5 back(remembering previous 5 objects in the sequence) proved to be almost impossible very quickly. We found anywhere between two to four backs to be a good amount. With 2 being easy for most people while 4 taking a longer time to master. 
This takes us to the biggest challenge of the project: creating the algorithm for the progression. We ran into several issues making this and took a long time to get it to a point where we were happy with the ratio of “yes” and “no’s”. 

One example is there is a large roster of 20 unique animals that can show up in the game. Just showing a random character every sequence makes the chance of the same animal showing up 2 steps before in the sequence very very low- meaning the player could just spam “no” and have a correct rate of 99%. This is not the most engaging so instead, after reworking and adjusting the algorithm 10 or so times, settled on a window that would gradually move forward in the roster of characters before looping around. Without going into detail this allows for a very good ratio of “yes” and “no’s” while allowing for every animal to show up. 

Other than that the biggest challenges was learning technologies as most of the group had not done frontend work outside of a little bit of HTML/CSS so it took a while to learn everything. There were a lot of small problems regarding overall progression and design that we encountered but were solved through communication and collaboration.


---

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT](https://choosealicense.com/licenses/mit/) 

---

*Note: Replace placeholder URLs with actual URLs where needed, e.g., game preview image, full reflection, etc.*
