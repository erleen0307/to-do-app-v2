_To-Do-app-v2 Rough Dev Notes - for reference_

## HTML
- Body
- Header
    - Heading
- Main
    - Layout Div
        - Clear All Button
        - Input Placeholder
        - Add Task Button
    - Titles Class
        - P (_Options, Status, Desc_)
    - Task Div
        - Tasks from DOM
     

## JS
- class SingleTask (_line 1_)
    - taskDesc and isCompleted
    - toggle Completion changes _true -> false and false -> true_

- class TaskList (_line 14_)
    - takes a list [] called tasks
    - addTask
        - adds new taskObj using _.push()_
    - deleteTask
        - deletes task using index and _.splice()_
    - getAllTasks
        - returns tasks []

- saveToLocalStorage function (_line 32_)
    - creates const plainTasks using _TaskList class and .map()_
    - Saves the const in localStorage using _.setItem()_ and _JSON.stringify()_

- Retrieve components from HTML using DOM (_line 44_)

- renderTasks() function
    - Clears all previous items using _.innerHTML = ''_
    - If their are no tasks, display the appropriate message
    
    - Using _.forEach()_, make a new div for each task
    - Create a span element that shows the completion status (_line 64_)
    
    - toggleBtn Event Listener (_line 73_)
        - On clicking, the toggle status is switched from _toggleCompletion in SingleTask class_
        - The new status is then saved to localStorage
    
    - deleteBtn Event Listener (_line 83_)
        - On clicking, the task from the taskListObj is deleted as per index
        - The new taskListObj is then saved to localStorage
    
- Window Event Listener (_line 100_)
    - When page is loaded, the tasks stored in localStorage are displayed again using _.forEach()_

- addTaskBtn Event Listener (_line 112_)
    - When button is clicked, the input value is retrieved and add to the taskListObj
    - The updated data is then saved in localStorage

- clearAllBtn Event Listener (_line 130_)
    - When button is clicked, the taskListObj is converted to an empty []
    - The tasks list is then removed from localStorage 


