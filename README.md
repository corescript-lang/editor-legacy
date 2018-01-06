# Corescript
The source code behind the brand new CoreScript. 

---
### Features
- Syntax Highlighter
- Improved variables
- Better GUI

---
### Syntax
**Print**: Print text on the screen.

  

    print Hello, World!

**Note**: Only the coder will see these notes.

   

    // This is a test.

**Variable**: Create a variable and set it's value.

  

    var name=John Doe

**Input**: Asks the user for info and stores it in a variable.

  

    input name=What’s your name?

**Clear Screen**: Clears the screen of any text.

  

    cls

**Message**: Creates a browser message box.

  

    msg Hello!

**Set**: Set a variable to a specified value.

  

    set name=Jane Doe

**If**: Checks if a variable equals something. If true, then the program will go to a specific line or label.

  

    if name=Johnny:4

**Goto**: Changes current line Corescript is reading.

  

    goto 3

**Not**: Checks if a variable does not equal something. If true, then the program will go to a specific line.

  

    not name=Johnny:5

**Stop**: Stops the program

  

    stop
    
**:**: Define a label, so you can later visit it.

  

    :start
    
---
### Examples

    input choice = Which is better: Microsoft(m) or Apple?(a) 
    if choice = m:m
    if choice = a:a
    :m
    print Good choice!
    stop
    :a
    // :
    print eh
    stop


