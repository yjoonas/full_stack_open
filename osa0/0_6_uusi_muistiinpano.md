sequenceDiagram
participant browser
participant server

    on form.onsubmit browser exectues adds new object to notes array
    {"content":"teststset","date":"2023-12-17T12:40:04.009Z"}
    
    browser executes redrawNotes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    # Handle request with form_data of new note then response
    server-->>browser: status 201
    deactivate server 