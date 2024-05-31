### BS3206 Computing Project Artefact

# Interoperable Electronic Health Record Prototype
This artefact is a prototype of an interoperable electronic health record which uses the plugin architecture to allow easy integration and overwriting of integrations with other APIs and the user interfaces.

The main focus of this prototype was the plugin architecture, as that was what was required to fulfil the research aims. Whilst they were considered, other items were secondary. Please also note that due to differences within data taken from the test server some items were dynamically rendered.

## Running

To run this application please navigate to the root of the project folder, type `npm i` then type `node .` to start running the application.

If there are any issues navigate to each of these directories and run `npm i`:

- src\user_interface\default
- plugins\TestingPlugin\ui\testing-plugin-ui

## Key actions

1. Testing plugin rendering:

To over write the default care plan page with a plugin, paste the following code into the array in the `PluginRules.json` file within the root directory:

```
        ,
        {
            "subject": "CARE_PLAN",
            "condition": {
                
            },
            "route": "/test/ui"
        }        
```


2. Importing a patient:

Navigate to the imports page, select the relevent plugin, and press search. Find the patient you wish to import (They all come from testing data) and press the import patient data button.

A popup should appear saying the activity is complete, and if you refresh the page the patients should be displayed.

3. Entering a record locally:

Navigate to the treatment history page and select the resource to create. Then fill out the form and press complete.

4. View a record:

Find a patient with records, such as `Rod O' Keefe` and select one of the records on the page for it to be dynamically rendered.